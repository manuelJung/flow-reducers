// @flow
import * as at from './const'

import type {SearchKey, Product} from './entities'
import type {Action} from './actions'

export type State = {
  +[id:SearchKey]: SearchState
}

type SearchState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +hits: Product[],
  +filters: {
    +color: string[],
    +size: string[],
    +shop: string[],
    +brand: string[],
    +category: string,
    +price: [number, number] | null
  },
  +filterOptions: {
    +brand: string[],
    +size: string[],
    +color: string[],
    +shop: string[],
    +price: [number,number] | null,
    +category: mixed,
    +exhaustive: boolean
  },
  +pagination: {
    +page: number,
    +numPages: number,
    +numHits: number,
    +exhaustive: boolean
  },
  +query: string,
  +tags: string[],
  +context: string,
}

export default function reducer(state:State={}, action:Action):State{
  switch(action.type){
    case at.FETCH_REQUEST:
    case at.FETCH_SUCCESS:
    case at.FETCH_FAILURE: 
    case at.TOGGLE_FILTER:
    case at.SET_PRICE:
    case at.TOGGLE_CATEGORY:
    case at.SET_CONTEXT:
    case at.SET_PAGE:
    case at.SET_QUERY:
    case at.TOGGLE_TAG:
    case at.FETCH_FILTER_REQUEST:
    case at.FETCH_FILTER_SUCCESS:
    case at.FETCH_FILTER_FAILURE:
      return Object.assign({}, state, {
        [action.meta.searchKey]: searchReducer(state[action.meta.searchKey], action)
      })
    default: return state
  }
}

const initialSearchState:SearchState = {
  isFetching: false,
  fetchError: null,
  hits: [],
  filters: {
    color: [],
    size: [],
    shop: [],
    brand: [],
    category: '',
    price: null
  },
  filterOptions: {
    brand: [],
    size: [],
    color: [],
    shop: [],
    price: null,
    category: [],
    exhaustive: true
  },
  pagination: {
    page: 0,
    numPages: 1,
    numHits: 1,
    exhaustive: true
  },
  query: '',
  tags: [],
  context: '',
}

function searchReducer(state=initialSearchState, action:Action):SearchState{
  switch(action.type){
    default: return state
  }
}