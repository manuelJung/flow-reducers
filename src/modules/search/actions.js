// @flow
import * as at from './const'

import type {SearchKey, FilterKey, FilterValue, FilterOption, CategoryOption} from './entities'
import type {SearchResult} from './utils/api'

export type FetchRequestAction = {
  type: typeof at.FETCH_REQUEST,
  meta: {searchKey:SearchKey}
}

export type FetchSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: {searchKey:SearchKey},
  payload: SearchResult
}

export type FetchFailureAction = {
  type: typeof at.FETCH_FAILURE,
  meta: {searchKey:SearchKey},
  payload: string
}

export type InitAction = {
  type: typeof at.INIT,
  meta: {
    initialValues: {
      page?:number,
      query?: string,
      tags?: string[],
      color?:FilterValue[],
      brand?:FilterValue[],
      size?:FilterValue[],
      shop?:FilterValue[],
      category?:string,
      price?:[number,number],
      context?:string
    }
  },
  payload: SearchKey
}

export type ToggleFilterAction = {
  type: typeof at.TOGGLE_FILTER,
  meta: {
    searchKey:SearchKey,
    filterKey:FilterKey
  },
  payload: FilterValue
}

export type SetPriceAction = {
  type: typeof at.SET_PRICE,
  meta: { searchKey:SearchKey },
  payload: [number,number]
}

export type ToggleCategoryAction = {
  type: typeof at.TOGGLE_CATEGORY,
  meta: { searchKey:SearchKey },
  payload: string
}

export type SetContextAction = {
  type: typeof at.SET_CONTEXT,
  meta: { searchKey:SearchKey },
  payload: string
}

export type SetPageAction = {
  type: typeof at.SET_PAGE,
  meta: {searchKey:SearchKey },
  payload: number
}

export type SetQueryAction = {
  type: typeof at.SET_QUERY,
  meta: { searchKey:SearchKey },
  payload: string
}

export type ToggleTagAction = {
  type: typeof at.TOGGLE_TAG,
  meta: { searchKey:SearchKey },
  payload: string
}

export type SetFilterOptionsAction = {
  type: typeof at.SET_FILTER_OPTIONS,
  meta: {searchKey:SearchKey, filterKey:FilterKey},
  payload: FilterOption[]
}

export type SetCategoryOptionsAction = {
  type: typeof at.SET_CATEGORY_OPTIONS,
  meta: {searchKey:SearchKey},
  payload: CategoryOption[]
}

export type Action = FetchRequestAction 
| FetchSuccessAction 
| FetchFailureAction 
| InitAction
| ToggleFilterAction
| SetPriceAction
| ToggleCategoryAction
| SetContextAction
| SetPageAction
| SetQueryAction
| ToggleTagAction
| SetFilterOptionsAction
| SetCategoryOptionsAction

// q=Hose&p=2&dFR[wunderSizes][0]=36D&hFR[categories][0]=Bademode%20%26%20Strandkleidung&nR[productPrice][<=][0]=70&nR[productPrice][>=][0]=36&tR[0]=sale
const queryStringToFilterValues = (queryString?:string):Object => !queryString ? ({}) : ({
  page: queryString.match(/&p=/g).replace(/^[^=]*/,''),
  query: '',
  tags: [],
  color: [],
  brand: [],
  size: [],
  shop: [],
  category: '',
  price: [0,100],
  context: ''
})

export const init = (searchKey:SearchKey, initialValues?:Object, queryString?:string):InitAction => ({
  type: at.INIT,
  meta: {initialValues:{
    ...queryStringToFilterValues(queryString),
    ...initialValues
  }},
  payload: searchKey
})

export const fetchRequest = (searchKey:SearchKey):FetchRequestAction => ({
  type: at.FETCH_REQUEST,
  meta: {searchKey}
})

export const fetchSuccess = (searchKey: SearchKey, result: SearchResult):FetchSuccessAction => ({
  type: at.FETCH_SUCCESS,
  meta: {searchKey},
  payload: result
})

export const fetchFailure = (searchKey:SearchKey, error:string):FetchFailureAction => ({
  type: at.FETCH_FAILURE,
  meta: {searchKey},
  payload: error
})

export const toggleFilter = (searchKey:SearchKey, filterKey:FilterKey, filterValue:FilterValue):ToggleFilterAction => ({
  type: at.TOGGLE_FILTER,
  meta: {searchKey, filterKey},
  payload: filterValue
})

export const setPrice = (searchKey:SearchKey, price:[number,number]):SetPriceAction => ({
  type: at.SET_PRICE,
  meta: {searchKey},
  payload: price
})

export const toggleCategory = (searchKey:SearchKey, category:string):ToggleCategoryAction => ({
  type: at.TOGGLE_CATEGORY,
  meta: {searchKey},
  payload: category
})

export const setContext = (searchKey:SearchKey, context:string):SetContextAction => ({
  type: at.SET_CONTEXT,
  meta: {searchKey},
  payload: context
})

export const setPage = (searchKey:SearchKey, page:number):SetPageAction => ({
  type: at.SET_PAGE,
  meta: {searchKey},
  payload: page
})

export const setQuery = (searchKey:SearchKey, query:string):SetQueryAction => ({
  type: at.SET_QUERY,
  meta: {searchKey},
  payload: query
})

export const toggleTag = (searchKey:SearchKey, tag:string):ToggleTagAction => ({
  type: at.TOGGLE_TAG,
  meta: {searchKey},
  payload: tag
})

export const setFilterOptions = (searchKey:SearchKey, filterKey:FilterKey, options:FilterOption[]):SetFilterOptionsAction => ({
  type: at.SET_FILTER_OPTIONS,
  meta: {searchKey, filterKey},
  payload: options
})

export const setCategoryOptions = (searchKey:SearchKey, options:CategoryOption[]):SetCategoryOptionsAction => ({
  type: at.SET_CATEGORY_OPTIONS,
  meta: {searchKey},
  payload: options
})
