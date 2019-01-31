// @flow
import algoliasearchHelper from 'algoliasearch-helper'
import algoliasearch from 'algoliasearch'
import type {Product, FilterKey, FilterOption, CategoryOption, FilterValues} from '../entities'
import {compose} from 'redux'

export type ListSearchResult = {
  hits: Product[],
  page: number,
  exhaustiveNbHits:boolean,
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

export type ProductSearchResult = Product

export type FilterOptionsSearchResult = FilterOption[]

export type CategoryOptionsSearchResult = CategoryOption[]

const client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

const searchKeys = {
  size: 'wunderSizes',
  brand: 'productManufacturerBrand',
  color: 'filterColor',
  shop: 'merchantName',
  price: 'productPrice'
}

export const fetchProduct = (objectID:string):Promise<ProductSearchResult> => {
  return algoliasearchHelper(client, 'products', {
    disjunctiveFacets: ['objectID'],
    attributesToHighlight: []
  }).addDisjunctiveFacetRefinement('objectID', objectID)
    .searchOnce()
    .then(result => result.content.hits[0])
    .then(result => result ? result : Promise.reject('404'))
}

const getCategoryOptions = (filter:Object):CategoryOption[] => !(filter && filter.data) ? [] : filter.data.map(f => ({
  name: f.name,
  path: f.path,
  count: f.count,
  selected: f.isRefined,
  options: getCategoryOptions(f)
}))

const createListHelper = (filterValues:FilterValues):any => {
  const helper = algoliasearchHelper(client, 'products', {
    disjunctiveFacets: Object.values(searchKeys),
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

  filterValues.context && helper.setQueryParameter('ruleContexts', [filterValues.context])

  // must be set last
  filterValues.page && helper.setPage(filterValues.page)
  
  return helper
}

const sort = (list:string[]) => list.sort((a,b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)

export const fetchProductList = (filterValues:FilterValues):Promise<ListSearchResult> => {
  const helper = createListHelper(filterValues)

  return helper.searchOnce()
    .then(result => result.content)
    .then(r => console.log(r) || r)
    .then(content => ({
      hits: content.hits,
      page: content.page,
      exhaustiveNbHits: content.exhaustiveNbHits,
      exhaustiveFacetsCount: content.exhaustiveFacetsCount,
      numPages: content.nbPages,
      numHits: content.nbHits,
      tags: content._state.tagRefinements,
      colorOptions: compose(sort, Object.keys)(content.disjunctiveFacets.find(row => row.name === searchKeys['color']).data),
      sizeOptions: compose(sort, Object.keys)(content.disjunctiveFacets.find(row => row.name === searchKeys['size']).data),
      brandOptions: compose(sort, Object.keys)(content.disjunctiveFacets.find(row => row.name === searchKeys['brand']).data),
      shopOptions: compose(sort, Object.keys)(content.disjunctiveFacets.find(row => row.name === searchKeys['shop']).data),
      categories: getCategoryOptions(content.hierarchicalFacets[0]),
      maxPrice: content.disjunctiveFacets[4].stats.max,
      minPrice: content.disjunctiveFacets[4].stats.min,
      queryString: content._rawResults[0].params
    }))
}

export const fetchListFilterOptions = (filterKey:FilterKey, filterValues:FilterValues, query:string):Promise<FilterOptionsSearchResult> => {
  const helper = createListHelper({...filterValues, context: ''})
  return helper
    .searchForFacetValues(searchKeys[filterKey], query, 100)
    .then(result => result.map(row => row.value))
    .then(result => query ? result : sort(result))
}