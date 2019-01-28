// @flow
import * as at from './const'
import type {Context, Category, CategoryPath} from './entities'
import type {FetchCategoriesResponse} from './utils/api'

export type SetCategoriesAction = {
  type: typeof at.SET_CATEGORIES,
  payload: FetchCategoriesResponse
}

export type FetchContextRequestAction = {
  type: typeof at.FETCH_CONTEXT_REQUEST,
  meta: {
    categoryPath: CategoryPath
  }
}

export type FetchContextSuccessAction = {
  type: typeof at.FETCH_CONTEXT_SUCCESS,
  meta: {
    categoryPath: CategoryPath
  },
  payload: Context
}

export type FetchContextFailureAction = {
  type: typeof at.FETCH_CONTEXT_FAILURE,
  meta: {
    categoryPath: CategoryPath
  },
  payload: string
}

export type Action = SetCategoriesAction
| FetchContextRequestAction
| FetchContextSuccessAction
| FetchContextFailureAction


export const setCategories = (response:FetchCategoriesResponse):SetCategoriesAction => ({
  type: at.SET_CATEGORIES,
  payload: response
})

export const fetchContextRequest = (categoryPath:CategoryPath):FetchContextRequestAction => ({
  type: at.FETCH_CONTEXT_REQUEST,
  meta: { categoryPath }
})

export const fetchContextSuccess = (categoryPath:CategoryPath, context:Context):FetchContextSuccessAction => ({
  type: at.FETCH_CONTEXT_SUCCESS,
  meta: { categoryPath },
  payload: context
})

export const fetchContextFailure = (categoryPath:CategoryPath, error:string):FetchContextFailureAction => ({
  type: at.FETCH_CONTEXT_FAILURE,
  meta: { categoryPath },
  payload: error
})