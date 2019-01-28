// @flow
import {addRule} from 'redux-interrupt'
import * as at from './const'
import * as api from './utils/api'
import * as actions from './actions'
import * as selectors from './selectors'

addRule({
  id: 'magazin/FETCH_ARTICLE',
  target: at.FETCH_ARTICLE_REQUEST,
  consequence: ({action}) => api.fetchArticle(action.meta.identifier).then(
    result => actions.fetchArticleSuccess(action.meta.identifier, result),
    error => actions.fetchArticleFailure(action.meta.identifier, error.toString())
  )
})

addRule({
  id: 'magazin/FETCH_ARTICLE_LIST',
  target: at.FETCH_ARTICLE_REQUEST,
  consequence: ({action, getState}) => {
    const state = getState()
    const {identifier} = action.meta
    const filters = selectors.getFilters(state.magazin, identifier)
    return api.fetchArticleList(filters).then(
      result => actions.fetchListSuccess(identifier, result),
      error => actions.fetchListFailure(identifier, error)
    )
  }
})

addRule({
  id: 'magazin/TRIGGER_LIST_FETCH',
  target: [at.SET_PAGE,at.TOGGLE_CATEGORY,at.CREATE_LIST],
  consequence: ({action}) => actions.fetchListRequest(action.meta.identifier)
})