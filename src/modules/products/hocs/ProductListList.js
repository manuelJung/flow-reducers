// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State, Dispatch} from 'store/rootReducer'
import type {ListIdentifier as Identifier, Product} from '../entities'
import {getListRequest} from '../selectors'

export type InjectedProps = {
  productList: {
    data: Product[] | null,
    isFetching: boolean,
    fetchError: null | string
  }
}

type OwnProps = {
  identifier: Identifier
}

export type MagazineListProps = OwnProps & InjectedProps

const mapState = (state, props) => getListRequest(state.products, props.identifier)

const mapDispatch = {}

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  productList: sp
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
connect/*:: <Config&InjectedProps, OwnProps, _, _, State, Dispatch>*/(mapState,mapDispatch,mergeProps,options)(Comp)

export default hoc(class ProductListRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"productList">)=>React.Node
}> {
  render(){
    const {children, productList} = this.props
    return children ? children(productList) : null
  }
})
