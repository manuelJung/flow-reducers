// @flow
import type {State} from './reducer'
import type {SearchKey, Product, FilterValues} from './entities'

export const getHits: (state:State, searchKey:SearchKey) => Product[]
= (state, searchKey) => state[searchKey].hits

export const isFetching: (state:State, searchKey:SearchKey) => boolean
= (state, searchKey) => state[searchKey].isFetching

export const getFilterValues: (state:State, searchKey:SearchKey) => FilterValues
= (state, searchKey) => state[searchKey].filterValues