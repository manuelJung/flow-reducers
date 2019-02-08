// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State} from 'store/rootReducer'
import type {ProductIdentifier as Identifier, Product} from '../entities'
import {getProductRequest} from '../selectors'
import {fetchRequest} from '../actions'

type InjectedProps = {
  product: {
    data: Product | null,
    isFetching: boolean,
    fetchError: null | string,
    shouldFetch: boolean,
    fetch: () => void
  }
}

type OwnProps = {
  identifier: Identifier
}

export type ProductProps = OwnProps & InjectedProps

const mapState = (state, props) => getProductRequest(state.products, props.identifier)

const mapDispatch = { fetchRequest }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  product: Object.assign({}, sp, {
    fetch: () => {dp.fetchRequest(props.identifier)}
  })
})

const options = {
  areStatesEqual: (a,b) => a.products === b.products,
  areOwnPropsEqual: (a,b) => {
    if(!b.pure){ if(a.children !== b.children) return false }
    for(let key in b){
      if(key === 'children') continue
      if(b[key] !== a[key]) return false
    }
    return true
  }
}

export const hoc = /*:: <Config:InjectedProps>*/(Comp/*:: :React.AbstractComponent<Config> */) /*:: : React.AbstractComponent<$Diff<Config, $Shape<InjectedProps>>>*/ => // $FlowFixMe
connect/*:: <Config&InjectedProps, OwnProps, _, _, State, _>*/(mapState,mapDispatch,mergeProps,options)(Comp)

export default hoc(class ProductRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"product">)=>any
}> {
  fetch = () => this.props.product.shouldFetch && this.props.product.fetch()
  componentDidMount = this.fetch
  componentDidUpdate = this.fetch
  render(){
    const {children, product} = this.props
    return children ? children(product) : null
  }
})