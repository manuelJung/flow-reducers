// @flow
import React from 'react'
import Dropdown from 'theme/molecules/Dropdown'
import ListFilter from 'modules/products/hocs/ProductListFilter'
import {dispatchEvent} from 'redux-interrupt'
import {Wrapper, Options, Option} from './style'

import type {FilterKey} from 'modules/products/entities'

type Props = {
  identifier: string,
  label: string,
  filterKey: FilterKey
}

export default React.memo<Props>(function ({label, filterKey, identifier}:Props){
  const handleOpen = () => dispatchEvent({type: 'DropdownFilter/OPEN_DROPDOWN', meta: {filterKey, identifier} })
  const handleClose = () => dispatchEvent({type: 'DropdownFilter/CLOSE_DROPDOWN', meta: {filterKey, identifier} })
  const handleSearch = value => dispatchEvent({type: 'DropdownFilter/SEARCH', meta: {filterKey, identifier}, payload: value })
  return (
    <Wrapper className='DropdownFilter'>
    <Dropdown onOpen={handleOpen} onClose={handleClose} label={label}>
      <ListFilter pure identifier={identifier} filterKey={filterKey}>{props =>
        <Options className='content'>
          {props.data.options.map(opt => (
            <Option 
              key={opt} 
              onClick={() => props.toggleOption(opt)} 
              selected={props.data.value.includes(opt)}
              children={opt}
            />
          ))}
          <Option>...</Option>
        </Options>
      }</ListFilter>
    </Dropdown> 
    </Wrapper>
  )
})