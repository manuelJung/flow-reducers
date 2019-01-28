// @flow
import {addRule} from 'redux-interrupt'
import * as at from './const'
import * as api from './utils/api'
import * as actions from './actions'
import * as selectors from './selectors'

import type {FetchRequestAction} from './actions'

addRule({
  id: 'core/TRIGGER_SEARCH',
  target: [
    at.INIT, 
    at.SET_PAGE, 
    at.SET_PRICE, 
    at.SET_QUERY, 
    at.TOGGLE_CATEGORY, 
    at.TOGGLE_FILTER, 
    at.TOGGLE_TAG
  ],
  consequence: ({action}) => actions.fetchRequest(action.meta.searchKey)
})

addRule({
  id: 'core/SEARCH',
  target: at.FETCH_REQUEST,
  concurrency: 'SWITCH',
  consequence: ({action, getState}) => {
    const state = getState()
    const {searchKey} = action.meta
    const filterValues = selectors.getFilterValues(state.search, searchKey)
    return api.search(filterValues).then(
      result => actions.fetchSuccess(searchKey, result),
      error => actions.fetchFailure(searchKey, error.toString())
    )
  }
})