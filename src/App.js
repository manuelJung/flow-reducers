// @fow
import * as React from 'react'
import {Provider} from 'react-redux'

import {createProduct} from 'modules/products/actions'

export default class App extends React.Component {
  componentDidMount(){
    this.props.store.dispatch(createProduct('10082660', 'displayProduct'))
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
          APP
        </div>
      </Provider>
    )
  }
}