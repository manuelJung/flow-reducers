// @flow
import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import type {Dispatch as ReduxDispatch} from 'redux'

import pageReducer from 'modules/pages/reducer'
import staticBlockReducer from 'modules/staticBlocks/reducer'
import productReducer from 'modules/products/reducer'
import categoriesReducer from 'modules/categories/reducer'
import magazineReducer from 'modules/magazine/reducer'

import type {Action as PageAction} from 'modules/pages/actions'
import type {Action as StaticBlockAction} from 'modules/staticBlocks/actions'
import type {Action as ProductAction} from 'modules/products/actions'
import type {Action as CategoriesAction} from 'modules/categories/actions'
import type {Action as MagazineAction} from 'modules/magazine/actions'

import 'modules/categories/rules'
import 'modules/products/rules'
import 'modules/pages/rules'
import 'modules/magazine/rules'
import 'modules/staticBlocks/rules'
import './rules'

type Action = PageAction
| StaticBlockAction
| ProductAction
| CategoriesAction
| MagazineAction

const reducers = {
  routing: routerReducer,
  pages: pageReducer,
  staticBlocks: staticBlockReducer,
  products: productReducer,
  categories: categoriesReducer,
  magazine: magazineReducer,
}

export type Reducers = typeof reducers
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
export type RootState = $ObjMap<Reducers, $ExtractFunctionReturn>
export type Dispatch = ReduxDispatch<Action>

export default () => combineReducers<Reducers,{type:string}>(reducers)
