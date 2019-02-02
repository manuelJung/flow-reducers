// @flow
import {addRule} from 'redux-interrupt'
import {INIT_LIST, TOGGLE_CATEGORY} from 'modules/products/const'
import {setContext} from 'modules/products/actions'
import {getCategoryRequest, getCategoryPathByCategoryName} from 'modules/categories/selectors'

// addRule({
//   id: 'feature/ADD_CATEGORY_CONTEXT_AFTER_SEARCH_INIT',
//   target: INIT_LIST,
//   position: 'INSERT_INSTEAD',
//   consequence: ({ action, getState }) => {
//     const state = getState()
//     const {category} = action.meta.initialValues
//     const categoryPath = getCategoryPathByCategoryName(state.categories, category)
//     const categoryRequest = getCategoryRequest(state.categories, categoryPath)
//   }
// })

addRule({
  id: 'feature/ADD_CONTEXT_AFTER_CATEGORY_REFINEMENT',
  target: TOGGLE_CATEGORY,
  zIndex: 9,
  consequence: ({ action, getState }) => {
    const state = getState()
    const category = action.payload
    const {identifier} = action.meta
    const categoryPath = getCategoryPathByCategoryName(state.categories, category)
    const categoryRequest = getCategoryRequest(state.categories, categoryPath)
    const categoryId = categoryRequest.data.id
    return setContext(identifier, 'category_'+categoryId)
  }
})