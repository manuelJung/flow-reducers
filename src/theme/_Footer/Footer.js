// @flow
import React from 'react'
import {Wrapper} from './style'

type Props = {}

export default React.memo<Props>(function Footer (){
  return (
    <Wrapper className='Footer'>
      <div className='top'>
        <div className='link-list'/>
        <div className='category-list'/>
        <div className='newsletter'/>
        <div className='social-list'/>
      </div>
      <div className='bottom'>
        <div className='copyright'/>
      </div>
    </Wrapper>
  )
})