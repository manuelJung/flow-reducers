// @flow
import React from 'react'
import {dispatchEvent} from 'redux-interrupt'

import DropdownFilter from './DropdownFilter'

type Props = {
  identifier: string
}

export default React.memo<Props>(function SearchFilters ({identifier}:Props) {
  const handleOpen = () => dispatchEvent({type: 'OPEN_FILTER', payload: 'color'})
  return (
    <div className='SearchFilters'>
      <DropdownFilter label='Farbe' filterKey='color' identifier={identifier}/>
      <DropdownFilter label='Brand' filterKey='brand' identifier={identifier}/>
    </div>
  )
})