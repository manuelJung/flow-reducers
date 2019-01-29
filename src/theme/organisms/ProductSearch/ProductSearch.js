// @flow
import React from 'react'
import SearchInitializer from 'modules/products/hocs/ListInitializer'

type Props = {
  identifier: string
}

export default function ProductSearch ({identifier}:Props) {
  return (
    <div className='ProductSearch'>
      <SearchInitializer identifier={identifier} />
      <div className='ResetButton'/>
      <div className='CategoryTree'/>
      <div className='SearchFilters'/>
      <div className='SearchHits'/>
      <div className='Pagination'/>
    </div>
  )
}