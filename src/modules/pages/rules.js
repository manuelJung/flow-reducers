// @flow
import {FETCH_REQUEST} from './const'
import {fetchPage} from './utils/api'
import {fetchSuccess, fetchFailure} from './actions'

import type {FetchRequestAction} from './actions'

type Consequence = {
  action: FetchRequestAction
}

export const fetchPageRule = {
  id: 'core/FETCH_PAGE',
  target: FETCH_REQUEST,
  consequence: ({action}:Consequence) => fetchPage(action.meta.urlKey).then(
    result => fetchSuccess(result),
    error => fetchFailure(action.meta.urlKey, error)
  )
}