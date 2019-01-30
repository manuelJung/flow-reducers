// @flow
import React from 'react'
import ListFilter from 'modules/products/hocs/ListFilter'
import {dispatchEvent} from 'redux-interrupt'

import Dropdown from 'theme/molecules/Dropdown'

type Props = {
  identifier: string
}

export default React.memo<Props>(function SearchFilters ({identifier}:Props) {
  const handleOpen = () => dispatchEvent({type: 'OPEN_FILTER', payload: 'color'})
  return (
    <div className='SearchFilters'>
      <ListFilter pure identifier={identifier} filterKey='color' render={props => (
        <Dropdown label={props.filterKey} globalId='color' onOpen={handleOpen} render={({open}) => (
          <div className='filter filter-color'>
            {props.data.options.map(opt => <div>{opt}</div>)}
          </div>
        )} />
      )} />
    </div>
  )
})