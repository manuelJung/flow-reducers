// @flow
import React from 'react'
import type {Node} from 'react'
import Portal from 'theme/atoms/Portal'
import memoEqual from 'utils/memoEqual'

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
  shouldComponentUpdate = memoEqual('Modal', ['label', 'children', 'background'], ['onOpen', 'onClose'], this)
  
  state = { open: false }

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
    openModal   : this.openModal,
    closeModal  : this.closeModal,
    toggleModal : this.toggleModal
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
            background: this.props.background || 'rgba(0,0,0,.6)'
          }}/>
          <div className='modal-content' 
            children={typeof children === 'function' ? children(renderProps) : children} 
            style={{
            position: 'fixed',
            zIndex: 99999999999,
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)'
          }}/>
        </Portal>}
      </React.Fragment>
    )
  }
}