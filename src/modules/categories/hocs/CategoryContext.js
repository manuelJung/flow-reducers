// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import type {RootState as State, Dispatch} from 'store/rootReducer' // eslint-disable-line no-unused-vars
import type {Context, Identifier} from '../entities'
import {getCategoryContextRequest} from '../selectors'
import {fetchContextRequest as fetch} from '../actions'

type InjectedProps = {
  categoryContext: {
    data: Context | null,
    isFetching: boolean,
    shouldFetch: boolean,
    fetchError: null | string,
    fetch: () => void
  }
}

type OwnProps = {
  identifier: Identifier
}

export type CategoryContextProps = OwnProps & InjectedProps

const mapState = (state, props) => getCategoryContextRequest(state.categories, props.identifier)

const mapDispatch = { fetch }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  categoryContext: Object.assign({}, sp, {
    fetch: () => {dp.fetch(props.identifier)}
  })
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

export default hoc(class CategoryContextRequestRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"categoryContext">)=>React.Node
}> {
  fetch = () => this.props.categoryContext.shouldFetch && this.props.categoryContext.fetch()
  componentDidMount = this.fetch
  componentDidUpdate = this.fetch
  render(){
    const {children, categoryContext} = this.props
    return children ? children(categoryContext) : null
  }
})
