// @flow
import * as React from 'react'
import {Page} from 'modules/pages/hocs/withPage'
import {addRule} from 'redux-interrupt'
import {fetchRequest} from 'modules/staticBlocks/actions'
import * as at from 'modules/staticBlocks/const'
import {Search} from 'modules/search/hocs/withSearch'
import CategoryContext from 'theme/organisms/CategoryContext'
import ProductSearch from 'theme/organisms/ProductSearch'
import PageArticle from 'theme/organisms/PageArticle'
import StaticBlock from 'theme/organisms/StaticBlock'

const wait = ms => new Promise(resolve => setTimeout(() => resolve(),ms))


export default function Component(){
  
  return (
    <div id='Component'>
      <CategoryContext position='top' categoryPath='/shop/bekleidung/kleider/abendkleider' />
      <ProductSearch searchKey='default' />
      <PageArticle urlKey='looks' />
      <StaticBlock identifier='Sale_Category_Text1' />
      <CategoryContext position='bottom' categoryPath='/shop/bekleidung/kleider/abendkleider' />
    </div>
  )
}