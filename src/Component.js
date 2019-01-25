// @flow
import * as React from 'react'
import {StaticBlock} from 'modules/staticBlocks/hocs/withStaticBlock'
import {Page} from 'modules/pages/hocs/withPage'
import {addRule} from 'redux-interrupt'
import {fetchRequest} from 'modules/staticBlocks/actions'
import * as at from 'modules/staticBlocks/const'
import {Search} from 'modules/search/hocs/withSearch'
import CategoryContext from 'theme/organisms/CategoryContext'

const wait = ms => new Promise(resolve => setTimeout(() => resolve(),ms))


export default function Component(){
  
  return (
    <div id='Component'>
      <CategoryContext position='top' categoryId='/shop/bekleidung/kleider/abendkleider' />
    </div>
  )
}