// @flow
import * as at from './const'
import type {Identifier, Category, Context} from './entities'
import type {Action} from './actions'

export type State = {
  +categories: {+[id:Identifier]:Category},
  +rootIdentifiers: Identifier[],
  +hasFetched: boolean,
  +categoryContexts: {+[id:Identifier]:ContextState} // eslint-disable-line no-use-before-define
}

type ContextState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +data: Context | null
}

export const defaultState = {
  categories: {},
  rootIdentifiers: [],
  hasFetched: false,
  categoryContexts: {}
}

export default function reducer (state:State=defaultState, action:Action):State {
  switch(action.type){
    case at.SET_CATEGORIES: {
      return {
        ...state,
        hasFetched: true,
        categories: action.payload.categories,
        rootIdentifiers: action.payload.rootCategoryPaths
      }
    }
    case at.FETCH_CONTEXT_REQUEST:
    case at.FETCH_CONTEXT_SUCCESS:
    case at.FETCH_CONTEXT_FAILURE: {
      const {identifier} = action.meta
      return {
        ...state,
        categoryContexts: {
          ...state.categoryContexts,
          [identifier]: contextReducer(state.categoryContexts[identifier], action)
        }
      }
    }
    default: return state
  }
}

const defaultContextState = {
  isFetching: false,
  fetchError: null,
  data: null
}

function contextReducer (state:ContextState=defaultContextState, action:Action):ContextState {
  switch(action.type){
    case at.FETCH_CONTEXT_REQUEST: {
      return {
        ...state,
        isFetching: true,
        fetchError: null
      }
    }
    case at.FETCH_CONTEXT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    }
    case at.FETCH_CONTEXT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload
      }
    }
    default: return state
  }
}