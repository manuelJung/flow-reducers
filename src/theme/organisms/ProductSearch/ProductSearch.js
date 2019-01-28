// @flow
import React from 'react'
import SearchInitializer from 'modules/search/hocs/Search'

type Props = {
  searchKey: string
}

export default function ProductSearch ({searchKey}:Props) {
  return (
    <div className='ProductSearch'>
      <SearchInitializer searchKey={searchKey} render={props => (
        <React.Fragment>
          <div className='ResetButton'/>
          <div className='CategoryTree'/>
          <div className='SearchFilters'/>
          <div className='SearchHits'/>
          <div className='Pagination'/>
        </React.Fragment>
      )} />
    </div>
  )
}