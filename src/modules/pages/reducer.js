// @flow
import * as at from './const'

import type {UrlKey, Page} from './entities'
import type {Action} from './actions'

export type State = {
  +[id:UrlKey]: PageState
}

type PageState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +data: Page | null
}

export default function reducer(state:State={}, action:Action):State{
  switch(action.type){
    case at.FETCH_REQUEST:
    case at.FETCH_SUCCESS:
    case at.FETCH_FAILURE: 
      return Object.assign({}, state, {
        [action.meta.urlKey]: pageReducer(state[action.meta.urlKey], action)
      })
    default: return state
  }
}

function pageReducer(state, action:Action):PageState{
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