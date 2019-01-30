// @flow
import React from 'react'
import {Wrapper, Content} from './style'

export type RenderProps = {
  open: boolean,
  openDropdown: () => void,
  closeDropdown: () => void
}

export type Props = {
  label: any | (props:RenderProps) => any ,
  render: (props:RenderProps) => any,
  globalId: string,
  onOpen?: () => void,
  onClose?: () => void,
}

export type State = {
  open: boolean
}

class Dropdown extends React.Component<Props,State> {
  
  uniqueId = 'dropdown-' + this.props.globalId

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

  elIsInDropdown = ({parentElement: el}:any) => {
    return el ? el.id === this.uniqueId || this.elIsInDropdown(el) : false
  }

  listener = e => {
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
    let {label, render} = this.props
    let {open} = this.state

    const renderProps = this.getRenderProps()

    return (
      <Wrapper className='Dropdown' id={this.uniqueId} onClick={this.openDropdown}>
        {typeof label === 'function' ? label(renderProps) : <div>label</div>}
        {open && <Content open={open}>
        {render(renderProps)}
        </Content>}
      </Wrapper>
    )
  }
}


export default Dropdown