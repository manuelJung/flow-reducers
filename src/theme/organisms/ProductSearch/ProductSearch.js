// @flow
import React from 'react'
import SearchInitializer from 'modules/products/hocs/ProductListInitializer'

import SearchFilters from './SearchFilters'

import type {FilterValues} from 'modules/products/entities'

type Props = {
  identifier: string,
  filters?: $Shape<FilterValues>,
  updateKey?: string
}

export default React.memo<Props>(function ProductSearch ({identifier, filters, updateKey}:Props) {
  return (
    <div className='ProductSearch'>
      <SearchInitializer pure identifier={identifier} updateKey={updateKey} filters={filters} />
      <div className='ResetButton'/>
      <div className='CategoryTree'/>
      <SearchFilters identifier={identifier}/>
      <div className='SearchHits'/>
      <div className='Pagination'/>
    </div>
  )
})
