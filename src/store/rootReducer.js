// @flow
import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

import pageReducer from 'modules/pages/reducer'
import staticBlockReducer from 'modules/staticBlocks/reducer'
import productReducer from 'modules/products/reducer'
import categoriesReducer from 'modules/categories/reducer'
import magazinReducer from 'modules/magazin/reducer'

import 'modules/categories/rules'
import 'modules/products/rules'
import 'modules/pages/rules'
import 'modules/magazin/rules'
import 'modules/staticBlocks/rules'
import './rules'

const reducers = {
  routing: routerReducer,
  pages: pageReducer,
  staticBlocks: staticBlockReducer,
  products: productReducer,
  categories: categoriesReducer,
  magazin: magazinReducer,
}

export type Reducers = typeof reducers
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
export type RootState = $ObjMap<Reducers, $ExtractFunctionReturn>

export default () => combineReducers<Reducers,{type:string}>(reducers)
