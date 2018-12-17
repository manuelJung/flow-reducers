// @fow
import * as React from 'react'
import {Provider} from 'react-redux'
import Component from './Component'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <Component/>
        </div>
      </Provider>
    )
  }
}