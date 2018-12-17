// @flow
import type {State} from './reducer'
import type {Slug, Page} from './entities'

export const hasPage = (state:State, slug:Slug):boolean => Boolean(state[slug])
export const isFetching = (state:State, slug:Slug):boolean => state[slug] && state[slug].isFetching
export const getFetchError = (state:State, slug:Slug):string|null => state[slug] ? state[slug].fetchError : null
export const getPage = (state:State, slug:Slug):Page|null => state[slug] ? state[slug].page : null
