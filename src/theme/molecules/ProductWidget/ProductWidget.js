// @flow
import React from 'react'
import {Wrapper} from './style'
import memoEqual from 'utils/memoEqual'
import type {Product} from 'modules/products/entities'


type Props = {
  product: Product,
  onClick: (product:Product) => void,
  onEyeClick: (product:Product) => void,
  onCartClick: (product:Product) => void,
}

export default React.memo<Props>(function ProductWidget (props:Props){
  return (
    <Wrapper className='ProductWidget'>
      Widget
    </Wrapper>
  )
}, memoEqual('ProductWidget', ['article'], ['onClick', 'onEyeClick', 'onCartClick']))