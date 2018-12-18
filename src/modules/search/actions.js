// @flow
import * as at from './const'

import type {SearchKey, Product} from './entities'

export type FetchRequestAction = {
  type: typeof at.FETCH_REQUEST,
  meta: {searchKey:SearchKey}
}

export type FetchSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: {searchKey:SearchKey},
  payload: Product[]
}

export type FetchFailureAction = {
  type: typeof at.FETCH_FAILURE,
  meta: {searchKey:SearchKey},
  payload: string
}

export type Action = FetchRequestAction | FetchSuccessAction | FetchFailureAction


export const fetchRequest = (searchKey:SearchKey):FetchRequestAction => ({
  type: at.FETCH_REQUEST,
  meta: {searchKey}
})

export const fetchSuccess = (searchKey: SearchKey, products:Product[]):FetchSuccessAction => ({
  type: at.FETCH_SUCCESS,
  meta: {searchKey},
  payload: products
})

export const fetchFailure = (searchKey:SearchKey, error:string):FetchFailureAction => ({
  type: at.FETCH_FAILURE,
  meta: {searchKey},
  payload: error
})