// @flow
import React from 'react'
import type {Node} from 'react'
import Dropdown from 'theme/molecules/Dropdown'
import {dispatchEvent} from 'redux-interrupt'

type Props = {
  label: string,
  filterKey: string,
  children: Node
}

export default React.memo<Props>(function ({label, filterKey, children}:Props){
  return (
    <div className='DropdownFilter'>
    <Dropdown 
      // onOpen={() => dispatchEvent({type: 'DropdownFilter/OPEN_DROPDOWN', meta: {filterKey} })}
      // onClose={() => dispatchEvent({type: 'DropdownFilter/CLOSE_DROPDOWN', meta: {filterKey} })}
      label={label}
      render={() => (
        <div className='content'>
          {children}
        </div>
      )}
    />
    </div>
  )
})