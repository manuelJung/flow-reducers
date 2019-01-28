// @flow
import createReSelector from 're-reselect'
import {createSelector} from 'reselect'

import type {State} from './reducer'
import type {CategoryPath, Category, Context} from './entities'

// CATEGORY

export const getCategory = (state:State, id:CategoryPath):Category|null => state.categories[id] || null

export const hasFetchedCategories = (state:State):boolean => state.hasFetched

export const getCategoryRequest: (state:State, id:CategoryPath)=>* = createReSelector(
  getCategory,
  hasFetchedCategories,
  (data, hasFetched) => ({
    data,
    isFetching: !hasFetched,
    fetchError: null,
    shouldFetch: false
  })
)((_,id)=>id)

// CONTEXT

export const getCategoryContext = (state:State, id:CategoryPath):Context|null => state.categoryContexts[id]
  ? state.categoryContexts[id].data
  : null

export const shouldFetchCategoryContext = (state:State, id:CategoryPath):boolean => !state.categoryContexts[id]

export const isFetchingCategoryContext = (state:State, id:CategoryPath):boolean => state.categoryContexts[id]
  ? state.categoryContexts[id].isFetching
  : false

export const getCategoryContextFetchError = (state:State, id:CategoryPath):string|null => state.categoryContexts[id]
  ? state.categoryContexts[id].fetchError
  : null

export const getCategoryContextRequest:(state:State, id:CategoryPath)=>* = createReSelector(
  getCategoryContext,
  shouldFetchCategoryContext,
  isFetchingCategoryContext,
  getCategoryContextFetchError,
  (data, shouldFetch, isFetching, fetchError) => ({ data, shouldFetch, isFetching, fetchError })
)((_,id)=>id)

// custom

export const getCategoryPathByCategoryName:(state:State, name:string) => CategoryPath = createReSelector(
  (state:State) => state.categories,
  (_,name:string) => name,
  (categories, name) => {
    const categoryPathList = Object.keys(categories)
    const categoryPath = categoryPathList.find(id => categories[id].category === name)
    return categoryPath || ''
  }
)((_,name) => name)

export const getRootCategories:(state:State) => Category[] = createSelector(
  (state:State) => state.rootCategoryPaths,
  (state:State) => state.categories,
  (categoryPaths, categories) => categoryPaths.map(id => categories[id])
)
