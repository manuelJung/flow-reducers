// @flow
import * as at from './const'

import type {ProductIdentifier, ListIdentifier, FilterKey, FilterValue, FilterOption, CategoryOption, FilterValues} from './entities'
import type {ProductSearchResult, ListSearchResult, FilterOptionsSearchResult, CategoryOptionsSearchResult} from './utils/api'

export type FetchRequestAction = {
  type: typeof at.FETCH_REQUEST,
  meta: {identifier:ProductIdentifier}
}

export type FetchSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: {identifier:ProductIdentifier},
  payload: ProductSearchResult
}

export type FetchFailureAction = {
  type: typeof at.FETCH_FAILURE,
  meta: {identifier:ProductIdentifier},
  payload: string
}

export type FetchListRequestAction = {
  type: typeof at.FETCH_LIST_REQUEST,
  meta: {identifier:ListIdentifier}
}

export type FetchListSuccessAction = {
  type: typeof at.FETCH_LIST_SUCCESS,
  meta: {identifier:ListIdentifier},
  payload: ListSearchResult
}

export type FetchListFailureAction = {
  type: typeof at.FETCH_LIST_FAILURE,
  meta: {identifier:ListIdentifier},
  payload: string
}

export type InitAction = {
  type: typeof at.INIT_LIST,
  meta: { 
    identifier: ListIdentifier, 
    initialValues: FilterValues 
  },
  payload: ListIdentifier
}

export type ToggleFilterAction = {
  type: typeof at.TOGGLE_FILTER,
  meta: {
    identifier:ListIdentifier,
    filterKey:FilterKey
  },
  payload: FilterValue
}

export type SetPriceAction = {
  type: typeof at.SET_PRICE_RANGE,
  meta: { identifier:ListIdentifier },
  payload: [number,number]
}

export type ToggleCategoryAction = {
  type: typeof at.TOGGLE_CATEGORY,
  meta: { identifier:ListIdentifier },
  payload: string
}

export type SetContextAction = {
  type: typeof at.SET_CONTEXT,
  meta: { identifier:ListIdentifier },
  payload: string
}

export type SetPageAction = {
  type: typeof at.SET_PAGE,
  meta: {identifier:ListIdentifier },
  payload: number
}

export type SetQueryAction = {
  type: typeof at.SET_QUERY,
  meta: { identifier:ListIdentifier },
  payload: string
}

export type ToggleTagAction = {
  type: typeof at.TOGGLE_TAG,
  meta: { identifier:ListIdentifier },
  payload: string
}

export type FetchFilterOptionsRequestAction = {
  type: typeof at.FETCH_FILTER_OPTIONS_REQUEST,
  meta: {identifier:ListIdentifier, filterKey:FilterKey}
}

export type FetchFilterOptionsSuccessAction = {
  type: typeof at.FETCH_FILTER_OPTIONS_SUCCESS,
  meta: {identifier:ListIdentifier, filterKey:FilterKey},
  payload: FilterOptionsSearchResult
}

export type FetchFilterOptionsFailureAction = {
  type: typeof at.FETCH_FILTER_OPTIONS_FAILURE,
  meta: {identifier:ListIdentifier, filterKey:FilterKey},
  payload: string
}

export type FetchCategoryOptionsRequestAction = {
  type: typeof at.FETCH_CATEGORY_OPTIONS_REQUEST,
  meta: {identifier:ListIdentifier}
}

export type FetchCategoryOptionsSuccessAction = {
  type: typeof at.FETCH_CATEGORY_OPTIONS_SUCCESS,
  meta: {identifier:ListIdentifier},
  payload: CategoryOptionsSearchResult
}

export type FetchCategoryOptionsFailureAction = {
  type: typeof at.FETCH_CATEGORY_OPTIONS_FAILURE,
  meta: {identifier:ListIdentifier},
  payload: string
}

export type Action = FetchRequestAction 
| FetchSuccessAction 
| FetchFailureAction 
| FetchListRequestAction
| FetchListSuccessAction
| FetchListFailureAction
| InitAction
| ToggleFilterAction
| SetPriceAction
| ToggleCategoryAction
| SetContextAction
| SetPageAction
| SetQueryAction
| ToggleTagAction
| FetchFilterOptionsRequestAction
| FetchFilterOptionsSuccessAction
| FetchFilterOptionsFailureAction
| FetchCategoryOptionsRequestAction
| FetchCategoryOptionsSuccessAction
| FetchCategoryOptionsFailureAction

// q=Hose&p=2&dFR[wunderSizes][0]=36D&hFR[categories][0]=Bademode%20%26%20Strandkleidung&nR[productPrice][<=][0]=70&nR[productPrice][>=][0]=36&tR[0]=sale
// const queryStringToFilterValues = (queryString?:string):Object => !queryString ? ({}) : ({
//   page: (s => {
//     const regex = s.match(/&p=/g)
//     if(!regex) return 0
//     return parseInt(regex[0].replace(/^[^=]*/,''))
//   })(queryString),
//   query: '',
//   tags: [],
//   color: [],
//   brand: [],
//   size: [],
//   shop: [],
//   category: '',
//   price: [0,100],
//   context: ''
// })

