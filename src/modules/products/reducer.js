// @flow
import * as at from './const'
import {getArticles} from './selectors'

import type {Article, FilterKey, FilterValue} from './entities.flow'
import type {Action} from './actions'

export type State = {
  fetching: {[number:string]: boolean},
  fetchErrors: {[productId:string]: string },
  articles: {[productNumber:string]: Article[] },
  numberToProductNumber: {[number:string]: string},
  filters: {[productId:string]: {[filterKey:FilterKey]:FilterValue}},
  productIds: {[productId:string]: boolean}
}

export const defaultState = {
  fetching: {},
  fetchErrors: {},
  articles: {},
  numberToProductNumber: {},
  filters: {},
  productIds: {}
}

export default function reducer(state:State=defaultState, action:Action):State {
  switch(action.type){
    case at.FETCH_REQUEST: {
      return {
        ...state, 
        fetching: {
          ...state.fetching,
          [action.meta.number]: true
        },
        fetchErrors: {
          ...state.fetchErrors,
          [action.meta.productId]: null
        }
      }
    }

    case at.FETCH_FAILURE: {
      return {
        ...state, 
        fetching: {
          ...state.fetching,
          [action.meta.number]: false
        },
        fetchErrors: {
          ...state.fetchErrors,
          [action.meta.productId]: action.payload
        }
      }
    }

    case at.FETCH_SUCCESS: {
      const productNumber = action.payload[0].productNumber
      const ordernumbers = action.payload.map(art => art.ordernumber)
      return {
        ...state, 
        fetching: {
          ...state.fetching,
          [action.meta.number]: false
        },
        numbersToProductNumber: {
          ...state.numberToProductNumber,
          ...[productNumber, ...ordernumbers].reduce((p,n) => Object.assign(p, {[n]:productNumber}), {})
        },
        articles: {
          ...state.articles,
          [productNumber]: action.payload
        }
      }
    }

    case at.CREATE_PRODUCT: {
      const newState = Object.assign({}, state, {
        productIds: {
          ...state.productIds,
          [action.payload]: action.meta.number
        }
      })
      if(action.meta.createFilters){
        const {number} = action.meta
        const article = getArticles(state, number).find(art => art.ordernumber === number)
        if(!article) throw new Error('could not find article')
        newState.filters = {
          ...state.filters,
          [action.payload]: article.filterValues
        }
      }
      return newState
    }

    case at.CREATE_FILTER: {
      const {number} = action.meta
      const article = getArticles(state, number).find(art => art.ordernumber === number)
      if(!article) throw new Error('could not find article')
      return Object.assign({}, state, {
        filters: {
          ...state.filters,
          [action.payload]: article.filterValues
        }
      })
    }

    case at.SET_FILTER_VALUE: {
      const {filter, filterKey} = action.meta
      const newState = Object.assign({}, state)

      if(action.payload && !action.payload.selectable){
        newState.filters = {
          ...newState.filters,
          [filter.productId]: Object.keys(newState.filters[filter.productId])
            .reduce((p,key) => Object.assign(p, {[key]:null}), {})
        }
      }
      
      newState.filters = {
        ...newState.filters,
        [filter.productId]: {
          ...newState.filters[filter.productId],
          [filterKey]: action.payload
        }
      }
      return newState
    }

    default: return state
  }
}