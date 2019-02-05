// @flow
import React from 'react'
import {Wrapper} from './style'

type Props = {

}

export default React.memo<Props>(function Slider (props:Props) {
  // const sliderConfig = {
  //   min: Math.floor(min),
  //   max: Math.ceil(max),
  //   defaultValue: [bigger, smaller],
  //   onChange: this.handleChange,
  //   onAfterChange: this.handleAfterChange
  // }
  return (
    <Wrapper className='Slider'>
      <div className='handle'/>
      <div className='handle'/>
    </Wrapper>
  )
})