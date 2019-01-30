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
  return (
    <div className='DropdownFilter'>
    <Dropdown 
      onOpen={() => dispatchEvent({type: 'DropdownFilter/OPEN_DROPDOWN', meta: {filterKey} })}
      onClose={() => dispatchEvent({type: 'DropdownFilter/CLOSE_DROPDOWN', meta: {filterKey} })}
      label={label}
      children={() => (
        <ListFilter pure identifier={identifier} filterKey={filterKey} children={props => (
          <div className='content'>
            {props.data.options.map(opt => (
              <div key={opt} className='option' onClick={() => props.toggleOption(opt)}>
                {opt}
              </div>
            ))}
          </div>
        )}/>
      )}
    />
    </div>
  )
})