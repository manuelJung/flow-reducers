// @flow
import * as React from 'react'
import LazyComponent from 'theme/atoms/LazyComponent'
import Drawer from 'theme/atoms/Drawer'


export default function Component(){
  
  return (
    <div id='Component'>
      <Drawer label='drawer'>
        Drawer content
      </Drawer>
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