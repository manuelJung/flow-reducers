// @flow
import * as at from './const'

import type {Slug, Page} from './entities'

export type FetchRequestAction = {
  type: typeof at.FETCH_REQUEST,
  meta: {slug:Slug}
}

export type FetchSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: {slug:Slug},
  payload: Page
}

export type FetchFailureAction = {
  type: typeof at.FETCH_FAILURE,
  meta: {slug:Slug},
  payload: string
}

export type Action = FetchRequestAction | FetchSuccessAction | FetchFailureAction


export const fetchRequest = (slug:Slug):FetchRequestAction => ({
  type: at.FETCH_REQUEST,
  meta: {slug}
})

export const fetchSuccess = (page:Page):FetchSuccessAction => ({
  type: at.FETCH_SUCCESS,
  meta: {slug: page.slug},
  payload: page
})

export const fetchFailure = (slug:Slug, error:string):FetchFailureAction => ({
  type: at.FETCH_FAILURE,
  meta: {slug},
  payload: error
})