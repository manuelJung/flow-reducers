// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import type {RootState} from 'store/rootReducer'

import type {SearchKey, FilterValues} from '../entities'
import {isFetching, getHits} from '../selectors'
import {init} from '../actions'

type InjectedProps = {
  searchKey: SearchKey,
  initialValues?: $Shape<FilterValues>,
  init: () => void,
  render?: (props:$Diff<InjectedProps,{render:any}>) => any
}

type RequiredProps = {
  searchKey: SearchKey,
  initialValues?: $Shape<FilterValues>,
  render?: (props:$Diff<InjectedProps,{render:any}>) => any
}

type Hoc = (
  Component:React.ComponentType<InjectedProps>
) => React.ComponentType<RequiredProps>

function mapProps (state:RootState,{searchKey}) {
  return {}
}

const mapDispatch = {init}

function mergeProps (stateProps, {init}, ownProps) {
  return Object.assign({}, stateProps, ownProps, {
    init: () => init(ownProps.searchKey, ownProps.initialValues)
  })
}

const hoc:Hoc = connect(mapProps, mapDispatch, mergeProps, {
  areOwnPropsEqual: (a,b) => true
})

export default hoc

export const Search = hoc(class Search extends React.Component<InjectedProps> {
  componentWillMount(){
    this.props.init()
  }

  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  } 
})

