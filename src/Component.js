// @flow
import * as React from 'react'
import CategoryContext from 'theme/organisms/CategoryContext'
import ProductSearch from 'theme/organisms/ProductSearch'
import PageArticle from 'theme/organisms/PageArticle'
import StaticBlock from 'theme/organisms/StaticBlock'


export default function Component(){
  
  return (
    <div id='Component'>
      <CategoryContext position='top' categoryPath='/shop/bekleidung/kleider/abendkleider' />
      <ProductSearch identifier='default' />
      <PageArticle urlKey='looks' />
      <StaticBlock identifier='Sale_Category_Text1' />
      <CategoryContext position='bottom' categoryPath='/shop/bekleidung/kleider/abendkleider' />
    </div>
  )
}