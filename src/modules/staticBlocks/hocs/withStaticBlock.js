// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState} from 'store/rootReducer'
import type {Identifier, StaticBlock as StaticBlockType} from '../entities'
import {isFetching, getFetchError, getStaticBlock, shouldFetch} from '../selectors'
import {fetchRequest} from '../actions'

type InjectedProps = {
  isFetching: boolean,
  fetchError: string | null,
  block: StaticBlockType | null,
  shouldFetch: boolean,
  fetch: () => void
}

type RequiredProps = {
  identifier: Identifier,
  render?: (props:$Diff<AllProps,{render:any}>) => any
}

type AllProps = {
  isFetching: boolean,
  fetchError: string | null,
  block: StaticBlockType | null,
  identifier: Identifier,
  shouldFetch: boolean,
  fetch: () => void,
  render?: (props:$Diff<AllProps,{render:any}>) => any
}

type Hoc = (
  Component:React.ComponentType<AllProps>
) => React.ComponentType<RequiredProps>

function mapProps (state:RootState,{identifier}) {
  return {
    isFetching: isFetching(state.staticBlocks, identifier),
    fetchError: getFetchError(state.staticBlocks, identifier),
    block: getStaticBlock(state.staticBlocks, identifier),
    shouldFetch: shouldFetch(state.staticBlocks, identifier)
  }
}

const mapDispatch = {fetchRequest}

function mergeProps (stateProps, {fetchRequest}, ownProps) {
  return Object.assign({}, stateProps, ownProps, {
    fetch: () => fetchRequest(ownProps.identifier)
  })
}

const hoc:Hoc = connect(mapProps, mapDispatch, mergeProps)

export default hoc


export const StaticBlock = hoc(class StaticBlock extends React.Component<AllProps> {
  componentDidMount(){
    // if(this.props.shouldFetch) this.props.fetch()
  }
  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  } 
})

