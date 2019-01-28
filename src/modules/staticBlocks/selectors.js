// @flow
import createReSelector from 're-reselect'
import type {State} from './reducer'
import type {Identifier, StaticBlock} from './entities'

export const shouldFetch = (state:State, identifier:Identifier):boolean => !state[identifier]
export const isFetching = (state:State, identifier:Identifier):boolean => state[identifier] && state[identifier].isFetching
export const getFetchError = (state:State, identifier:Identifier):string|null => state[identifier] ? state[identifier].fetchError : null
export const getStaticBlock = (state:State, identifier:Identifier):StaticBlock|null => state[identifier] ? state[identifier].data : null

export const getStaticBlockRequest: (state:State, identifier:Identifier)=>* = createReSelector(
  getStaticBlock,
  isFetching,
  getFetchError,
  shouldFetch,
  (data, isFetching, fetchError, shouldFetch) => ({ data, isFetching, fetchError, shouldFetch })
)((_,identifier) => identifier)