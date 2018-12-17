// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState} from 'store/rootReducer'
import type {Identifier, StaticBlock as StaticBlockType} from '../entities'

type InjectedProps = {
  isFetching: boolean,
  fetchError: string | null,
  block: StaticBlockType | null
}

type RequiredProps = {
  identifier: Identifier,
  render?: (props:$Diff<Result,{render:any}>) => React.StatelessFunctionalComponent<$Diff<Result,{render:any}>>
}

type Result = {
  isFetching: boolean,
  fetchError: string | null,
  block: StaticBlockType | null,
  identifier: Identifier,
  render?: (props:$Diff<Result,{render:any}>) => React.StatelessFunctionalComponent<$Diff<Result,{render:any}>>
}

type Hoc = (
  Component:React.ComponentType<Result>
) => React.ComponentType<Result>

function mapProps (state:RootState,{identifier}):InjectedProps {
  return {
    isFetching: false,
    fetchError: null,
    block: null
  }
}

const mapDispatch = {}

const hoc:Hoc = connect(mapProps, mapDispatch)

export default hoc

export const StaticBlock = hoc(function StaticBlock ({render, ...props}){
  return render ? render(props) : null
})

