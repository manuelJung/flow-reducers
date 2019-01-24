// @flow
import type {State} from './reducer'
import type {UrlKey, Page} from './entities'

export const shouldFetch = (state:State, urlKey:UrlKey):boolean => !state[urlKey]
export const isFetching = (state:State, urlKey:UrlKey):boolean => state[urlKey] && state[urlKey].isFetching
export const getFetchError = (state:State, urlKey:UrlKey):string|null => state[urlKey] ? state[urlKey].fetchError : null
export const getPage = (state:State, urlKey:UrlKey):Page|null => state[urlKey] ? state[urlKey].page : null
