// @flow
import * as at from './const'
import {addRule} from 'redux-interrupt'
import {hasFetchedCategories, getCategory} from './selectors'
import {fetchCategories, fetchCategoryContext} from './utils/api'
import {setCategories, fetchContextSuccess, fetchContextFailure} from './actions'

import type {Context, Category, CategoryId} from './entities'

addRule({
  id: 'core/FETCH_CATEGORIES',
  condition: (_, getState) => {
    const state = getState()
    return !hasFetchedCategories(state.navigation)
  },
  consequence: () => fetchCategories().then(setCategories),
  addOnce: true
})

addRule({
  id: 'core/FETCH_CATEGORY_CONTEXT',
  target: at.FETCH_CONTEXT_REQUEST,
  consequence: ({action, getState}) => {
    const {categoryId} = action.meta
    const state = getState()
    const category = getCategory(state.navigation, categoryId)
    if(!category) return fetchContextFailure(categoryId, 'categories not found')
    return fetchCategoryContext(category).then(
      result => fetchContextSuccess(categoryId, result),
      error => fetchContextFailure(categoryId, error.toString())
    )
  }
})

addRule({
  id:'core/FETCH_CATEGORY_CONTEXT_LAZY',
  target: at.FETCH_CONTEXT_REQUEST,
  position: 'INSERT_INSTEAD',
  consequence: ({action, addRule}) => addRule({
    id: 'core/LAZY_FETCH/dispatch',
    target: at.SET_CATEGORIES,
    consequence: () => action
  }),
  addWhen: function* (_,getState) {
    const state = getState()
    const hasFetched = hasFetchedCategories(state.navigation)
    return hasFetched ? 'ABORT' : 'ADD_RULE'
  },
  addUntil: function* (action) {
    yield action(at.SET_CATEGORIES)
    return 'REMOVE_RULE'
  }
})
