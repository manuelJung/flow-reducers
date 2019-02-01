// @flow
import React from 'react'
import type {Node} from 'react'
import Portal from 'atoms/Portal'
import styled from 'styled-components'

type RenderProps = {
  open: boolean,
  openModal: () => void,
  closeModal: () => void,
  toggleModal: () => void
}

type Props = {|
  label: string | (props:RenderProps) => Node,
  children: Node | (props:RenderProps) => Node,
  onOpen?: () => void,
  onClose?: () => void,
  background?: string,
|}

type State = {
  open: boolean
}

/**
 * A Modal is super usefull when you want to hide context data until your 
 * primary element was clicked. As soon as the user
 * clicks on the overlay, the context-content will be removed again
 */
export default class Modal extends React.Component<Props,State> {
  state = { open: false }

  static defaultProps = {
    background: 'black'
  }

  openModal = () => {
    if(this.state.open) return
    if(this.props.onOpen) this.props.onOpen()
    this.setState({ open:true })
  }
  closeModal = () => {
    if(!this.state.open) return
    if(this.props.onClose) this.props.onClose()
    this.setState({ open: false })
  }
  toggleModal = () => this.state.open ? this.closeModal() : this.openModal()

  getRenderProps = ():RenderProps => ({
    open           : this.state.open,
    openDropdown   : this.openDropdown,
    closeDropdown  : this.closeDropdown,
    toggleDropdown : this.toggleDropdown
  })

  render(){
    const {open} = this.state
    const {label, children} = this.props
    const renderProps = this.getRenderProps()

    return (
      <React.Fragment>
        {typeof label === 'string'
          ? <div className='label' onClick={this.openModal}>{label}</div>
          : label(renderProps)}
        {open && <Portal id='modal-root'>
          <div className='overlay' onClick={this.closeModal} style={{
            position: 'fixed',
            zIndex: 99999999998,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: this.props.background
          }}/>
          <div className='modal-content' 
            children={typeof children === 'function' ? children(renderProps) : children} 
            style={{
            position: 'fixed',
            zIndex: 99999999999,
            margin: '0 auto',
            background: 'white'
          }}/>
        </Portal>}
      </React.Fragment>
    )
  }
}