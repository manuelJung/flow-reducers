// @flow
import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

import pageReducer from 'modules/pages/reducer'
import type {State as PageState} from 'modules/pages/reducer'

import staticBlockReducer from 'modules/staticBlocks/reducer'
import type {State as StaticBlockState} from 'modules/staticBlocks/reducer'

import searchReducer from 'modules/search/reducer'
import type {State as SearchState} from 'modules/search/reducer'

import type {State as NavigationState} from 'modules/navigation/reducer'
import navigationReducer from 'modules/navigation/reducer'

import type {State as MagazinState} from 'modules/magazin/reducer'
import magazinReducer from 'modules/magazin/reducer'

import 'modules/navigation/rules'
import 'modules/search/rules'
import 'modules/pages/rules'
import 'modules/staticBlocks/rules'

export type AsyncReducers = {}
export type RootState = AsyncReducers & {
  pages: PageState,
  staticBlocks: StaticBlockState,
  routing: any,
  search: SearchState,
  navigation: NavigationState,
  magazin: MagazinState
}

const makeRootReducer = (asyncReducers?:AsyncReducers):RootState => {
  return combineReducers(({
    routing: routerReducer,
    pages: pageReducer,
    staticBlocks: staticBlockReducer,
    search: searchReducer,
    navigation: navigationReducer,
    magazin: magazinReducer,
    ...asyncReducers
  }))
}

export default makeRootReducer
