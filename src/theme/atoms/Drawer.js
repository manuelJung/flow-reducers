// @flow
import React from 'react'
import type {Node} from 'react'
import Portal from 'theme/atoms/Portal'
import memoEqual from 'utils/memoEqual'

type RenderProps = {
  open: boolean,
  openDrawer: () => void,
  closeDrawer: () => void,
  toggleDrawer: () => void
}

type Props = {|
  label: string | (props:RenderProps) => Node,
  children: Node | (props:RenderProps) => Node,
  onOpen?: () => void,
  onClose?: () => void,
  background?: string,
  width?: number
|}

type State = {
  open: boolean
}

/**
 * A Drawer is super usefull when you want to hide context data until your 
 * primary element was clicked. As soon as the user
 * clicks on the overlay, the context-content will be removed again
 */
export default class Drawer extends React.Component<Props,State> {
  shouldComponentUpdate = memoEqual('Drawer', ['label', 'background', 'width', 'children'], ['onOpen', 'onClose'])
  
  state = { open: false }

  openDrawer = () => {
    if(this.state.open) return
    if(this.props.onOpen) this.props.onOpen()
    this.setState({ open:true })
  }
  closeDrawer = () => {
    if(!this.state.open) return
    if(this.props.onClose) this.props.onClose()
    this.setState({ open: false })
  }
  toggleDrawer = () => this.state.open ? this.closeDrawer() : this.openDrawer()

  getRenderProps = ():RenderProps => ({
    open           : this.state.open,
    openDrawer   : this.openDrawer,
    closeDrawer  : this.closeDrawer,
    toggleDrawer : this.toggleDrawer
  })

  render(){
    const {open} = this.state
    const {label, children} = this.props
    const renderProps = this.getRenderProps()

    return (
      <React.Fragment>
        {typeof label === 'string'
          ? <div className='label' onClick={this.openDrawer}>{label}</div>
          : label(renderProps)}
        {open && <Portal id='drawer-root'>
          <div className='overlay' onClick={this.closeDrawer} style={{
            position: 'fixed',
            zIndex: 99999999998,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: this.props.background || 'rgba(0,0,0,.6)'
          }}/>
          <div className='drawer-content' 
            children={typeof children === 'function' ? children(renderProps) : children} 
            style={{
            position: 'fixed',
            zIndex: 99999999999,
            left: 0,
            top: 0,
            bottom: 0,
            background: 'white',
            width: this.props.width || 400
          }}/>
        </Portal>}
      </React.Fragment>
    )
  }
}