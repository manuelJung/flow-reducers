// @flow
import * as React from 'react'
import {StaticBlock} from 'modules/staticBlocks/hocs/withStaticBlock'
import {addRule} from 'redux-interrupt'
import {fetchRequest} from 'modules/staticBlocks/actions'
import * as at from 'modules/staticBlocks/const'

addRule({
  id: 'feature/FETCH_COMPONENT_BLOCKS',
  target: '@@router/LOCATION_CHANGE',
  consequence: ({dispatch}) => {
    dispatch(fetchRequest('sale-top'))
    dispatch(fetchRequest('sale-bottom'))
    dispatch(fetchRequest('sale-middle'))
  },
  addOnce: true
})

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
      <StaticBlock identifier='sale-top' render={Content}/>
      <StaticBlock identifier='sale-bottom' render={Content}/>
      <StaticBlock identifier='sale-middle' render={Content}/>
    </div>
  )
}

function Content ({isFetching, block}) {
  if(isFetching){
    return <div>fetching...</div>
  }
  if(!block) return null
  return <div>{block.content}</div>
}