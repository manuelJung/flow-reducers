// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State} from 'store/rootReducer'
import type {ListIdentifier as Identifier, FilterValues} from '../entities'
import {initList} from '../actions'

type InjectedProps = {
  productListInitializer: {
    create: () => void
  }
}

type OwnProps = {
  identifier: Identifier,
  updateKey?: string,
  filters?: $Shape<FilterValues>
}

export type ProductListInitializerProps = OwnProps & InjectedProps

const mapState = null

const mapDispatch = { initList }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  productListInitializer: Object.assign({}, sp, {
    // TODO: rename to "createList" aka magazine module
    create: () => {dp.initList(props.identifier, props.filters)}
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

export default hoc(class ProductListInitializer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"productListInitializer">)=>React.Node
}> {
  componentDidMount(){
    this.props.productListInitializer.create()
  }
  componentDidUpdate(prevProps){
    if(
      prevProps.identifier !== this.props.identifier ||
      prevProps.updateKey !== this.props.updateKey
    ){
      this.props.productListInitializer.create()
    }
  }
  render(){
    const {children, productListInitializer} = this.props
    return children ? children(productListInitializer) : null
  }
})
