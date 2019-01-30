// @flow
import * as React from 'react'
import {Provider} from 'react-redux'
import Component from './Component'
import { ConnectedRouter } from 'react-router-redux'
import {Switch, Route} from 'react-router'

import PageRoute from 'theme/pages/PageRoute'
import MagazinListRoute from 'theme/pages/MagazinListRoute'
import SearchRoute from 'theme/pages/SearchRoute'

import history from 'store/history'


export default class App extends React.Component<{store:any}> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Switch>
              <Route exact path='/' component={Component} />
              <Route path='/page' component={PageRoute} />
              <Route path='/magazin' component={MagazinListRoute} />
              <Route path='/search' component={SearchRoute} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}