// @flow
import * as at from './const'

import type {TodoId, Todo, VisibilityFilter} from './entities'
import type {Action} from './actions'

export type State = {
  +byId: {+[id:TodoId]: Todo},
  +allIds: TodoId[],
  +visibilityFilter: VisibilityFilter
}

const initialState:State = {
  byId: {},
  allIds: [],
  visibilityFilter: 'ALL'
}

export default function reducer(state:State=initialState, action:Action){
  switch(action.type){
    case at.ADD_TODO: {
      return Object.assign({}, state, {
        byId: {...state.byId, [action.payload.id]: action.payload},
        allIds: [...state.allIds, action.payload.id]
      })
    }

    case at.REMOVE_TODO: {
      const todoId = action.meta.id
      return Object.assign({}, state, {
        allIds: [...state.allIds.filter(id => id !== todoId)],
        byId: {...state.byId, [action.meta.id]: undefined}
      })
    }

    case at.TOGGLE_TODO: {
      const todo = state.byId[action.meta.id]
      return Object.assign({}, state, {
        byId: {
          ...state.byId, 
          [todo.id]: {...todo, done: !todo.done}
        }
      })
    }
    default: return state
  }
}