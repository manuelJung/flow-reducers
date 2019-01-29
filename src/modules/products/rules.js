// @flow
import {addRule} from 'redux-interrupt'
import * as at from './const'
import * as api from './utils/api'
import * as actions from './actions'
import * as selectors from './selectors'

addRule({
  id: 'products/TRIGGER_LIST_SEARCH',
  target: [
    at.INIT_LIST, 
    at.SET_PAGE, 
    at.SET_PRICE_RANGE, 
    at.SET_QUERY, 
    at.TOGGLE_CATEGORY, 
    at.TOGGLE_FILTER, 
    at.TOGGLE_TAG
  ],
  consequence: ({action}) => actions.fetchListRequest(action.meta.identifier)
})

addRule({
  id: 'products/SEARCH_LIST',
  target: at.FETCH_LIST_REQUEST,
  concurrency: 'SWITCH',
  consequence: ({action, getState}) => {
    const state = getState()
    const {identifier} = action.meta
    const filterValues = selectors.getFilterValues(state.search, identifier)
    if(!filterValues) return
    return api.fetchProductList(filterValues).then(
      result => actions.fetchListSuccess(identifier, result),
      error => actions.fetchListFailure(identifier, error.toString())
    )
  }
})

addRule({
  id: 'products/SEARCH_PRODUCT',
  target: at.FETCH_REQUEST,
  consequence: ({action}) => api.fetchProduct(action.meta.identifier).then(
    result => actions.fetchSuccess(action.meta.identifier, result),
    error => actions.fetchFailure(action.meta.identifier, error.toString())
  )
})
