// @flow
import createReSelector from 're-reselect'
import type {State} from './reducer'
import type {ProductIdentifier, ListIdentifier, Product, FilterValues, FilterValue, Filter, FilterOption, FilterKey} from './entities'

// PRODUCT

export const getProduct = (state:State, identifier:ProductIdentifier):Product|null => state.products[identifier]
  ? state.products[identifier].data
  : null

export const isFetchingProduct = (state:State, identifier:ProductIdentifier):boolean => state.products[identifier]
  ? state.products[identifier].isFetching
  : false

export const shouldFetchProduct = (state:State, identifier:ProductIdentifier):boolean => !state.products[identifier]

export const getProductFetchError = (state:State, identifier:ProductIdentifier):string|null => state.products[identifier]
  ? state.products[identifier].fetchError
  : null


export const getProductRequest:(state:State, identifier:ProductIdentifier)=> * = createReSelector(
  getProduct,
  isFetchingProduct,
  getProductFetchError,
  shouldFetchProduct,
  (data, isFetching, fetchError, shouldFetch) => ({data, isFetching, fetchError, shouldFetch})
)((_,identifier) => identifier)

// PRODUCT LIST

export const getListHits = (state:State, identifier:ListIdentifier):Product[]|null => state.lists[identifier]
  ? state.lists[identifier].data
  : null

export const isFetchingList = (state:State, identifier:ListIdentifier):boolean => state.lists[identifier]
  ? state.lists[identifier].isFetching
  : false

export const shouldFetchList = (state:State, identifier:ListIdentifier):boolean => !state.lists[identifier]

export const getListFetchError = (state:State, identifier:ListIdentifier):string|null => state.lists[identifier]
  ? state.lists[identifier].fetchError
  : null

export const getListRequest:(state:State, identifier:ListIdentifier)=> * = createReSelector(
  getListHits,
  isFetchingList,
  getListFetchError,
  shouldFetchList,
  (data, isFetching, fetchError, shouldFetch) => ({data, isFetching, fetchError, shouldFetch})
)((_,identifier) => identifier)

// FILTER

export const getFilterValue = (state:State, identifier:ListIdentifier, filterKey:FilterKey):FilterValue[] =>
  state.lists[identifier]
    ? state.lists[identifier].filterValues[filterKey]
    : []

export const getFilterOptions = (state:State, identifier:ListIdentifier, filterKey:FilterKey):FilterOption[] =>
  state.lists[identifier]
    ? state.lists[identifier].filterOptions[filterKey]
    : []

export const getFilter:(state:State, identifier:ListIdentifier, filterKey:FilterKey) => Filter = createReSelector(
  getFilterOptions,
  getFilterValue,
  (_, identifier:ListIdentifier) => identifier,
  (_,__,filterKey:FilterKey) => filterKey,
  (options, value, identifier, key) => ({ key, identifier, options, value })
)((_,id,key) => `${id}-${key}`)

// CUSTOM

export const getFilterValues = (state:State, identifier:ListIdentifier):FilterValues|null => state.lists[identifier]
  ? state.lists[identifier].filterValues
  : null