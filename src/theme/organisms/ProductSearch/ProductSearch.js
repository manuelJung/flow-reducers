// @flow
import React from 'react'
import SearchInitializer from 'modules/products/hocs/ListInitializer'

import SearchFilters from './SearchFilters'

import type {FilterValues} from 'modules/products/entities'

type Props = {
  identifier: string,
  filters?: $Shape<FilterValues>
}

export default React.memo<Props>(function ProductSearch ({identifier, filters}:Props) {
  return (
    <div className='ProductSearch'>
      <SearchInitializer pure identifier={identifier} filters={filters} />
      <div className='ResetButton'/>
      <div className='CategoryTree'/>
      <SearchFilters identifier={identifier}/>
      <div className='SearchHits'/>
      <div className='Pagination'/>
    </div>
  )
})
