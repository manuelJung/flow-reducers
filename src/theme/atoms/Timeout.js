// @flow
import React from 'react'
import type {Node} from 'react'

type Props = {|
  timeout: number,
  children: Node
|}

type State = {
  visible: boolean
}

/**
 * Delays the mounting of a Component. Very usefull for async requests where you 
 * only want to show a spinner for bad networks
 */
export default class Timeout extends React.Component<Props,State> {

  timeout = null

  state = {visible: false}
  
  componentDidMount(){
    this.timeout = setTimeout(
      () => this.setState && this.setState({visible:true}), 
      this.props.timeout
    )
  }

  render(){
    return this.state.visible ? this.props.children : null
  }
}