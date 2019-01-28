// @flow
import createReSelector from 're-reselect'
import {createSelector} from 'reselect'

import type {State} from './reducer'
import type {CategoryId, Category, Context} from './entities'

// CATEGORY

export const getCategory = (state:State, id:CategoryId):Category|null => state.categories[id] || null

export const hasFetchedCategories = (state:State):boolean => state.hasFetched

export const getCategoryRequest: (state:State, id:CategoryId)=>* = createReSelector(
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

export const getCategoryContext = (state:State, id:CategoryId):Context|null => state.categoryContexts[id]
  ? state.categoryContexts[id].data
  : null

export const shouldFetchCategoryContext = (state:State, id:CategoryId):boolean => !state.categoryContexts[id]

export const isFetchingCategoryContext = (state:State, id:CategoryId):boolean => state.categoryContexts[id]
  ? state.categoryContexts[id].isFetching
  : false

export const getCategoryContextFetchError = (state:State, id:CategoryId):string|null => state.categoryContexts[id]
  ? state.categoryContexts[id].fetchError
  : null

export const getCategoryContextRequest:(state:State, id:CategoryId)=>* = createReSelector(
  getCategoryContext,
  shouldFetchCategoryContext,
  isFetchingCategoryContext,
  getCategoryContextFetchError,
  (data, shouldFetch, isFetching, fetchError) => ({ data, shouldFetch, isFetching, fetchError })
)((_,id)=>id)

// custom

export const getCategoryIdByCategoryName:(state:State, name:string) => CategoryId = createReSelector(
  (state:State) => state.categories,
  (_,name:string) => name,
  (categories, name) => {
    const categoryIdList = Object.keys(categories)
    const categoryId = categoryIdList.find(id => categories[id].category === name)
    return categoryId || ''
  }
)((_,name) => name)

export const getRootCategories:(state:State) => Category[] = createSelector(
  (state:State) => state.rootCategoryIds,
  (state:State) => state.categories,
  (categoryIds, categories) => categoryIds.map(id => categories[id])
)
