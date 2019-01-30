// @flow
import React from 'react'
import ListFilter from 'modules/products/hocs/ListFilter'
import {dispatchEvent} from 'redux-interrupt'

import DropdownFilter from './DropdownFilter'

type Props = {
  identifier: string
}

export default React.memo<Props>(function SearchFilters ({identifier}:Props) {
  const handleOpen = () => dispatchEvent({type: 'OPEN_FILTER', payload: 'color'})
  return (
    <div className='SearchFilters'>
      <ListFilter pure identifier={identifier} filterKey='color' render={props => (
        <DropdownFilter label='Farbe' filterKey='color'>
          {props.data.options.map(opt => (
            <div key={opt} className='option' onClick={() => props.toggleOption(opt)}>
              {opt}
            </div>
          ))}
        </DropdownFilter>
      )} />
      <ListFilter pure identifier={identifier} filterKey='brand' render={props => (
        <DropdownFilter label='Brand' filterKey='color'>
          {props.data.options.map(opt => (
            <div key={opt} className='option' onClick={() => props.toggleOption(opt)}>
              {opt}
            </div>
          ))}
        </DropdownFilter>
      )} />
    </div>
  )
})