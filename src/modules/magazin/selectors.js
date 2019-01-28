// @flow
import type {MagazinArticle, ListingMagazinArticle, ArticleIdentifier, ListIdentifier} from './entities'
import type {State} from './reducer'
import createReSelector from 're-reselect'


// MAGAZIN ARTICLE



export const getMagazinArticle = (state:State, identifier:ArticleIdentifier):MagazinArticle|null => state.articles[identifier]
  ? state.articles[identifier].data
  : null

export const isFetchingMagazinArticle = (state:State, identifier:ArticleIdentifier):boolean => state.articles[identifier]
  ? state.articles[identifier].isFetching
  : false

export const shouldFetchMagazinArticle = (state:State, identifier:ArticleIdentifier):boolean => !state.articles[identifier]

export const getMagazinArticleFetchError = (state:State, identifier:ArticleIdentifier):string|null => state.articles[identifier]
  ? state.articles[identifier].fetchError
  : null


export const getMagazinArticleRequest:(state:State, identifier:ArticleIdentifier)=> * = createReSelector(
  getMagazinArticle,
  isFetchingMagazinArticle,
  getMagazinArticleFetchError,
  shouldFetchMagazinArticle,
  (data, isFetching, fetchError, shouldFetch) => ({data, isFetching, fetchError, shouldFetch})
)((_,identifier) => identifier)


// MAGAZIN LIST

export const getListHits = (state:State, identifier:ListIdentifier):ListingMagazinArticle[]|null => state.articleLists[identifier]
  ? state.articleLists[identifier].data
  : null

export const isFetchingList = (state:State, identifier:ListIdentifier):boolean => state.articleLists[identifier]
  ? state.articleLists[identifier].isFetching
  : false

export const shouldFetchList = (state:State, identifier:ListIdentifier):boolean => !state.articleLists[identifier]

export const getListFetchError = (state:State, identifier:ListIdentifier):string|null => state.articleLists[identifier]
  ? state.articleLists[identifier].fetchError
  : null

export const getListRequest:(state:State, identifier:ListIdentifier)=> * = createReSelector(
  getListHits,
  isFetchingList,
  getListFetchError,
  shouldFetchList,
  (data, isFetching, fetchError, shouldFetch) => ({data, isFetching, fetchError, shouldFetch})
)((_,identifier) => identifier)

// filters

export const getPage = (state:State, identifier:ListIdentifier):number => state.articleLists[identifier]
  ? state.articleLists[identifier].filters.page
  : 0

export const getCategory = (state:State, identifier:ListIdentifier):string => state.articleLists[identifier]
  ? state.articleLists[identifier].filters.category
  : ''

export const getCategoryOptions = (state:State, identifier:ListIdentifier):string[] => state.articleLists[identifier]
  ? state.articleLists[identifier].filterOptions.category
  : []

export const getFilterIds = (state:State, identifier:ListIdentifier):string[] => state.articleLists[identifier]
  ? state.articleLists[identifier].filters.filterIds
  : []

export const getFilters: (state:State, identifier:ListIdentifier)=>* = createReSelector(
  getPage,
  getCategory,
  getFilterIds,
  (page, category, filterIds) => ({page, category, filterIds})
)((_,identifier) => identifier)

// custom

export const getPagination: (state:State, identifier:ListIdentifier)=>* = createReSelector(
  getPage,
  (state:State, identifier:ListIdentifier) => state.articleLists[identifier] ? state.articleLists[identifier].numPages : 5,
  (page, numPages) => {
    return {
      page,
      numPages,
      hasNextPage: page < numPages,
      hasPrevPage: page >= numPages
    }
  }
)((_,identifier) => identifier)