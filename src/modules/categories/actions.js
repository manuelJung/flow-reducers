// @flow
import * as at from './const'
import type {Context, Identifier} from './entities'
import type {FetchCategoriesResponse} from './utils/api'

export type SetCategoriesAction = {
  type: typeof at.SET_CATEGORIES,
  payload: FetchCategoriesResponse
}

export type FetchContextRequestAction = {
  type: typeof at.FETCH_CONTEXT_REQUEST,
  meta: {
    identifier: Identifier
  }
}

export type FetchContextSuccessAction = {
  type: typeof at.FETCH_CONTEXT_SUCCESS,
  meta: {
    identifier: Identifier
  },
  payload: Context
}

export type FetchContextFailureAction = {
  type: typeof at.FETCH_CONTEXT_FAILURE,
  meta: {
    identifier: Identifier
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

export const fetchContextRequest = (identifier:Identifier):FetchContextRequestAction => ({
  type: at.FETCH_CONTEXT_REQUEST,
  meta: { identifier }
})

export const fetchContextSuccess = (identifier:Identifier, context:Context):FetchContextSuccessAction => ({
  type: at.FETCH_CONTEXT_SUCCESS,
  meta: { identifier },
  payload: context
})

export const fetchContextFailure = (identifier:Identifier, error:string):FetchContextFailureAction => ({
  type: at.FETCH_CONTEXT_FAILURE,
  meta: { identifier },
  payload: error
})