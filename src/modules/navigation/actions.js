// @flow
import * as at from './const'
import type {Context, Category, CategoryId} from './entities'
import type {FetchCategoriesResponse} from './utils/api'

export type SetCategoriesAction = {
  type: typeof at.SET_CATEGORIES,
  payload: FetchCategoriesResponse
}

export type FetchContextRequestAction = {
  type: typeof at.FETCH_CONTEXT_REQUEST,
  meta: {
    categoryId: CategoryId
  }
}

export type FetchContextSuccessAction = {
  type: typeof at.FETCH_CONTEXT_SUCCESS,
  meta: {
    categoryId: CategoryId
  },
  payload: Context
}

export type FetchContextFailureAction = {
  type: typeof at.FETCH_CONTEXT_FAILURE,
  meta: {
    categoryId: CategoryId
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

export const fetchContextRequest = (categoryId:CategoryId):FetchContextRequestAction => ({
  type: at.FETCH_CONTEXT_REQUEST,
  meta: { categoryId }
})

export const fetchContextSuccess = (categoryId:CategoryId, context:Context):FetchContextSuccessAction => ({
  type: at.FETCH_CONTEXT_SUCCESS,
  meta: { categoryId },
  payload: context
})

export const fetchContextFailure = (categoryId:CategoryId, error:string):FetchContextFailureAction => ({
  type: at.FETCH_CONTEXT_FAILURE,
  meta: { categoryId },
  payload: error
})