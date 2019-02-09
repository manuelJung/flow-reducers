// @flow
import * as React from 'react'
import LazyComponent from 'theme/atoms/LazyComponent'

import Slider from 'theme/molecules/Slider'

import Header from 'theme/_Header'


export default function Component(){
  return (
    <div id='Component'>
      <Header/>
      <Slider price={[0,100]} min={0} max={200} onChange={console.log}/>
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