// @flow
import React from 'react'
import ProductSearch from 'theme/organisms/ProductSearch'

type Props = {}

export default React.memo<Props>(function SearchRoute () {
  return (
    <div className='SearchRoute'>
      <ProductSearch identifier='sale-route' filters={{ tags: ['sale'] }}/>
    </div>
  )
})