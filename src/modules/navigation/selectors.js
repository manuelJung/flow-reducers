// @flow
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