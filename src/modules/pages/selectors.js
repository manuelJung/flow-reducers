// @flow
import createReSelector from 're-reselect'
import type {State} from './reducer'
import type {Identifier, Page} from './entities'

export const shouldFetch = (state:State, identifier:Identifier):boolean => !state[identifier]
export const isFetching = (state:State, identifier:Identifier):boolean => state[identifier] && state[identifier].isFetching
export const getFetchError = (state:State, identifier:Identifier):string|null => state[identifier] ? state[identifier].fetchError : null
export const getPage = (state:State, identifier:Identifier):Page|null => state[identifier] ? state[identifier].data : null

export const getPageRequest: (state:State, identifier:Identifier)=>* = createReSelector(
  getPage,
  isFetching,
  getFetchError,
  shouldFetch,
  (data, isFetching, fetchError, shouldFetch) => ({ data, isFetching, fetchError, shouldFetch })
)((_,key) => key)