// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import {getDisplayPrice, getDisplayArticle} from '../selectors'

import type {RootState} from 'store/rootReducer'
import type {Filter as FilterType, FilterOption, ProductId, Article} from '../entities.flow'

type Attributes = 'DISPLAY_PRICE' | 'DISPLAY_ARTICLE'

type InjectedProps<P> = {
  displayPrice:number,
  displayArticle: Article | null
}

type RequiredProps = {
  productId: ProductId,
  attributes: Attributes[],
  render?: (props:InjectedProps<RequiredProps>) => any
}

type Hoc = (
  Component:React.ComponentType<InjectedProps<RequiredProps>&RequiredProps>
) => React.ComponentType<RequiredProps>

function mapProps (state:RootState,{productId, attributes}) {
  let result = {}

  if(attributes['DISPLAY_PRICE']) result.displayPrice = getDisplayPrice(state.products, productId)
  if(attributes['DISPLAY_ARTICLE']) result.displayPrice = getDisplayArticle(state.products, productId)

  return result
}

const mapDispatch = {}

function merge (stateProps, _, ownProps) {
  return Object.assign({}, stateProps, ownProps)
}

const hoc:Hoc = connect(mapProps, mapDispatch, merge)

export default hoc

export const ProductAttributes = hoc(function ProductAttributes ({render, ...props}){
  return render ? render(props) : null
})


class Test extends React.Component<RequiredProps> {
  render(){
    return <ProductAttributes productId='b' attributes={['DISPLAY_PRICE']} render={props => props.displayPrice}/>
  }
}