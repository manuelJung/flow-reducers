// @flow
import * as at from './const'
import type {MagazinArticle, ListingMagazinArticle, UrlKey, ListingKey} from './entities'
import type {ListingResponse} from './utils/api'

export type FetchArticleRequestAction = {
  type: typeof at.FETCH_ARTICLE_REQUEST,
  meta: { urlKey:UrlKey }
}

export type FetchArticleSuccessAction = {
  type: typeof at.FETCH_ARTICLE_SUCCESS,
  meta: { urlKey:UrlKey },
  payload: MagazinArticle
}

export type FetchArticleFailureAction = {
  type: typeof at.FETCH_ARTICLE_FAILURE,
  meta: { urlKey:UrlKey },
  payload: string
}

export type FetchListRequestAction = {
  type: typeof at.FETCH_LIST_REQUEST,
  meta: { key:ListingKey }
}

export type FetchListSuccessAction = {
  type: typeof at.FETCH_LIST_SUCCESS,
  meta: { key:ListingKey },
  payload: ListingResponse
}

export type FetchListFailureAction = {
  type: typeof at.FETCH_LIST_FAILURE,
  meta: { key:ListingKey },
  payload: string
}

export type CreateListAction = {
  type: typeof at.CREATE_LIST,
  meta: { 
    category?: string,
    filterIds?: string[]
  },
  payload: ListingKey
}

export type ToggleCategoryAction = {
  type: typeof at.TOGGLE_CATEGORY,
  meta: { key:ListingKey },
  payload: string
}

export type SetPageAction = {
  type: typeof at.SET_PAGE,
  meta: { key:ListingKey },
  payload: number
}

export type Action = FetchArticleRequestAction
| FetchArticleSuccessAction
| FetchArticleFailureAction
| FetchListRequestAction
| FetchListSuccessAction
| FetchListFailureAction
| CreateListAction
| ToggleCategoryAction
| SetPageAction

export const fetchArticleRequest = (urlKey:UrlKey):FetchArticleRequestAction => ({
  type: at.FETCH_ARTICLE_REQUEST,
  meta: { urlKey }
})

export const fetchArticleSuccess = (urlKey:UrlKey, article:MagazinArticle):FetchArticleSuccessAction => ({
  type: at.FETCH_ARTICLE_SUCCESS,
  meta: { urlKey },
  payload: article
})

export const fetchArticleFailure = (urlKey:UrlKey, error:string):FetchArticleFailureAction => ({
  type: at.FETCH_ARTICLE_FAILURE,
  meta: { urlKey },
  payload: error
})

export const fetchListRequest = (key:ListingKey):FetchListRequestAction => ({
  type: at.FETCH_LIST_REQUEST,
  meta: { key }
})

export const fetchListSuccess = (key:ListingKey, response:ListingResponse):FetchListSuccessAction => ({
  type: at.FETCH_LIST_SUCCESS,
  meta: { key },
  payload: response
})

export const fetchListFailure = (key:ListingKey, error:string):FetchListFailureAction => ({
  type: at.FETCH_LIST_FAILURE,
  meta: { key },
  payload: error
})

export const createList = (key:ListingKey, filters:{ category?: string, filterIds?: string[] }):CreateListAction => ({
  type: at.CREATE_LIST,
  meta: filters,
  payload: key
})

export const toggleCategory = (key:ListingKey, category:string):ToggleCategoryAction => ({
  type: at.TOGGLE_CATEGORY,
  meta: { key },
  payload: category
})

export const setPageCategory = (key:ListingKey, page:number):SetPageAction => ({
  type: at.SET_PAGE,
  meta: { key },
  payload: page
})