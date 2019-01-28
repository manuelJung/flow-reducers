// @flow
import {addRule} from 'redux-interrupt'
import * as at from './const'
import * as api from './utils/api'
import * as actions from './actions'
import * as selectors from './selectors'

addRule({
  id: 'magazin/FETCH_ARTICLE',
  target: at.FETCH_ARTICLE_REQUEST,
  consequence: ({action}) => api.fetchArticle(action.meta.urlKey).then(
    result => actions.fetchArticleSuccess(action.meta.urlKey, result),
    error => actions.fetchArticleFailure(action.meta.urlKey, error.toString())
  )
})

addRule({
  id: 'magazin/FETCH_ARTICLE_LIST',
  target: at.FETCH_ARTICLE_REQUEST,
  consequence: ({action, getState}) => {
    const state = getState()
    const filters = selectors.getFilters(state.magazin)
    const {key} = action.meta
    return api.fetchArticleList(key, filters).then(
      result => actions.fetchListSuccess(key, result),
      error => actions.fetchListFailure(key, result)
    )
  }
})

addRule({
  id: 'magazin/TRIGGER_LIST_FETCH',
  target: [at.SET_PAGE,at.TOGGLE_CATEGORY,at.CREATE_LIST],
  consequence: ({action}) => actions.fetchListRequest(action.meta.key)
})