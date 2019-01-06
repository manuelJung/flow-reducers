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
    +price: [number, number],
    +query: string,
    +tags: string[],
    +context: string,
    +page: number
  },
  +filterOptions: {
    +brand: string[],
    +size: string[],
    +color: string[],
    +shop: string[],
    +price: [number,number],
    +category: mixed,
    +exhaustive: boolean
  },
  +exhaustive: boolean,
  +numPages: number,
  +numHits: number
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
    // case at.FETCH_FILTER_REQUEST:
    // case at.FETCH_FILTER_SUCCESS:
    // case at.FETCH_FILTER_FAILURE:
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
    price: [0,100],
    query: '',
    tags: [],
    page: 0,
    context: ''
  },
  filterOptions: {
    brand: [],
    size: [],
    color: [],
    shop: [],
    price: [0,100],
    category: [],
    exhaustive: true
  },
  numPages: 1,
  numHits: 1,
  exhaustive: true
}

function searchReducer(state=initialSearchState, action:Action):SearchState{
  switch(action.type){
    case at.INIT: {
      return {
        ...state,
        filters: {
          ...state.filters,
          color: action.meta.initialValues.color || initialSearchState.filters.color,
          size: action.meta.initialValues.size || initialSearchState.filters.size,
          shop: action.meta.initialValues.shop || initialSearchState.filters.shop,
          brand: action.meta.initialValues.brand || initialSearchState.filters.brand,
          category: action.meta.initialValues.category || initialSearchState.filters.category,
          price: action.meta.initialValues.price || initialSearchState.filters.price,
          page: action.meta.initialValues.page || initialSearchState.filters.page,
          query: action.meta.initialValues.query || initialSearchState.filters.query,
          tags: action.meta.initialValues.tags || initialSearchState.filters.tags,
          context: action.meta.initialValues.context || initialSearchState.filters.context
        }
      }
    }
    default: return state
  }
}