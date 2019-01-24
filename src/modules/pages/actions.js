// @flow
import * as at from './const'

import type {UrlKey, Page} from './entities'

export type FetchRequestAction = {
  type: typeof at.FETCH_REQUEST,
  meta: {urlKey:UrlKey}
}

export type FetchSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: {urlKey:UrlKey},
  payload: Page
}

export type FetchFailureAction = {
  type: typeof at.FETCH_FAILURE,
  meta: {urlKey:UrlKey},
  payload: string
}

export type Action = FetchRequestAction | FetchSuccessAction | FetchFailureAction


export const fetchRequest = (urlKey:UrlKey):FetchRequestAction => ({
  type: at.FETCH_REQUEST,
  meta: {urlKey}
})

export const fetchSuccess = (page:Page):FetchSuccessAction => ({
  type: at.FETCH_SUCCESS,
  meta: {urlKey: page.urlKey},
  payload: page
})

export const fetchFailure = (urlKey:UrlKey, error:string):FetchFailureAction => ({
  type: at.FETCH_FAILURE,
  meta: {urlKey},
  payload: error
})