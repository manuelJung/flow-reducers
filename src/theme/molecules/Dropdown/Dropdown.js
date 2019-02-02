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

  render(){
    const {search} = this.state
    const {label, children, onOpen, onClose} = this.props
    const searchEnabled = Boolean(this.props.onSearch)
    return (
      <Wrapper className='Dropdown'>
        <Toggle
          label={({open}) => <Label open={open}>{label}</Label>}
          children={({open}) => (
            <Content open={open}>
              {searchEnabled && <div className='search'>
                <input type='text' placeholder='Suche...' value={search} onChange={this.handleSearchChange}/>
              </div>}
              {children}
            </Content>
          )}
          onOpen={onOpen}
          onClose={onClose}
        />
      </Wrapper>
    )
  }
}
