// @flow
import * as at from './const'

import type {Identifier, StaticBlock} from './entities'
import type {Action} from './actions'

export type State = {
  +[id:Identifier]: StaticBlockState
}

type StaticBlockState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +block: StaticBlock | null
}

export default function reducer(state:State={}, action:Action):State{
  switch(action.type){
    case at.FETCH_REQUEST:
    case at.FETCH_SUCCESS:
    case at.FETCH_FAILURE: 
      return Object.assign({}, state, {
        [action.meta.identifier]: staticBlockReducer(state[action.meta.identifier], action)
      })
    default: return state
  }
}

function staticBlockReducer(state, action:Action):StaticBlockState{
  switch(action.type){
    case at.FETCH_REQUEST: {
      return {
        isFetching: true,
        fetchError: null,
        block: null
      }
    }

    case at.FETCH_SUCCESS: {
      return {
        isFetching: false,
        fetchError: null,
        block: action.payload
      }
    }

    case at.FETCH_FAILURE: {
      return {
        isFetching: false,
        fetchError: action.payload,
        block: null
      }
    }
    default: return state
  }
}