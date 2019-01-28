// @flow
import * as at from './const'

import type {Identifier, Page} from './entities'

export type FetchRequestAction = {
  type: typeof at.FETCH_REQUEST,
  meta: {identifier:Identifier}
}

export type FetchSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: {identifier:Identifier},
  payload: Page
}

export type FetchFailureAction = {
  type: typeof at.FETCH_FAILURE,
  meta: {identifier:Identifier},
  payload: string
}

export type Action = FetchRequestAction | FetchSuccessAction | FetchFailureAction


export const fetchRequest = (identifier:Identifier):FetchRequestAction => ({
  type: at.FETCH_REQUEST,
  meta: {identifier}
})

export const fetchSuccess = (identifier:Identifier, page:Page):FetchSuccessAction => ({
  type: at.FETCH_SUCCESS,
  meta: {identifier},
  payload: page
})

export const fetchFailure = (identifier:Identifier, error:string):FetchFailureAction => ({
  type: at.FETCH_FAILURE,
  meta: {identifier},
  payload: error
})