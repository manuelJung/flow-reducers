// @flow
import * as at from './const'
import {addRule} from 'redux-interrupt'
import * as selectors from './selectors'
import * as api from './utils/api'
import * as actions from './actions'

addRule({
  id: 'categories/FETCH_CATEGORIES',
  condition: (_, getState) => {
    const state = getState()
    return !selectors.hasFetchedCategories(state.categories)
  },
  consequence: () => api.fetchCategories().then(actions.setCategories),
  addOnce: true
})

addRule({
  id: 'categories/FETCH_CATEGORY_CONTEXT',
  target: at.FETCH_CONTEXT_REQUEST,
  concurrency: 'FIRST',
  concurrencyFilter: action => action.meta.identifier,
  consequence: ({action, getState}) => {
    const {identifier} = action.meta
    const state = getState()
    const category = selectors.getCategory(state.categories, identifier)
    if(!category) return actions.fetchContextFailure(identifier, 'categories not found')
    return api.fetchCategoryContext(category).then(
      result => actions.fetchContextSuccess(identifier, result),
      error => actions.fetchContextFailure(identifier, error.toString())
    )
  }
})

addRule({
  id:'categories/FETCH_CATEGORY_CONTEXT_LAZY',
  target: at.FETCH_CONTEXT_REQUEST,
  position: 'INSERT_INSTEAD',
  zIndex: 2,
  consequence: ({action, addRule}) => addRule({
    id: 'categories/LAZY_FETCH/dispatch',
    target: at.SET_CATEGORIES,
    consequence: () => action
  }),
  addWhen: function* (_,getState) { // eslint-disable-line require-yield
    const state = getState()
    const hasFetched = selectors.hasFetchedCategories(state.categories)
    return hasFetched ? 'ABORT' : 'ADD_RULE'
  },
  addUntil: function* (action) {
    yield action(at.SET_CATEGORIES)
    return 'REMOVE_RULE'
  }
})

