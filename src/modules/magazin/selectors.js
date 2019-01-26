// @flow
import type {MagazinArticle, ListingMagazinArticle, UrlKey, ListingKey} from './entities'
import type {State} from './reducer'


// MAGAZIN ARTICLE

export const getMagazinArticle = (state:State, urlKey:UrlKey):MagazinArticle|null => state.articles[urlKey]
  ? state.articles[urlKey].article
  : null

export const isFetchingMagazinArticle = (state:State, urlKey:UrlKey):boolean => state.articles[urlKey]
  ? state.articles[urlKey].isFetching
  : false

export const shouldFetchMagazinArticle = (state:State, urlKey:UrlKey):boolean => !state.articles[urlKey]

export const getMagazinArticleFetchError = (state:State, urlKey:UrlKey):string|null => state.articles[urlKey]
  ? state.articles[urlKey].fetchError
  : null


// MAGAZIN LIST

