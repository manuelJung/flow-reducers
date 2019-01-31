// @flow
import React from 'react'
import ProductSearch from 'theme/organisms/ProductSearch'
import CategoryContext from 'theme/organisms/CategoryContext'

import Helmet from 'react-helmet'

type Props = {}

export default React.memo<Props>(function SearchRoute (props:Props) {
  console.log(props)
  return (
    <div className='SearchRoute'>
      <Helmet title='Category-Route'/>
      {/* <CategoryContext identifier='Sale_Category_Text1' /> */}
      {/* <ProductSearch identifier='sale-route'/> */}
      {/* <StaticBlock identifier='Sale_Category_SEO_Text' /> */}
    </div>
  )
})