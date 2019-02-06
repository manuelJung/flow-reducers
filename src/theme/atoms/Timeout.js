// @flow
import React from 'react'
import type {Node} from 'react'
import memoEqual from 'utils/memoEqual'

type Props = {|
  timeout: number,
  children: Node,
  onFinnish?: () => void
|}

type State = {
  visible: boolean
}

/**
 * Delays the mounting of a Component. Very usefull for async requests where you 
 * only want to show a spinner for bad networks
 */
export default class Timeout extends React.Component<Props,State> {
  shouldComponentUpdate = memoEqual('Timeout', ['timeout', 'children'],['onFinnish'], this)

  timeout = null

  state = {visible: false}
  
  componentDidMount(){
    this.timeout = setTimeout(() => {
      if(!this.state) return
      this.setState({visible:true})
      if(this.props.onFinnish) this.props.onFinnish()
    }, this.props.timeout)
  }

  render(){
    return this.state.visible ? this.props.children : null
  }
}