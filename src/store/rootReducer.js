// @flow
import {combineReducers} from 'redux'
import {addRule} from 'redux-interrupt'

import todoReducer from 'modules/todos/reducer'
import type {State as TodoState} from 'modules/todos/reducer'

import pageReducer from 'modules/pages/reducer'
import type {State as PageState} from 'modules/pages/reducer'

import {fetchBlockRule} from 'modules/staticBlocks/rules'
import {fetchPageRule} from 'modules/pages/rules'
import staticBlockReducer from 'modules/staticBlocks/reducer'
import type {State as StaticBlockState} from 'modules/staticBlocks/reducer'
import { routerReducer } from 'react-router-redux'

import searchReducer from 'modules/search/reducer'
import type {State as SearchState} from 'modules/search/reducer'
import {triggerSearchRule, searchRule} from 'modules/search/rules'

import type {State as NavigationState} from 'modules/navigation/reducer'
import navigationReducer from 'modules/navigation/reducer'

import 'modules/navigation/rules'

export type AsyncReducers = {}
export type RootState = AsyncReducers & {
  todos: TodoState,
  pages: PageState,
  staticBlocks: StaticBlockState,
  routing: any,
  search: SearchState,
  navigation: NavigationState
}

const makeRootReducer = (asyncReducers?:AsyncReducers):RootState => {
  return combineReducers(({
    routing: routerReducer,
    todos: todoReducer,
    pages: pageReducer,
    staticBlocks: staticBlockReducer,
    search: searchReducer,
    navigation: navigationReducer,
    ...asyncReducers
  }))
}

export default makeRootReducer


addRule(fetchBlockRule)
addRule(fetchPageRule)
addRule(triggerSearchRule)
addRule(searchRule)