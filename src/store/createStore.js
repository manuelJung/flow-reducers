// @flow
import {applyMiddleware, compose, createStore} from 'redux'
import makeRootReducer from './rootReducer'
import ruleMiddleware from 'redux-interrupt'
import history from './history'
import {responsiveStoreEnhancer} from 'redux-responsive'
import { routerMiddleware } from 'react-router-redux'

import type {RootState, Action, Dispatch} from './rootReducer'

export default (initialState:any = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  let middleware = [ruleMiddleware, routerMiddleware(history)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [responsiveStoreEnhancer]

  let composeEnhancers = compose

  let __DEV__ = process.env.NODE_ENV === 'development'
  // __DEV__ = true

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }


  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore<RootState, Action, Dispatch>(
    makeRootReducer(),
    initialState,
    // $FlowFixMe
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  const _module:any = module
  if (_module.hot) {
    _module.hot.accept('./rootReducer', () => {
      const rootReducer = require('./rootReducer').default
      store.replaceReducer(rootReducer())
    })
  }

  return store
}
