// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState} from 'store/rootReducer'
import type {UrlKey, Page as PageType} from '../entities'
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
  urlKey: UrlKey,
  render?: (props:$Diff<AllProps,{render:any}>) => any
}

type AllProps = {
  isFetching: boolean,
  fetchError: string | null,
  page: PageType | null,
  shouldFetch: boolean,
  fetch: () => void,
  urlKey: UrlKey,
  render?: (props:$Diff<AllProps,{render:any}>) => any
}

type Hoc = (
  Component:React.ComponentType<AllProps>
) => React.ComponentType<RequiredProps>

function mapProps (state:RootState,{urlKey}) {
  return {
    isFetching: isFetching(state.pages, urlKey),
    fetchError: getFetchError(state.pages, urlKey),
    page: getPage(state.pages, urlKey),
    shouldFetch: shouldFetch(state.pages, urlKey)
  }
}

const mapDispatch = {fetchRequest}

function mergeProps (stateProps, {fetchRequest}, ownProps) {
  return Object.assign({}, stateProps, ownProps, {
    fetch: () => fetchRequest(ownProps.urlKey)
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

