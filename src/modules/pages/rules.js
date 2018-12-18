// @flow
import {FETCH_REQUEST} from './const'
import {fetchPage} from './utils/api'
import {fetchSuccess, fetchFailure} from './actions'

import type {FetchRequestAction} from './actions'

export const fetchPageRule = {
  id: 'core/FETCH_PAGE',
  target: FETCH_REQUEST,
  consequence: (_:any, action:FetchRequestAction) => fetchPage(action.meta.slug).then(
    result => fetchSuccess(result),
    error => fetchFailure(action.meta.slug, error)
  )
}