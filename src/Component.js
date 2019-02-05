// @flow
import * as React from 'react'
import LazyComponent from 'theme/atoms/LazyComponent'
import Drawer from 'theme/atoms/Drawer'

import Checkbox from 'theme/molecules/Checkbox'


export default function Component(){
  
  return (
    <div id='Component'>
      <Checkbox label='Preis wählen' />
      <div style={{
        background: 'silver',
        height: 1800
      }}/>
      <LazyComponent offset={200} defaultHeight={400} onMount={() => console.log('mount')}>
        <div style={{
          background: 'green',
          height: 400
        }}/>
      </LazyComponent>
      <div style={{
        background: 'silver',
        height: 1800
      }}/>
    </div>
  )
}