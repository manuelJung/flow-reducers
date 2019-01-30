// @flow
import React from 'react'
import type {Node} from 'react'
import Dropdown from 'theme/molecules/Dropdown'
import ListFilter from 'modules/products/hocs/ListFilter'
import {dispatchEvent} from 'redux-interrupt'

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
    <div className='DropdownFilter'>
    <Dropdown onOpen={handleOpen} onClose={handleClose} label={label} >{() =>
      <ListFilter pure identifier={identifier} filterKey={filterKey}>{props =>
        <div className='content'>
          {props.data.options.map(opt => (
            <div key={opt} className='option' onClick={() => props.toggleOption(opt)}>
              {opt}
            </div>
          ))}
        </div>
      }</ListFilter>
    }</Dropdown>
    </div>
  )
})