// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState} from 'store/rootReducer'
import type {Slug, Page as PageType} from '../entities'

type InjectedProps = {
  isFetching: boolean,
  fetchError: string | null,
  block: PageType | null
}

type RequiredProps = {
  slug: Slug,
  render?: (props:$Diff<Result,{render:any}>) => React.StatelessFunctionalComponent<$Diff<Result,{render:any}>>
}

type Result = {
  isFetching: boolean,
  fetchError: string | null,
  block: PageType | null,
  slug: Slug,
  render?: (props:$Diff<Result,{render:any}>) => React.StatelessFunctionalComponent<$Diff<Result,{render:any}>>
}

type Hoc = (
  Component:React.ComponentType<Result>
) => React.ComponentType<Result>

function mapProps (state:RootState,{slug}):InjectedProps {
  return {
    isFetching: false,
    fetchError: null,
    block: null
  }
}

const mapDispatch = {}

const hoc:Hoc = connect(mapProps, mapDispatch)

export default hoc

export const Page = hoc(function Page ({render, ...props}){
  return render ? render(props) : null
})

