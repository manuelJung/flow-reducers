// @flow
import {addRule} from 'redux-interrupt'
import * as at from './const'
import * as api from './utils/api'
import * as actions from './actions'
import * as selectors from './selectors'

addRule({
  id: 'magazine/FETCH_ARTICLE',
  target: at.FETCH_ARTICLE_REQUEST,
  concurrency: 'FIRST',
  concurrencyFilter: action => action.meta.identifier,
  consequence: ({action}) => api.fetchArticle(action.meta.identifier).then(
    result => actions.fetchArticleSuccess(action.meta.identifier, result),
    error => actions.fetchArticleFailure(action.meta.identifier, error.toString())
  )
})

addRule({
  id: 'magazine/FETCH_ARTICLE_LIST',
  target: at.FETCH_LIST_REQUEST,
  concurrency: 'SWITCH',
  concurrencyFilter: action => action.meta.identifier,
  consequence: ({action, getState}) => {
    const state = getState()
    const {identifier} = action.meta
    const filters = selectors.getFilters(state.magazine, identifier)
    return api.fetchArticleList(filters).then(
      result => actions.fetchListSuccess(identifier, result),
      error => actions.fetchListFailure(identifier, error)
    )
  }
})

addRule({
  id: 'magazine/TRIGGER_LIST_FETCH',
  target: [at.SET_PAGE,at.TOGGLE_CATEGORY,at.CREATE_LIST],
  consequence: ({action}) => actions.fetchListRequest(action.meta.identifier)
})