// @flow
import * as at from './const'
import {hasArticles} from './selectors'
import type {RootState} from '../../store/rootReducer'
import * as api from './utils/api'

import type {Article, FilterKey, FilterValue, Filter, FilterOption} from './entities.flow'

export type FetchProductRequestAction = {
  type: typeof at.FETCH_REQUEST,
  meta: { number: string, productId: string}
}

export type FetchProductSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: { number: string, productId: string},
  payload: Article[]
}

export type FetchProductFailureAction = {
  type: typeof at.FETCH_FAILURE,
  meta: { number: string, productId: string},
  payload: string
}

export type SetFilterValueAction = {
  type: typeof at.SET_FILTER_VALUE,
  meta: {filter:Filter, filterKey:FilterKey},
  payload: FilterOption | null
}

export type CreateProductAction = {
  type: typeof at.CREATE_PRODUCT,
  meta: {number:string, override:boolean, createFilters:boolean},
  payload: string
}

export type CreateFilterAction = {
  type: typeof at.CREATE_FILTER,
  meta: {number:string, override:boolean},
  payload: string
}

export type Action = 
  FetchProductRequestAction
  | FetchProductSuccessAction
  | FetchProductFailureAction
  | SetFilterValueAction
  | CreateProductAction
  | CreateFilterAction


export const setFilterValue = (filter:Filter, filterKey:FilterKey, filterOption:FilterOption|null):SetFilterValueAction => ({
  type: at.SET_FILTER_VALUE,
  meta: {filter, filterKey},
  payload: filterOption
})

const fetchProduct = (number, productId) => dispatch => {
  const meta = {number, productId}
  dispatch(({ 
    type: at.FETCH_REQUEST, 
    meta 
  }:FetchProductRequestAction))
  
  return api.fetchProduct(number).then(
    payload => dispatch(({ type: at.FETCH_SUCCESS, meta, payload }:FetchProductSuccessAction)),
    error => dispatch(({ type: at.FETCH_FAILURE, meta, payload: error.toString() }:FetchProductFailureAction))
  )
}

export const createProduct = (number:string, productId:string, override:boolean=true) => 
  (dispatch:Function, getState:Function) => {
    const state:RootState = getState()
    const articlesExist = hasArticles(state.products, number)

    dispatch(({
      type: at.CREATE_PRODUCT,
      meta: {number, override, createFilters: articlesExist},
      payload: productId
    }:CreateProductAction))

    if(!articlesExist){
      dispatch(fetchProduct(number, productId)).then(() => dispatch(({
        type: at.CREATE_FILTER,
        meta: {number, override},
        payload: productId
      }:CreateFilterAction)))
    }
  }