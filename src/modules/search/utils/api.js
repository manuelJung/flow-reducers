// @flow
import algoliasearchHelper from 'algoliasearch-helper'
import algoliasearch from 'algoliasearch'
import type {Product, FilterOption, CategoryOption, FilterValues} from '../entities'

export type SearchResult = {
  hits: Product[],
  page: number,
  exhaustiveNBHits:boolean,
  exhaustiveFacetsCount:boolean,
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
  const client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')
  const helper = algoliasearchHelper(client, 'products', {
    disjunctiveFacets: ['wunderSizes', 'productManufacturerBrand', 'merchantName', 'filterColor', 'productPrice'],
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

  filterValues.color.forEach(value => helper.addDisjunctiveFacetRefinement('filterColor', value))
  filterValues.brand.forEach(value => helper.addDisjunctiveFacetRefinement('productManufacturerBrand', value))
  filterValues.size.forEach(value => helper.addDisjunctiveFacetRefinement('wunderSizes', value))
  filterValues.shop.forEach(value => helper.addDisjunctiveFacetRefinement('merchantName', value))
  filterValues.tags.forEach(tag => helper.addTag(tag))

  filterValues.category && helper.addHierarchicalFacetRefinement('categories', filterValues.category)
  filterValues.query && helper.setQuery(filterValues.query)
  filterValues.context && helper.setQueryParameter('ruleContexts', [filterValues.context])

  filterValues.price && helper.addNumericRefinement('productPrice', '>=', filterValues.price[0])
  filterValues.price && helper.addNumericRefinement('productPrice', '<=', filterValues.price[1])

  // must be set last
  filterValues.page && helper.setPage(filterValues.page)

  return helper.searchOnce()
    .then(result => result.content)
    .then(content => ({
      hits: content.hits,
      page: content.page,
      exhaustiveNBHits: content.exhaustiveNBHits,
      exhaustiveFacetsCount: content.exhaustiveFacetsCount,
      numPages: content.nbPages,
      numHits: content.nbHits,
      tags: content._state.tagRefinements,
      colorOptions: getFilterOptions(content.disjunctiveFacets[3]),
      sizeOptions: getFilterOptions(content.disjunctiveFacets[0]),
      brandOptions: getFilterOptions(content.disjunctiveFacets[1]),
      shopOptions: getFilterOptions(content.disjunctiveFacets[2]),
      categories: getCategoryOptions(content.hierarchicalFacets[0]),
      maxPrice: content.disjunctiveFacets[4].stats.max,
      minPrice: content.disjunctiveFacets[4].stats.min,
      queryString: content._rawResults[0].params
    }))
}
