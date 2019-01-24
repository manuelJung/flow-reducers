// @flow
import * as at from './const'
import {addRule} from 'redux-interrupt'
import {hasFetchedCategories} from './selectors'
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
  consequence: ({action}) => fetchCategoryContext(action.meta.categoryId).then(
    result => fetchContextSuccess(action.meta.categoryId, result),
    error => fetchContextFailure(action.meta.categoryId, error.toString())
  )
})