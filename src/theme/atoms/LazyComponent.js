// @flow
import React from 'react'
import Observer from '@researchgate/react-intersection-observer'

import type {Node} from 'react'

type Props = {
  children: Node | (visible:boolean) => Node
}

type State = {
  visible: boolean
}

export default class LazyComponent extends React.Component<Props,State> {

  state = { visible: false }

  handleChange = e => {
    if(e.isIntersecting){
      this.setState({visible: true})
    }
  }

  render(){
    const {visible} = this.state
    const {children} = this.state
    
    return (
      <Observer disabled={visible} onChange={this.handleChange}>
        {typeof children === 'function' ? children(visible) : children}
      </Observer>
    )
  }
}