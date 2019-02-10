// @flow
import React from 'react'
import MediaSize, {MediaSizeSwitch} from 'theme/atoms/MediaSize'

import DropdownFilter from './DropdownFilter'

type Props = {
  identifier: string
}

export default React.memo<Props>(function SearchFilters ({identifier}:Props) {
  return (
    <div className='SearchFilters'>
      <MediaSizeSwitch>
        {/* LAPTOP FILTERS */}
        <MediaSize minSize='LAPTOP_L'>
          <DropdownFilter label='Farbe' filterKey='color' identifier={identifier}/>
          <DropdownFilter label='Brand' filterKey='brand' identifier={identifier}/>
        </MediaSize>

        {/* MOBILE FILTERS */}
        <MediaSize>mobile</MediaSize>
      </MediaSizeSwitch>
    </div>
  )
})