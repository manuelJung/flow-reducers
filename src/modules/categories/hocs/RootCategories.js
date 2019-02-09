// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import type {RootState as State, Dispatch} from 'store/rootReducer'
import type {Category} from '../entities'
import {getRootCategories, hasFetchedCategories} from '../selectors'

type InjectedProps = {
  rootCategories: {
    categories: Category[],
    hasFetched: boolean
  }
}

type OwnProps = {}

export type RootCategoryProps = OwnProps & InjectedProps

const mapState = state => ({
  category: getRootCategories(state.categories),
  hasFetched: hasFetchedCategories(state.categories)
})

const mapDispatch = {}

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  rootCategories: Object.assign({}, sp, dp)
})


const options = {
  areStatesEqual: (a,b) => a.categories === b.categories,
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

export default hoc(class CategoryRequestRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"rootCategories">)=>React.Node
}> {
  render(){
    const {children, rootCategories} = this.props
    return children ? children(rootCategories) : null
  }
})