// @flow
import * as at from './const'
// import {searchProducts} from './utils/api'
import {fetchSuccess, fetchFailure} from './actions'

// import type {FetchRequestAction} from './actions'

export const searchProductsRule = {
  id: 'core/SEARCH_PRODUCTS',
  target: [
    at.INIT, 
    at.FETCH_REQUEST, 
    at.SET_PAGE, 
    at.SET_PRICE, 
    at.SET_QUERY, 
    at.TOGGLE_CATEGORY, 
    at.TOGGLE_FILTER, 
    at.TOGGLE_TAG
  ],
  consequence: () => console.log('TODO: fetch products')
}