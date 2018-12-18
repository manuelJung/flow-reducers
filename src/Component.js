// @flow
import * as React from 'react'
import {StaticBlock} from 'modules/staticBlocks/hocs/withStaticBlock'
import {Page} from 'modules/pages/hocs/withPage'
import {addRule} from 'redux-interrupt'
import {fetchRequest} from 'modules/staticBlocks/actions'
import * as at from 'modules/staticBlocks/const'

addRule({
  id: 'feature/HANDLE_ERROR',
  target: at.FETCH_FAILURE,
  position: 'INSERT_BEFORE',
  consequence: () => ({type: 'ERROR_TYPE'})
})

addRule({
  id: 'feature/DELAY_ERROR',
  target: at.FETCH_FAILURE,
  position: 'INSERT_INSTEAD',
  consequence: (store,action) => {
    action = {
      ...action,
      meta: {
        ...action.meta,
        skipRule: 'feature/DELAY_ERROR'
      }
    }
    setTimeout(() => store.dispatch(action), 500)
  }
})

export default function Component(){
  
  return (
    <div id='Component'>
      <StaticBlock identifier='sale-top' render={renderStaticBlock}/>
      <StaticBlock identifier='sale-bottom' render={renderStaticBlock}/>
      <Page slug='page1' render={renderPage}/>
      <StaticBlock identifier='sale-middle' render={renderStaticBlock}/>
    </div>
  )
}

function renderStaticBlock ({isFetching, block}) {
  if(isFetching){
    return <div>fetching...</div>
  }
  if(!block) return null
  return <div>{block.content}</div>
}

function renderPage ({isFetching, page}) {
  if(isFetching){
    return <div>fetching...</div>
  }
  if(!page) return null
  return <div>{page.content}</div>
}