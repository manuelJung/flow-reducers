// @flow
import * as at from './const'
import {addRule} from 'redux-interrupt'
import * as selectors from './selectors'
import * as api from './utils/api'
import * as actions from './actions'

import type {Context, Category, CategoryId} from './entities'

addRule({
  id: 'navigation/FETCH_CATEGORIES',
  condition: (_, getState) => {
    const state = getState()
    return !selectors.hasFetchedCategories(state.navigation)
  },
  consequence: () => api.fetchCategories().then(actions.setCategories),
  addOnce: true
})

addRule({
  id: 'navigation/FETCH_CATEGORY_CONTEXT',
  target: at.FETCH_CONTEXT_REQUEST,
  consequence: ({action, getState}) => {
    const {categoryId} = action.meta
    const state = getState()
    const category = selectors.getCategory(state.navigation, categoryId)
    if(!category) return actions.fetchContextFailure(categoryId, 'categories not found')
    return api.fetchCategoryContext(category).then(
      result => actions.fetchContextSuccess(categoryId, result),
      error => actions.fetchContextFailure(categoryId, error.toString())
    )
  }
})

addRule({
  id:'navigation/FETCH_CATEGORY_CONTEXT_LAZY',
  target: at.FETCH_CONTEXT_REQUEST,
  position: 'INSERT_INSTEAD',
  consequence: ({action, addRule}) => addRule({
    id: 'navigation/LAZY_FETCH/dispatch',
    target: at.SET_CATEGORIES,
    consequence: () => action
  }),
  addWhen: function* (_,getState) {
    const state = getState()
    const hasFetched = selectors.hasFetchedCategories(state.navigation)
    return hasFetched ? 'ABORT' : 'ADD_RULE'
  },
  addUntil: function* (action) {
    yield action(at.SET_CATEGORIES)
    return 'REMOVE_RULE'
  }
})
