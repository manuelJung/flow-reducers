// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import type {RootState} from 'store/rootReducer'

import type {SearchKey,Product} from '../entities'
import {isFetching, getHits} from '../selectors'

type InjectedProps = {
  searchKey: SearchKey,
  hits: Product[],
  isFetching: boolean,
  render?: (props:$Diff<InjectedProps,{render:any}>) => any
}

type RequiredProps = {
  searchKey: SearchKey,
  render?: (props:$Diff<InjectedProps,{render:any}>) => any
}

type Hoc = (
  Component:React.ComponentType<InjectedProps>
) => React.ComponentType<RequiredProps>

function mapProps (state:RootState,{searchKey}) {
  return {
    isFetching: isFetching(state.search, searchKey),
    hits: getHits(state.search, searchKey)
  }
}

const mapDispatch = {}

function mergeProps (stateProps, _, ownProps) {
  return Object.assign({}, stateProps, ownProps)
}

const hoc:Hoc = connect(mapProps, mapDispatch, mergeProps, {
  areOwnPropsEqual: (a,b) => (
    a.searchKey === b.searchKey
  )
})

export default hoc

export const Hits = hoc(class Hits extends React.Component<InjectedProps> {
  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  } 
})

