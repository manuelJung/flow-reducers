// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State, Dispatch} from 'store/rootReducer' // eslint-disable-line no-unused-vars
import type {ListIdentifier as Identifier, ListingFilters} from '../entities'
import {createList} from '../actions'

type InjectedProps = {
  magazineListInitializer: {
    create: () => void
  }
}

type OwnProps = {
  identifier: Identifier,
  updateKey?: string,
  filters?: $Shape<ListingFilters>
}

export type MagazineListInitializerProps = OwnProps & InjectedProps

const mapState = null

const mapDispatch = { createList }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  magazineListInitializer: Object.assign({}, sp, {
    create: () => {dp.createList(props.identifier, props.filters)}
  })
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
connect/*:: <Config&InjectedProps, OwnProps, _, _, State, Dispatch>*/(mapState,mapDispatch,mergeProps,options)(Comp)

export default hoc(class MagazineListInitializer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"magazineListInitializer">)=>React.Node
}> {
  componentDidMount(){
    this.props.magazineListInitializer.create()
  }
  componentDidUpdate(prevProps){
    if(
      prevProps.identifier !== this.props.identifier ||
      prevProps.updateKey !== this.props.updateKey
    ){
      this.props.magazineListInitializer.create()
    }
  }
  render(){
    const {children, magazineListInitializer} = this.props
    return children ? children(magazineListInitializer) : null
  }
})