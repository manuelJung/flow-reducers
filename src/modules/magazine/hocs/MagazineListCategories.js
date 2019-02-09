// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State} from 'store/rootReducer'
import type {ListIdentifier as Identifier} from '../entities'
import {getCategory, getCategoryOptions} from '../selectors'

type InjectedProps = {
  magazineListCategories: {
    activeCategory: string,
    options: string[],
  }
}

type OwnProps = {
  identifier: Identifier
}

export type MagazineListCategoriesProps = OwnProps & InjectedProps

const mapState = (state, props) => ({
  activeCategory: getCategory(state.magazine, props.identifier),
  options: getCategoryOptions(state.magazine, props.identifier)
})

const mapDispatch = {}

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  magazineListCategories: sp
})

const options = {
  areStatesEqual: (a,b) => a.magazine === b.magazine,
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

export default hoc(class MagazineListCategoriesRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"magazineListCategories">)=>React.Node
}> {
  render(){
    const {children, magazineListCategories} = this.props
    return children ? children(magazineListCategories) : null
  }
})