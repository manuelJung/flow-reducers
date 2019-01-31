// @flow
import * as React from 'react'
import {Provider} from 'react-redux'
import Component from './Component'
import { ConnectedRouter } from 'react-router-redux'
import {Switch, Route} from 'react-router'
import { Link } from 'react-router-dom'

import PageRoute from 'theme/pages/PageRoute'
import MagazinListRoute from 'theme/pages/MagazinListRoute'
import SearchRoute from 'theme/pages/SearchRoute'
import CategoryRoute from 'theme/pages/CategoryRoute'

import history from 'store/history'


export default class App extends React.Component<{store:any}> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <div className='navi'>
              <Link to='/page'>Page </Link>
              <Link to='/magazin'>Magazin </Link>
              <Link to='/search'>Search </Link>
              <Link to='/fashion/bekleidung'>fashion-1 </Link>
              <Link to='/fashion/bekleidung/kleider'>fashion-2 </Link>
              <Link to='/fashion/bekleidung/kleider/abendkleider'>fashion-3 </Link>
            </div>
            <div className='routes'>
              <Switch>
                <Route exact path='/' component={Component} />
                <Route exact path='/page' component={PageRoute} />
                <Route exact path='/magazin' component={MagazinListRoute} />
                <Route exact path='/search' component={SearchRoute} />
                <Route exact path='/fashion/:lv1' component={CategoryRoute} />
                <Route exact path='/fashion/:lv1/:lv2' component={CategoryRoute} />
                <Route exact path='/fashion/:lv1/:lv2/:lv3' component={CategoryRoute} />
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}