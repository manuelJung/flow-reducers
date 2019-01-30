// @flow
import React from 'react'
import type {Node} from 'react'
import {Wrapper, Content} from './style'

export type RenderProps = {
  open: boolean,
  openDropdown: () => void,
  closeDropdown: () => void
}

export type Props = {
  label: ((props:RenderProps) => Node) | string,
  children: (props:RenderProps) => Node,
  onOpen?: () => void,
  onClose?: () => void,
}

export type State = {
  open: boolean
}

export default class Dropdown extends React.Component<Props,State> {
  
  uniqueId = 'dropdown-' + Math.random().toString(36).substr(2, 9)

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
    open          : this.state.open,
    openDropdown  : this.openDropdown,
    closeDropdown : this.closeDropdown
  })

  render(){
    let {label, children} = this.props
    let {open} = this.state

    const renderProps = this.getRenderProps()

    return (
      <Wrapper className='Dropdown' id={this.uniqueId} onClick={this.openDropdown}>
        {typeof label === 'function' ? label(renderProps) : <div className='label'>{label}</div>}
        {open && <Content open={open}>
        {children(renderProps)}
        </Content>}
      </Wrapper>
    )
  }
}
