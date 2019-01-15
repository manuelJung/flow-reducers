// @flow
import algoliasearchHelper from 'algoliasearch-helper'
import algoliasearch from 'algoliasearch'
import type {Product, FilterOption, CategoryOption, FilterValues} from '../entities'

export type SearchResult = {
  hits: Product[],
  page: number,
  exhaustiveNBHits:boolean,
  exhausitve:boolean,
  numPages:number,
  numHits:number,
  tags:string[],
  colorOptions:FilterOption[],
  sizeOptions:FilterOption[],
  brandOptions:FilterOption[],
  shopOptions:FilterOption[],
  categories:CategoryOption[],
  maxPrice:number,
  minPrice:number,
  queryString:string
}

const getFilterOptions = (filter:Object):FilterOption[] => Object.keys(filter.data)
const getCategoryOptions = (filter:Object):CategoryOption[] => !filter ? [] : Object.keys(filter.data).map(name => ({
  name: name,
  selected: filter.data[name].isRefined,
  options: getCategoryOptions(filter.data[name].data)
}))

export const search = (filterValues:FilterValues):Promise<SearchResult> => {
  const client = algoliasearch('applicationID', 'apiKey')
  const helper = algoliasearchHelper(client, 'products', {
    disjunctiveFacets: ['wunderSizes', 'productManufacturerBrand', 'merchantName', 'filterColor'],
    hierarchicalFacets: [{
      name: 'categories',
      attributes: ['wunderCategoriesHierarchical.lvl0', 'wunderCategoriesHierarchical.lvl1', 'wunderCategoriesHierarchical.lvl2'],
      showParentLevel: true,
      sortBy: ['name:asc']
    }],
    hitsPerPage: 24,
    maxValuesPerFacet: 100,
    attributesToRetrieve: [
      '_tags',
      'imageMediumURL',
      'productPrice',
      'productPriceOld',
      'productManufacturerBrand',
      'productName',
      'shippingAndHandling',
      'merchantName',
      'isOnSale',
      'salePercentage',
      'wunderSizes',
      'productColor',
      'deliveryTime'
    ],
    attributesToHighlight: []
  })

  filterValues.color.forEach(value => helper.addDisjunctiveFacetRefinement('color', value))
  filterValues.brand.forEach(value => helper.addDisjunctiveFacetRefinement('brand', value))
  filterValues.size.forEach(value => helper.addDisjunctiveFacetRefinement('size', value))
  filterValues.shop.forEach(value => helper.addDisjunctiveFacetRefinement('shop', value))
  filterValues.tags.forEach(tag => helper.addTag(tag))

  filterValues.category && helper.addHierarchicalFacetRefinement('categories', filterValues.category)
  filterValues.query && helper.setQuery(filterValues.query)
  filterValues.context && helper.setQueryParameter('ruleContexts', [filterValues.context])

  // must be set last
  filterValues.page && helper.setPage(filterValues.page)

  return helper.searchOnce()
    .then(result => result.content)
    .then(content => ({
      hits: content.hits,
      page: content.page,
      exhaustiveNBHits: content.exhaustiveNBHits,
      exhausitve: content.exhaustive,
      numPages: content.numPages,
      numHits: content.numHits,
      tags: content.tags,
      colorOptions: getFilterOptions(content.colorOptions),
      sizeOptions: getFilterOptions(content.sizeOptions),
      brandOptions: getFilterOptions(content.brandOptions),
      shopOptions: getFilterOptions(content.shopOptions),
      categories: getCategoryOptions(content.categories),
      maxPrice: content.maxPrice,
      minPrice: content.minPrice,
      queryString: content.queryString
    }))
}
