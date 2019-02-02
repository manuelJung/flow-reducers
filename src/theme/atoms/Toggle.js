// @flow
import React from 'react'
import type {Node} from 'react'

export type RenderProps = {
  open: boolean,
  openDropdown: () => void,
  closeDropdown: () => void,
  toggleDropdown: () => void
}

export type Props = {|
  label: ((props:RenderProps) => Node) | string,
  children: ((props:RenderProps) => Node) | Node,
  onOpen?: () => void,
  onClose?: () => void
|}

export type State = {
  open: boolean
}

/**
 * A Toggle is super usefull when you want to hide context data until your 
 * primary element was clicked (Dropdown, Tooltip...). As soon as the user
 * clicks somewhere else on the screen that is not the context-content the
 * context-content will be removed again
 */
export default class Toggle extends React.Component<Props,State> {
  
  uniqueId = 'toggle-' + Math.random().toString(36).substr(2, 9)

  state = { open: false }

  openDropdown = () => {
    if(this.state.open) return
    if(this.props.onOpen) this.props.onOpen()
    this.setState({ open: true })
  }
  closeDropdown = () => {
    if(!this.state.open) return
    if(this.props.onClose) this.props.onClose()
    this.setState({ open: false })
  }
  toggleDropdown = () => this.state.open ? this.closeDropdown() : this.openDropdown()

  elIsInDropdown = ({parentElement: el}:*) => {
    return el ? el.id === this.uniqueId || this.elIsInDropdown(el) : false
  }

  listener = (e:*) => {
    if(!this.state.open) return 
    if(!this.elIsInDropdown(e.target)) this.closeDropdown()
  }
  
  componentWillMount(){
    window.addEventListener('click', this.listener)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.listener)
  }

  getRenderProps = ():RenderProps => ({
    open           : this.state.open,
    openDropdown   : this.openDropdown,
    closeDropdown  : this.closeDropdown,
    toggleDropdown : this.toggleDropdown
  })

  render(){
    let {label, children} = this.props
    let {open} = this.state

    const renderProps = this.getRenderProps()

    return (
      <div className='Toggle' id={this.uniqueId} style={{position: 'relative'}} onClick={this.openDropdown}>
        {/* Label */}
        {typeof label === 'function'
          ? label(renderProps)
          : <div className='label' onClick={this.closeDropdown}>{label}</div>}
        {/* Content */}
        {open && (typeof children === 'function'
          ? children(renderProps)
          : <div className='content' style={{position: 'absolute'}}>{children}</div>)}
      </div>
    )
  }
}
