// @flow
import React from 'react'
import {Wrapper} from './style'
import memoEqual from 'utils/memoEqual'
import type {ListingMagazineArticle} from 'modules/magazine/entities'


type Props = {
  article: ListingMagazineArticle,
  onClick: (article:ListingMagazineArticle) => void
}

export default React.memo<Props>(function MagazineWidget (props:Props){
  return (
    <Wrapper className='MagazineWidget'>
      Widget
    </Wrapper>
  )
}, memoEqual('MagazineWidget', ['article'], ['onClick']))