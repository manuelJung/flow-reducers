// @flow
import * as React from 'react'
import {StaticBlock} from 'modules/staticBlocks/hocs/withStaticBlock'
import {addRule} from 'redux-interrupt'
import {fetchRequest} from 'modules/staticBlocks/actions'

addRule({
  id: 'feature/FETCH_COMPONENT_BLOCKS',
  target: 'TEST',
  consequence: () => fetchRequest('sale-top'),
  addOnce: true
})

export default function Component(){
  return (
    <div id='Component'>
      <StaticBlock identifier='sale-top' render={props => (
        <div>fetching: {props.isFetching ? 'true' : 'false'}</div>
      )}/>
    </div>
  )
}