// @flow
import createReSelector from 're-reselect'
import {createSelector} from 'reselect'

import type {State} from './reducer'
import type {CategoryId, Category, Context} from './entities'

export const hasFetchedCategories = (state:State):boolean => state.hasFetched

export const getCategory = (state:State, id:CategoryId):Category => state.categories[id]

export const getCategoryContext = (state:State, id:CategoryId):Context|null => state.categoryContexts[id]
  ? state.categoryContexts[id].context
  : null

export const categoriesWereFetched = (state:State):boolean => state.hasFetched

export const isFetchingCategoryContext = (state:State, id:CategoryId):boolean => state.categoryContexts[id]
  ? state.categoryContexts[id].isFetching
  : false

export const shouldFetchCategoryContext = (state:State, id:CategoryId):boolean => !state.categoryContexts[id]

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
