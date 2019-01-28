// @flow
import * as at from './const'

import type {SearchKey, Product, FilterOption, CategoryOption, FilterValues} from './entities'
import type {Action} from './actions'

export type State = {
  +[id:SearchKey]: SearchState // eslint-disable-line no-use-before-define
}

type SearchState = {|
  +isFetching: boolean,
  +fetchError: string | null,
  +hits: Product[],
  +filterValues: FilterValues,
  +filterOptions: {|
    +brand: FilterOption[],
    +size: FilterOption[],
    +color: FilterOption[],
    +shop: FilterOption[],
    +price: [number,number],
    +category: CategoryOption[],
    +exhaustive: boolean
  |},
  +exhaustive: boolean,
  +numPages: number,
  +numHits: number,
  queryString: string
|}

export default function reducer(state:State={}, action:Action):State{
  switch(action.type){
    case at.INIT:
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
    case at.SET_FILTER_OPTIONS:
    case at.SET_CATEGORY_OPTIONS:
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
  filterValues: {
    color: [],
    size: [],
    shop: [],
    brand: [],
    category: '',
    price: null,
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
  exhaustive: true,
  queryString: ''
}

function searchReducer(state=initialSearchState, action:Action):SearchState{
  switch(action.type){
    case at.INIT: {
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          color: action.meta.initialValues.color || initialSearchState.filterValues.color,
          size: action.meta.initialValues.size || initialSearchState.filterValues.size,
          shop: action.meta.initialValues.shop || initialSearchState.filterValues.shop,
          brand: action.meta.initialValues.brand || initialSearchState.filterValues.brand,
          category: action.meta.initialValues.category || initialSearchState.filterValues.category,
          price: action.meta.initialValues.price || initialSearchState.filterValues.price,
          page: action.meta.initialValues.page || initialSearchState.filterValues.page,
          query: action.meta.initialValues.query || initialSearchState.filterValues.query,
          tags: action.meta.initialValues.tags || initialSearchState.filterValues.tags,
          context: action.meta.initialValues.context || initialSearchState.filterValues.context
        }
      }
    }
    case at.FETCH_REQUEST: {
      return {
        ...state,
        isFetching: true,
        fetchError: null
      }
    }
    case at.FETCH_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload
      }
    }
    case at.FETCH_SUCCESS: {
      const priceSet = Boolean(state.filterValues.price)
      const priceMin = (action => {
        if(!state.filterValues.price) return 0
        if(state.filterValues.price[0] === state.filterOptions.price[0]) return action.payload.minPrice
        if(action.payload.minPrice > state.filterValues.price[0]) return action.payload.minPrice
        return state.filterValues.price[0]
      })(action)
      const priceMax = (action => {
        if(!state.filterValues.price) return 0
        if(state.filterValues.price[1] === state.filterOptions.price[1]) return action.payload.maxPrice
        if(action.payload.maxPrice > state.filterValues.price[1]) return action.payload.maxPrice
        return state.filterValues.price[1]
      })(action)
      return {
        ...state,
        isFetching: false,
        hits: action.payload.hits,
        numHits: action.payload.numHits,
        numPages: action.payload.numPages,
        exhaustive: action.payload.exhaustiveFacetsCount,
        queryString: action.payload.queryString,
        filterOptions: {
          ...state.filterOptions,
          brand: action.payload.brandOptions,
          color: action.payload.colorOptions,
          shop: action.payload.shopOptions,
          size: action.payload.sizeOptions,
          category: action.payload.categories,
          price: [
            action.payload.minPrice,
            action.payload.maxPrice
          ]
        },
        // update price value
        filterValues: {
          ...state.filterValues,
          price: priceSet ? [priceMin, priceMax] : null
        }
      }
    }
    case at.TOGGLE_FILTER: {
      const {meta:{filterKey}, payload} = action
      const filter = state.filterValues[filterKey]
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          [filterKey]: filter.includes(payload) ? filter.filter(s => s !== payload) : [...filter, payload]
        }
      }
    }
    case at.SET_PRICE: {
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          price: action.payload
        }
      }
    }
    case at.TOGGLE_CATEGORY: {
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          category: state.filterValues.category === action.payload ? '' : action.payload
        }
      }
    }
    case at.SET_CONTEXT: {
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          context: action.payload
        }
      }
    }
    case at.SET_PAGE: {
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: action.payload
        }
      }
    }
    case at.SET_QUERY: {
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          query: action.payload
        }
      }
    }
    case at.TOGGLE_TAG: {
      const {payload} = action
      const {tags} = state.filterValues
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          tags: tags.includes(payload) ? tags.filter(t => t !== payload) : [...tags, payload]
        }
      }
    }
    case at.SET_FILTER_OPTIONS: {
      const {filterKey} = action.meta
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          [filterKey]: action.payload
        }
      }
    }
    case at.SET_CATEGORY_OPTIONS: {
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          category: action.payload
        }
      }
    }
    default: return state
  }
}
