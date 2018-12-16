// @fow
import * as React from 'react'
import {Provider} from 'react-redux'

import {createProduct} from 'modules/products/actions'
import {Filter} from 'modules/products/hocs/withFilter'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
        </div>
      </Provider>
    )
  }
}