export const initList = (identifier:ListIdentifier, initialValues?:$Shape<FilterValues>={}):InitAction => ({
  type: at.INIT_LIST,
  meta: {
    identifier,
    initialValues: Object.assign({
      page: 0,
      query: '',
      tags: [],
      color: [],
      brand: [],
      size: [],
      shop: [],
      category: '',
      price: [0,100],
      context: ''
    }, initialValues)
  },
  payload: identifier
})

export const fetchRequest = (identifier:ProductIdentifier):FetchRequestAction => ({
  type: at.FETCH_REQUEST,
  meta: {identifier}
})

export const fetchSuccess = (identifier: ProductIdentifier, result: ProductSearchResult):FetchSuccessAction => ({
  type: at.FETCH_SUCCESS,
  meta: {identifier},
  payload: result
})

export const fetchFailure = (identifier:ProductIdentifier, error:string):FetchFailureAction => ({
  type: at.FETCH_FAILURE,
  meta: {identifier},
  payload: error
})

export const fetchListRequest = (identifier:ListIdentifier):FetchListRequestAction => ({
  type: at.FETCH_LIST_REQUEST,
  meta: {identifier}
})

export const fetchListSuccess = (identifier: ListIdentifier, result: ListSearchResult):FetchListSuccessAction => ({
  type: at.FETCH_LIST_SUCCESS,
  meta: {identifier},
  payload: result
})

export const fetchListFailure = (identifier:ListIdentifier, error:string):FetchListFailureAction => ({
  type: at.FETCH_LIST_FAILURE,
  meta: {identifier},
  payload: error
})

export const toggleFilter = (identifier:ListIdentifier, filterKey:FilterKey, filterValue:FilterValue):ToggleFilterAction => ({
  type: at.TOGGLE_FILTER,
  meta: {identifier, filterKey},
  payload: filterValue
})

export const setPrice = (identifier:ListIdentifier, price:[number,number]):SetPriceAction => ({
  type: at.SET_PRICE_RANGE,
  meta: {identifier},
  payload: price
})

export const toggleCategory = (identifier:ListIdentifier, category:string):ToggleCategoryAction => ({
  type: at.TOGGLE_CATEGORY,
  meta: {identifier},
  payload: category
})

export const setContext = (identifier:ListIdentifier, context:string):SetContextAction => ({
  type: at.SET_CONTEXT,
  meta: {identifier},
  payload: context
})

export const setPage = (identifier:ListIdentifier, page:number):SetPageAction => ({
  type: at.SET_PAGE,
  meta: {identifier},
  payload: page
})

export const setQuery = (identifier:ListIdentifier, query:string):SetQueryAction => ({
  type: at.SET_QUERY,
  meta: {identifier},
  payload: query
})

export const toggleTag = (identifier:ListIdentifier, tag:string):ToggleTagAction => ({
  type: at.TOGGLE_TAG,
  meta: {identifier},
  payload: tag
})

export const fetchFilterOptionsRequest = (identifier:ListIdentifier, filterKey:FilterKey):FetchFilterOptionsRequestAction => ({
  type: at.FETCH_FILTER_OPTIONS_REQUEST,
  meta: {identifier, filterKey}
})

export const fetchFilterOptionsSuccess = (identifier:ListIdentifier, filterKey:FilterKey, result:FilterOptionsSearchResult):FetchFilterOptionsSuccessAction => ({
  type: at.FETCH_FILTER_OPTIONS_SUCCESS,
  meta: {identifier, filterKey},
  payload: result
})

export const fetchFilterOptionsFailure = (identifier:ListIdentifier, filterKey:FilterKey, error:string):FetchFilterOptionsFailureAction => ({
  type: at.FETCH_FILTER_OPTIONS_FAILURE,
  meta: {identifier, filterKey},
  payload: error
})

export const fetchCategoryOptionsRequest = (identifier:ListIdentifier):FetchCategoryOptionsRequestAction => ({
  type: at.FETCH_CATEGORY_OPTIONS_REQUEST,
  meta: {identifier}
})

export const fetchCategoryOptionsSuccess = (identifier:ListIdentifier, result:CategoryOptionsSearchResult):FetchCategoryOptionsSuccessAction => ({
  type: at.FETCH_CATEGORY_OPTIONS_SUCCESS,
  meta: {identifier},
  payload: result
})

export const fetchCategoryOptionsFailure = (identifier:ListIdentifier, error:string):FetchCategoryOptionsFailureAction => ({
  type: at.FETCH_CATEGORY_OPTIONS_FAILURE,
  meta: {identifier},
  payload: error
})
