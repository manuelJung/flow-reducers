// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import createStore from 'store/createStore'

const root = document.getElementById('root')

root && ReactDOM.render(<App store={createStore()}/>, root)

