// @flow
import React from 'react'
import type {Node} from 'react'
import {Wrapper, Content, Label} from './style'

import Toggle from 'theme/atoms/Toggle'

type Props = {
  label: string,
  children: Node,
  onOpen?: () => void,
  onClose?: () => void,
  onSearch?: (value:string) => void
}

type State = {
  search: string
}

export default class Dropdown extends React.Component<Props,State> {
  state = {search: ''}

  handleSearchChange = (e:*) => {
    this.setState({search: e.target.value})
    if(this.props.onSearch) this.props.onSearch(e.target.value)
  }

  renderLabel = ({open, closeDropdown}:*) => (
    <Label onClick={closeDropdown} open={open}>
      {this.props.label}
    </Label>
  )

  render(){
    const {search} = this.state
    const {children, onOpen, onClose} = this.props
    const searchEnabled = Boolean(this.props.onSearch)
    return (
      <Wrapper className='Dropdown'>
        <Toggle label={this.renderLabel} onOpen={onOpen} onClose={onClose}>
          <Content open={open}>
            {searchEnabled && <div className='search'>
              <input type='text' placeholder='Suche...' value={search} onChange={this.handleSearchChange}/>
            </div>}
            {children}
          </Content>
        </Toggle>
      </Wrapper>
    )
  }
}
