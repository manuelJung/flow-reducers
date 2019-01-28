// @flow
import type {MagazinArticle, ListingMagazinArticle, UrlKey, ListingKey} from './entities'
import type {State} from './reducer'
import createReSelector from 're-reselect'


// MAGAZIN ARTICLE



export const getMagazinArticle = (state:State, urlKey:UrlKey):MagazinArticle|null => state.articles[urlKey]
  ? state.articles[urlKey].data
  : null

export const isFetchingMagazinArticle = (state:State, urlKey:UrlKey):boolean => state.articles[urlKey]
  ? state.articles[urlKey].isFetching
  : false

export const shouldFetchMagazinArticle = (state:State, urlKey:UrlKey):boolean => !state.articles[urlKey]

export const getMagazinArticleFetchError = (state:State, urlKey:UrlKey):string|null => state.articles[urlKey]
  ? state.articles[urlKey].fetchError
  : null


export const getMagazinArticleRequest:(state:State, urlKey:UrlKey)=> * = createReSelector(
  getMagazinArticle,
  isFetchingMagazinArticle,
  getMagazinArticleFetchError,
  shouldFetchMagazinArticle,
  (data, isFetching, fetchError, shouldFetch) => ({data, isFetching, fetchError, shouldFetch})
)((_,urlKey) => urlKey)


// MAGAZIN LIST

export const getListHits = (state:State, key:ListingKey):ListingMagazinArticle[]|null => state.articleLists[key]
  ? state.articleLists[key].data
  : null

export const isFetchingList = (state:State, key:ListingKey):boolean => state.articleLists[key]
  ? state.articleLists[key].isFetching
  : false

export const shouldFetchList = (state:State, key:ListingKey):boolean => !state.articleLists[key]

export const getListFetchError = (state:State, key:ListingKey):string|null => state.articleLists[key]
  ? state.articleLists[key].fetchError
  : null

export const getListRequest:(state:State, key:ListingKey)=> * = createReSelector(
  getListHits,
  isFetchingList,
  getListFetchError,
  shouldFetchList,
  (data, isFetching, fetchError, shouldFetch) => ({data, isFetching, fetchError, shouldFetch})
)((_,key) => key)

// filters

export const getPage = (state:State, key:ListingKey):number => state.articleLists[key]
  ? state.articleLists[key].filters.page
  : 0

export const getCategory = (state:State, key:ListingKey):string => state.articleLists[key]
  ? state.articleLists[key].filters.category
  : ''

export const getFilterIds = (state:State, key:ListingKey):string[] => state.articleLists[key]
  ? state.articleLists[key].filters.filterIds
  : []

export const getFilters: (state:State, key:ListingKey)=>* = createReSelector(
  getPage,
  getCategory,
  getFilterIds,
  (page, category, filterIds) => ({page, category, filterIds})
)((_,key) => key)

// custom

export const getPagination: (state:State, key:ListingKey)=>* = createReSelector(
  getPage,
  (state:State, key:ListingKey) => state.articleLists[key] ? state.articleLists[key].numPages : 5,
  (page, numPages) => {
    return {
      page,
      numPages,
      hasNextPage: page < numPages,
      hasPrevPage: page >= numPages
    }
  }
)((_,key) => key)