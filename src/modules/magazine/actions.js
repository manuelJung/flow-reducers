// @flow
import * as at from './const'
import type {MagazineArticle, ArticleIdentifier, ListIdentifier, ListingFilters} from './entities'
import type {ListingResponse} from './utils/api'

export type FetchArticleRequestAction = {
  type: typeof at.FETCH_ARTICLE_REQUEST,
  meta: { identifier:ArticleIdentifier }
}

export type FetchArticleSuccessAction = {
  type: typeof at.FETCH_ARTICLE_SUCCESS,
  meta: { identifier:ArticleIdentifier },
  payload: MagazineArticle
}

export type FetchArticleFailureAction = {
  type: typeof at.FETCH_ARTICLE_FAILURE,
  meta: { identifier:ArticleIdentifier },
  payload: string
}

export type FetchListRequestAction = {
  type: typeof at.FETCH_LIST_REQUEST,
  meta: { identifier:ListIdentifier }
}

export type FetchListSuccessAction = {
  type: typeof at.FETCH_LIST_SUCCESS,
  meta: { identifier:ListIdentifier },
  payload: ListingResponse
}

export type FetchListFailureAction = {
  type: typeof at.FETCH_LIST_FAILURE,
  meta: { identifier:ListIdentifier },
  payload: string
}

export type CreateListAction = {
  type: typeof at.CREATE_LIST,
  meta: { 
    filters: ListingFilters,
    identifier: ListIdentifier
  },
  payload: ListIdentifier
}

export type ToggleCategoryAction = {
  type: typeof at.TOGGLE_CATEGORY,
  meta: { identifier:ListIdentifier },
  payload: string
}

export type SetPageAction = {
  type: typeof at.SET_PAGE,
  meta: { identifier:ListIdentifier },
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

export const fetchArticleRequest = (identifier:ArticleIdentifier):FetchArticleRequestAction => ({
  type: at.FETCH_ARTICLE_REQUEST,
  meta: { identifier }
})

export const fetchArticleSuccess = (identifier:ArticleIdentifier, article:MagazineArticle):FetchArticleSuccessAction => ({
  type: at.FETCH_ARTICLE_SUCCESS,
  meta: { identifier },
  payload: article
})

export const fetchArticleFailure = (identifier:ArticleIdentifier, error:string):FetchArticleFailureAction => ({
  type: at.FETCH_ARTICLE_FAILURE,
  meta: { identifier },
  payload: error
})

export const fetchListRequest = (identifier:ListIdentifier):FetchListRequestAction => ({
  type: at.FETCH_LIST_REQUEST,
  meta: { identifier }
})

export const fetchListSuccess = (identifier:ListIdentifier, response:ListingResponse):FetchListSuccessAction => ({
  type: at.FETCH_LIST_SUCCESS,
  meta: { identifier },
  payload: response
})

export const fetchListFailure = (identifier:ListIdentifier, error:string):FetchListFailureAction => ({
  type: at.FETCH_LIST_FAILURE,
  meta: { identifier },
  payload: error
})

export const createList = (identifier:ListIdentifier, filters?:$Shape<ListingFilters>={}):CreateListAction => ({
  type: at.CREATE_LIST,
  meta: {filters, identifier},
  payload: identifier
})

export const toggleCategory = (identifier:ListIdentifier, category:string):ToggleCategoryAction => ({
  type: at.TOGGLE_CATEGORY,
  meta: { identifier },
  payload: category
})

export const setPageCategory = (identifier:ListIdentifier, page:number):SetPageAction => ({
  type: at.SET_PAGE,
  meta: { identifier },
  payload: page
})