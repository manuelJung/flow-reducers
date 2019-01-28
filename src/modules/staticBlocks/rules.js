// @flow
import {addRule} from 'redux-interrupt'
import * as at from './const'
import * as api from './utils/api'
import * as actions from './actions'
// import * as selectors from './selectors'


addRule({
  id: 'core/FETCH_STATIC_BLOCK',
  target: at.FETCH_REQUEST,
  consequence: ({action}) => api.fetchBlock(action.meta.identifier).then(
    result => actions.fetchSuccess(result),
    error => actions.fetchFailure(action.meta.identifier, error)
  )
})