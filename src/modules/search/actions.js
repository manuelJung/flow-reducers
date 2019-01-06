// @flow
import * as at from './const'

import type {SearchKey, FilterKey, FilterValue} from './entities'
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
