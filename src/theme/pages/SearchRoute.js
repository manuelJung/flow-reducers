// @flow
import React from 'react'
import ProductSearch from 'theme/organisms/ProductSearch'
import StaticBlock from 'theme/organisms/StaticBlock'

import Helmet from 'react-helmet'

type Props = {}

export default React.memo<Props>(function SearchRoute () {
  return (
    <div className='SearchRoute'>
      <Helmet title='Search-Route'/>
      <StaticBlock identifier='Sale_Category_Text1' />
      <ProductSearch identifier='sale-route' filters={{ tags: ['sale'] }}/>
      <StaticBlock identifier='Sale_Category_SEO_Text' />
    </div>
  )
})