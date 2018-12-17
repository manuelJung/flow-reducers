// @flow
import * as React from 'react'
import {StaticBlock} from 'modules/staticBlocks/hocs/withStaticBlock'



export default function Component(){
  return (
    <div id='Component'>
      <StaticBlock identifier='sale-top' render={props => (
        <div>fetching: {props.isFetching ? 'true' : 'false'}</div>
      )}/>
    </div>
  )
}