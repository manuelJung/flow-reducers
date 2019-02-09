// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State} from 'store/rootReducer'
import type {Identifier, StaticBlock} from '../entities'
import {getStaticBlockRequest} from '../selectors'
import {fetchRequest} from '../actions'

type InjectedProps = {
  staticBlock: {
    data: StaticBlock | null,
    isFetching: boolean,
    fetchError: null | string,
    shouldFetch: boolean,
    fetch: () => void
  }
}

type OwnProps = {
  identifier: Identifier
}

export type StaticBlockProps = OwnProps & InjectedProps

const mapState = (state, props) => getStaticBlockRequest(state.staticBlocks, props.identifier)

const mapDispatch = { fetchRequest }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  staticBlock: Object.assign({}, sp, {
    fetch: () => {dp.fetchRequest(props.identifier)}
  })
})

const options = {
  areStatesEqual: (a,b) => a.staticBlocks === b.staticBlocks,
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

export default hoc(class StaticBlockRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"staticBlock">)=>React.Node
}> {
  fetch = () => this.props.staticBlock.shouldFetch && this.props.staticBlock.fetch()
  componentDidMount = this.fetch
  componentDidUpdate = this.fetch
  render(){
    const {children, staticBlock} = this.props
    return children ? children(staticBlock) : null
  }
})


