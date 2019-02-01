// @flow
import React from 'react'
import Observer from '@researchgate/react-intersection-observer'
import {IS_CRAWLER} from 'prerender/const'

import type {Node} from 'react'

type Props = {|
  children: Node,
  offsetTop?: number, // num pixels Child should be visible before Component comes into Viewport (from top)
  offsetBottom?: number, // num pixels Child should be visible before Component comes into Viewport (from bottom)
  prerenderVisible?: boolean, // if true, Child is always visible to Prerenderer
  defaultHeight?: number // height while Child is not visible
|}

type State = {
  visible: boolean
}

/**
 * Only renders children when they hit the viewport. Super usefull when rendering costly Nodes
 * like big images or hardware-intensive Components. Can be turned off while prerendering
 */
export default class LazyComponent extends React.Component<Props,State> {

  static defaultProps = {
    offsetTop: 0,
    offsetBottom: 0,
    prerenderVisible: false,
    defaultHeight: 0
  }

  state = { visible: false }

  handleChange = e => {
    if(e.isIntersecting){
      this.setState({visible: true})
    }
  }

  render(){
    const {visible} = this.state
    const {children, prerenderVisible, defaultHeight} = this.props

    if(IS_CRAWLER && prerenderVisible){
      return children
    }
    
    return (
      <React.Fragment>
        <Observer disabled={visible} onChange={this.handleChange} />
        {visible && children}
        {visible || <div className='lazy-placeholder' style={{height: defaultHeight}} />}
      </React.Fragment>
    )
  }
}