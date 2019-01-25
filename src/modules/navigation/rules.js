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
  consequence: () => fetchCategories().then(setCategories)
})

addRule({
  id: 'core/FETCH_CATEGORY_CONTEXT',
  target: at.FETCH_CONTEXT_REQUEST,
  consequence: ({action, getState}) => {
    const {categoryId} = action.meta
    const state = getState()
    const category = getCategory(state.navigation, categoryId)
    return fetchCategoryContext(category).then(
      result => fetchContextSuccess(categoryId, result),
      error => fetchContextFailure(categoryId, error.toString())
    )
  }
})