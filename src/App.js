// @fow
import * as React from 'react'
import {Provider} from 'react-redux'
import Component from './Component'
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import {Switch, Route} from 'react-router'

const history = createBrowserHistory()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Switch>
              <Route path='/' component={Component} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}