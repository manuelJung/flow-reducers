// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import type {RootState as State, Dispatch} from 'store/rootReducer' // eslint-disable-line no-unused-vars
import type {Category, Identifier} from '../entities'
import {getCategory, hasFetchedCategories} from '../selectors'

type InjectedProps = {
  category: {
    data: Category | null,
    hasFetched: boolean,
  }
}

type OwnProps = {
  identifier: Identifier
}

export type CategoryProps = OwnProps & InjectedProps

const mapState = (state, props) => ({
  data: getCategory(state.categories, props.identifier),
  hasFetched: hasFetchedCategories(state.categories)
})

const mapDispatch = {}

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  category: Object.assign({}, sp, dp)
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

export default hoc(class CategoryRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"category">)=>React.Node
}> {
  render(){
    const {children, category} = this.props
    return children ? children(category) : null
  }
})
