// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState} from 'store/rootReducer'
import type {Identifier, StaticBlock as StaticBlockType} from '../entities'
import {isFetching, getFetchError, getStaticBlock} from '../selectors'

type InjectedProps = {
  isFetching: boolean,
  fetchError: string | null,
  block: StaticBlockType | null
}

type RequiredProps = {
  identifier: Identifier,
  render?: (props:$Diff<Result,{render:any}>) => any
}

type Result = {
  isFetching: boolean,
  fetchError: string | null,
  block: StaticBlockType | null,
  identifier: Identifier,
  render?: (props:$Diff<Result,{render:any}>) => any
}

type Hoc = (
  Component:React.ComponentType<Result>
) => React.ComponentType<RequiredProps>

function mapProps (state:RootState,{identifier}):InjectedProps {
  return {
    isFetching: isFetching(state.staticBlocks, identifier),
    fetchError: getFetchError(state.staticBlocks, identifier),
    block: getStaticBlock(state.staticBlocks, identifier)
  }
}

const mapDispatch = {}

const hoc:Hoc = connect(mapProps, mapDispatch)

export default hoc

export const StaticBlock = hoc(function StaticBlock ({render, ...props}){
  return render ? render(props) : null
})

