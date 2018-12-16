// @flow
import {combineReducers} from 'redux'

import todoReducer from 'modules/todos/reducer'
import type {State as TodoState} from 'modules/todos/reducer'

export type AsyncReducers = {}
export type RootState = AsyncReducers & {
  todos: TodoState
}

const makeRootReducer = (asyncReducers?:AsyncReducers):RootState => {
  return combineReducers({
    todos: todoReducer,
    ...asyncReducers
  })
}

export default makeRootReducer
