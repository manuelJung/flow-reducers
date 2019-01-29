// @flow
import * as at from './const'

import type {ProductIdentifier, ListIdentifier, Product, FilterOption, CategoryOption, FilterValues} from './entities'
import type {Action} from './actions'

export type State = {
  products: {[id:ProductIdentifier]: ProductState}, // eslint-disable-line no-use-before-define
  lists: {[id:ListIdentifier]: ListState} // eslint-disable-line no-use-before-define
}

type ProductState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +data: Product | null
}

type ListState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +data: Product[] | null,
  +filterValues: FilterValues,
  +filterOptions: {|
    +brand: FilterOption[],
    +size: FilterOption[],
    +color: FilterOption[],
    +shop: FilterOption[],
    +price: [number,number],
    +category: CategoryOption[]
  |},
  +exhaustiveHits: boolean,
  +exhaustiveFilters: boolean,
  +numPages: number,
  +numHits: number,
  +queryString: string
}

export default function reducer(state:State={}, action:Action):State{
  switch(action.type){
    // PRODUCT
    case at.FETCH_REQUEST:
    case at.FETCH_SUCCESS:
    case at.FETCH_FAILURE: {
      const {identifier} = action.meta
      return {
        ...state,
        products: {
          ...state.products,
          [identifier]: productReducer(state.products[identifier], action)
        }
      }
    }

    // LIST
    case at.FETCH_LIST_SUCCESS: {
      const {identifier} = action.meta
      const hitsDict = action.payload.hits.reduce((hits, product) => {
        if(!state.products[product.objectID]){
          if(!hits) hits = {}
          hits[product.objectID] = {
            isFetching: false,
            fetchError: null,
            data: product
          }
        }
        return hits
      }, null)

      const nextProducts = hitsDict ? Object.assign({}, state.products, hitsDict) : state.products

      return {
        ...state,
        products: nextProducts,
        lists: {
          ...state.lists,
          [identifier]: listReducer(state.lists[identifier], action)
        }
      }
    }
    case at.INIT_LIST:
    case at.FETCH_LIST_REQUEST:
    case at.FETCH_LIST_FAILURE: 
    case at.TOGGLE_FILTER:
    case at.SET_PRICE_RANGE:
    case at.TOGGLE_CATEGORY:
    case at.SET_CONTEXT:
    case at.SET_PAGE:
    case at.SET_QUERY:
    case at.TOGGLE_TAG:
    case at.SET_FILTER_OPTIONS:
    case at.SET_CATEGORY_OPTIONS: {
      const {identifier} = action.meta
      return {
        ...state,
        lists: {
          ...state.lists,
          [identifier]: listReducer(state.lists[identifier], action)
        }
      }
    }
    default: return state
  }
}

const initialProductState:ProductState = {
  isFetching: false,
  fetchError: null,
  data: null
}

function productReducer (state:ProductState=initialProductState, action:Action) {
  switch(action.type){
    case at.FETCH_REQUEST: {
      return {
        ...state,
        isFetching: true,
        fetchError: null
      }
    }
    case at.FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    }
    case at.FETCH_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload
      }
    }
    default: return state
  }
}

const initialListState:ListState = {
  isFetching: false,
  fetchError: null,
  data: null,
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
  },
  exhaustiveHits: true,
  exhaustiveFilters: true,
  numPages: 1,
  numHits: 1,
  queryString: ''
}

function listReducer(state:ListState=initialListState, action:Action):ListState{
  switch(action.type){
    case at.INIT_LIST: {
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          color: action.meta.initialValues.color || initialListState.filterValues.color,
          size: action.meta.initialValues.size || initialListState.filterValues.size,
          shop: action.meta.initialValues.shop || initialListState.filterValues.shop,
          brand: action.meta.initialValues.brand || initialListState.filterValues.brand,
          category: action.meta.initialValues.category || initialListState.filterValues.category,
          price: action.meta.initialValues.price || initialListState.filterValues.price,
          page: action.meta.initialValues.page || initialListState.filterValues.page,
          query: action.meta.initialValues.query || initialListState.filterValues.query,
          tags: action.meta.initialValues.tags || initialListState.filterValues.tags,
          context: action.meta.initialValues.context || initialListState.filterValues.context
        }
      }
    }
    case at.FETCH_LIST_REQUEST: {
      return {
        ...state,
        isFetching: true,
        fetchError: null
      }
    }
    case at.FETCH_LIST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload
      }
    }
    case at.FETCH_LIST_SUCCESS: {
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
        data: action.payload.hits,
        numHits: action.payload.numHits,
        numPages: action.payload.numPages,
        exhaustiveFilters: action.payload.exhaustiveFacetsCount,
        exhaustiveHits: true,
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
    case at.SET_PRICE_RANGE: {
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
