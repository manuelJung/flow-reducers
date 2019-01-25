// @flow
import React from 'react'
import {Search} from 'modules/search/hocs/withSearch'

type Props = {
  searchKey: string
}

export default function ProductSearch ({searchKey}:Props) {
  return (
    <div className='ProductSearch'>
      <Search searchKey={searchKey} render={props => (
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