// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State, Dispatch} from 'store/rootReducer'
import type {ListIdentifier as Identifier, Filter, FilterKey, FilterOption} from '../entities'
import {getFilter, isFetchingList} from '../selectors'
import {toggleFilter} from '../actions'

type InjectedProps = {
  productListFilter: {
    data: Filter,
    isFetching: boolean,
    toggleOption: (option:FilterOption) => void
  }
}

type OwnProps = {
  identifier: Identifier,
  filterKey: FilterKey
}

export type ProductListFilterProps = OwnProps & InjectedProps

const mapState = (state, props) => ({
  data: getFilter(state.products, props.identifier, props.filterKey),
  isFetching: isFetchingList(state.products, props.identifier)
})

const mapDispatch = { toggleFilter }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  productListFilter: Object.assign({}, sp, {
    toggleOption: (opt:FilterOption) => dp.toggleFilter(props.identifier, props.filterKey, opt)
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
connect/*:: <Config&InjectedProps, OwnProps, _, _, State, Dispatch>*/(mapState,mapDispatch,mergeProps,options)(Comp)

export default hoc(class ProductListFilterRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"productListFilter">)=>React.Node
}> {
  render(){
    const {children, productListFilter} = this.props
    return children ? children(productListFilter) : null
  }
})