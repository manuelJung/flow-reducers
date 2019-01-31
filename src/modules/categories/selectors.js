// @flow
import createReSelector from 're-reselect'
import {createSelector} from 'reselect'

import type {State} from './reducer'
import type {Identifier, Category, Context} from './entities'

// CATEGORY

export const getCategory = (state:State, id:Identifier):Category|null => state.categories[id] || null

export const hasFetchedCategories = (state:State):boolean => state.hasFetched

export const getCategoryRequest: (state:State, id:Identifier)=>* = createReSelector(
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

export const getCategoryContext = (state:State, id:Identifier):Context|null => state.categoryContexts[id]
  ? state.categoryContexts[id].data
  : null

export const shouldFetchCategoryContext = (state:State, id:Identifier):boolean => !state.categoryContexts[id]

export const isFetchingCategoryContext = (state:State, id:Identifier):boolean => state.categoryContexts[id]
  ? state.categoryContexts[id].isFetching
  : false

export const getCategoryContextFetchError = (state:State, id:Identifier):string|null => state.categoryContexts[id]
  ? state.categoryContexts[id].fetchError
  : null

export const getCategoryContextRequest:(state:State, id:Identifier)=>* = createReSelector(
  getCategoryContext,
  shouldFetchCategoryContext,
  isFetchingCategoryContext,
  getCategoryContextFetchError,
  (data, shouldFetch, isFetching, fetchError) => ({ data, shouldFetch, isFetching, fetchError })
)((_,id)=>id)

// custom

export const getCategoryPathByCategoryName:(state:State, name:string) => Identifier = createReSelector(
  (state:State) => state.categories,
  (_,name:string) => name,
  (categories, name) => {
    const identifiers = Object.keys(categories)
    const identifier = identifiers.find(id => categories[id].category === name)
    return identifier || ''
  }
)((_,name) => name)

export const getRootCategories:(state:State) => Category[] = createSelector(
  (state:State) => state.rootIdentifiers,
  (state:State) => state.categories,
  (identifiers, categories) => identifiers.map(id => categories[id])
)
