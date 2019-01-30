// @flow
import React from 'react'
import type {Node} from 'react'
import Dropdown from 'theme/molecules/Dropdown'
import ListFilter from 'modules/products/hocs/ListFilter'
import {dispatchEvent} from 'redux-interrupt'
import {Wrapper, Label, Content, Option} from './style'

import type {FilterKey} from 'modules/products/entities'

type Props = {
  identifier: string,
  label: string,
  filterKey: FilterKey
}

export default React.memo<Props>(function ({label, filterKey, identifier}:Props){
  const handleOpen = () => dispatchEvent({type: 'DropdownFilter/OPEN_DROPDOWN', meta: {filterKey} })
  const handleClose = () => dispatchEvent({type: 'DropdownFilter/CLOSE_DROPDOWN', meta: {filterKey} })
  return (
    <Wrapper className='DropdownFilter'>
    <Dropdown 
      onOpen={handleOpen} 
      onClose={handleClose} 
      label={({open, closeDropdown}) => (
        <Label open={open} onClick={open ? closeDropdown : undefined}>
          {label}
        </Label>
      )} 
      children={() => (
        <ListFilter pure identifier={identifier} filterKey={filterKey}>{props =>
          <Content className='content'>
            <div className='search'>
              <input type='text' placeholder='Suche...' value={''} onChange={() => null}/>
            </div>
            <ul className='option-list'>
              {props.data.options.map(opt => (
                <Option key={opt} onClick={() => props.toggleOption(opt)} selected={props.data.value.includes(opt)}>
                  {opt}  
                </Option>
              ))}
              <Option>...</Option>
            </ul>
          </Content>
        }</ListFilter>
      )}/>
    </Wrapper>
  )
})