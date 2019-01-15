// @flow
import type {State} from './reducer'
import type {SearchKey, Product} from './entities'

export const getHits: (state:State, searchKey:SearchKey) => Product[]
= (state, searchKey) => state[searchKey].hits

export const isFetching: (state:State, searchKey:SearchKey) => boolean
= (state, searchKey) => state[searchKey].isFetching

