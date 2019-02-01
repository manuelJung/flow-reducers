// @flow
import React from 'react'
import type {Node} from 'react'
import Observer from '@researchgate/react-intersection-observer'
// import {IS_CRAWLER} from 'prerender/const'

const IS_CRAWLER = false

type Props = {|
  children: Node,
  offsetTop?: number, // num pixels Child should be visible before Component comes into Viewport (from top)
  offsetBottom?: number, // num pixels Child should be visible before Component comes into Viewport (from bottom)
  prerenderVisible?: boolean, // if true, Child is always visible to Prerenderer
  defaultHeight?: number, // height while Child is not visible
  onMount?: () => void
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
    offset: 0,
    prerenderVisible: false,
    defaultHeight: 0
  }

  state = { visible: IS_CRAWLER && this.props.prerenderVisible }

  handleChange = e => {
    if(e.isIntersecting){
      this.setState({visible: true})
      if(this.props.onMount) this.props.onMount()
    }
  }

  render(){
    const {visible} = this.state
    const {children, prerenderVisible, defaultHeight, offset} = this.props

    if(visible) return children

    const mTop = offset + defaultHeight
    const mBottom = offset
    
    return (
      <React.Fragment>
        <Observer 
          disabled={visible} 
          onChange={this.handleChange} 
          rootMargin={`${mTop}px 0px ${mBottom}px 0px`} 
          children={<span/>}
        />
        {visible && children}
        {visible || <div className='lazy-placeholder' style={{height: defaultHeight}} />}
      </React.Fragment>
    )
  }
}