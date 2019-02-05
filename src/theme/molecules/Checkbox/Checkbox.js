// @flow
import React from 'react'
import {Wrapper} from './style'
import memoEqual from 'utils/memoEqual'

type Props = {|
  checked?: boolean,
  label: string,
  onClick: () => void
|}

function arePropsEqual (prevProps, nextProps) {
  return (
    prevProps.checked === nextProps.checked &&
    prevProps.label === nextProps.label
  )
}

export default React.memo<Props>(function Checkbox ({checked, label, onClick}:Props){
  return (
    <Wrapper className='Checkbox' checked={checked} onMouseDown={() => onClick()}>
      {label}
      <input type='checkbox' checked={checked}/>
      <span/>
    </Wrapper>
  )
}, memoEqual('Checkbox', ['checked', 'label'], ['onClick']))