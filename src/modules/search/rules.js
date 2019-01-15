// @flow
import * as at from './const'
import {search} from './utils/api'
import {fetchSuccess, fetchFailure, fetchRequest} from './actions'
import {getFilterValues} from './selectors'

import type {FetchRequestAction} from './actions'

export const triggerSearchRule = {
  id: 'core/TRIGGER_SEARCH',
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
  consequence: ({action}) => fetchRequest(action.meta.searchKey)
}

export const searchRule = {
  id: 'core/SEARCH',
  target: at.FETCH_REQUEST,
  concurrency: 'SWITCH',
  consequence: ({action, getState}) => {
    const state = getState()
    const {searchKey} = action.meta
    return search(state.search, searchKey).then(
      result => fetchSuccess(searchKey, result),
      error => fetchFailure(searchKey, error.toString())
    )
  }
}