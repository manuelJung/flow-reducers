// @flow
import React from 'react'
import Helmet from 'react-helmet'
import ProductSearch from 'theme/organisms/ProductSearch'
import CategoryContext from 'theme/organisms/CategoryContext'

import CategoryRequest from 'modules/categories/hocs/CategoryRequest'


type Props = {
  match: {
    params: {
      lv1: string,
      lv2?: string,
      lv3?: string
    }
  }
}

export default React.memo<Props>(function SearchRoute (props:Props) {
  const {lv1, lv2, lv3} = props.match.params
  const path = getPath(lv1, lv2, lv3)
  return (
    <div className='SearchRoute'>
      <Helmet title='Category-Route'/>
      <CategoryContext position='top' identifier={path} />
      <CategoryRequest identifier={path} children={category => category.hasFetched && (
        <ProductSearch identifier='fashion-route' filters={{ 
          category: category.data ? category.data.category : '' 
        }} />
      )}/>
      <CategoryContext position='bottom' identifier={path} />
    </div>
  )
})


const getPath = (lv1, lv2, lv3) => {
  let path = '/shop/'+lv1
  if(lv2) path += '/'+lv2
  if(lv3) path += '/'+lv3 
  return path
}