// @flow
import {combineReducers} from 'redux'

export type AsyncReducers = {}
export type RootState = AsyncReducers & {}

const makeRootReducer = (asyncReducers?:AsyncReducers):RootState => {
  return combineReducers({
    ...asyncReducers
  })
}

export default makeRootReducer
