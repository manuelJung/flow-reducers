// @flow
import React from 'react'
import {Wrapper} from './style'

type Props = {|
  checked?: boolean,
  label: string
|}

export default function Checkbbox ({checked, label}:Props){
  return (
    <Wrapper className='Checkbox' checked={checked}>
      {label}
      <input type='checkbox' checked={checked}/>
      <span/>
    </Wrapper>
  )
}