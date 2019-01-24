// @flow
import * as at from './const'
import type {CategoryId, Category, Context} from './entities'
import type {Action} from './actions'

export type State = {
  +categories: {+[id:CategoryId]:Category},
  +rootCategoryIds: CategoryId[],
  +hasFetched: boolean,
  +categoryContexts: {+[id:CategoryId]:ContextState}
}

type ContextState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +context: Context | null
}

export const defaultState = {
  categories: {},
  rootCategoryIds: [],
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
        rootCategoryIds: action.payload.rootCategoryIds
      }
    }
    case at.FETCH_CONTEXT_REQUEST:
    case at.FETCH_CONTEXT_SUCCESS:
    case at.FETCH_CONTEXT_FAILURE: {
      const {categoryId} = action.meta
      return {
        ...state,
        categoryContexts: {
          ...state.categoryContexts,
          [categoryId]: contextReducer(state.categoryContexts[categoryId], action)
        }
      }
    }
    default: return state
  }
}

const defaultContextState = {
  isFetching: false,
  fetchError: null,
  context: null
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
        context: action.payload
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