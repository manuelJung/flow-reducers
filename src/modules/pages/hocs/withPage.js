// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState} from 'store/rootReducer'
import type {Slug, Page as PageType} from '../entities'
import {isFetching, getFetchError, getPage, shouldFetch} from '../selectors'
import {fetchRequest} from '../actions'

type InjectedProps = {
  isFetching: boolean,
  fetchError: string | null,
  page: PageType | null,
  shouldFetch: boolean,
  fetch: () => void
}

type RequiredProps = {
  slug: Slug,
  render?: (props:$Diff<AllProps,{render:any}>) => any
}

type AllProps = {
  isFetching: boolean,
  fetchError: string | null,
  page: PageType | null,
  shouldFetch: boolean,
  fetch: () => void,
  slug: Slug,
  render?: (props:$Diff<AllProps,{render:any}>) => any
}

type Hoc = (
  Component:React.ComponentType<AllProps>
) => React.ComponentType<AllProps>

function mapProps (state:RootState,{slug}) {
  return {
    isFetching: isFetching(state.pages, slug),
    fetchError: getFetchError(state.pages, slug),
    page: getPage(state.pages, slug),
    shouldFetch: shouldFetch(state.pages, slug)
  }
}

const mapDispatch = {fetchRequest}

function mergeProps (stateProps, {fetchRequest}, ownProps) {
  return Object.assign({}, stateProps, ownProps, {
    fetch: () => fetchRequest(ownProps.slug)
  })
}

const hoc:Hoc = connect(mapProps, mapDispatch, mergeProps)

export default hoc

export const Page = hoc(class Page extends React.Component<AllProps> {
  componentDidMount(){
    if(this.props.shouldFetch) this.props.fetch()
  }
  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  } 
})

