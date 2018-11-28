// @flow
import {combineReducers} from 'redux'

import productsReducer from '../modules/products/reducer'
import type {State as ProductsState} from '../modules/products/reducer'

export type AsyncReducers = {}
export type RootState = AsyncReducers & {
  products: ProductsState,
  xy: {}
}

const makeRootReducer = (asyncReducers?:AsyncReducers):RootState => {
  return combineReducers({
    products: productsReducer,
    ...asyncReducers
  })
}

export default makeRootReducer
