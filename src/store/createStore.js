// @flow
import {applyMiddleware, compose, createStore} from 'redux'
import makeRootReducer from './rootReducer'
import ruleMiddleware from 'redux-interrupt'

export default (initialState:any = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  let middleware = [ruleMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  let __DEV__ = process.env.NODE_ENV === 'development'
  // __DEV__ = true

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  const _module:any = module
  if (_module.hot) {
    _module.hot.accept('./rootReducer', () => {
      const rootReducer = require('./rootReducer').default
      store.replaceReducer(rootReducer(store.asyncReducers))
    })
  }

  return store
}
