// @flow
import {FETCH_REQUEST} from './const'
import {fetchBlock} from './utils/api'
import {fetchSuccess, fetchFailure} from './actions'

import type {FetchRequestAction} from './actions'

type Consequence = {
  action:FetchRequestAction
}

export const fetchBlockRule = {
  id: 'core/FETCH_STATIC_BLOCK',
  target: FETCH_REQUEST,
  consequence: ({action}:Consequence) => fetchBlock(action.meta.identifier).then(
    result => fetchSuccess(result),
    error => fetchFailure(action.meta.identifier, error)
  )
}