// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ListingKey, ListingMagazinArticle} from '../entities'
import {getListRequest} from '../selectors'
import {fetchListRequest} from '../actions'

type Props = {
  listingKey: ListingKey,
  pure?: boolean,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

export type InjectedProps = {
  listingKey: ListingKey,
  data: ListingMagazinArticle[] | null,
  isFetching: boolean,
  fetchError: null | string,
  shouldFetch: boolean,
  fetch: () => void
}

const mapStateToProps = (state:RootState, props) => getListRequest(state.magazin, props.listingKey)

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetchListRequest }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetchListRequest(props.listingKey)}
})

export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.magazin === b.magazin,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.render !== b.render) return false }
      return (
        a.listingKey === b.listingKey
      )
    }
  }
)(Comp)

export default hoc(class MagazinArticleListRenderer extends React.Component<InjectedProps & {render:Function} > {
  
  fetch = () => {
    if(this.props.shouldFetch){
      this.props.fetch()
    }
  }

  componentDidMount = this.fetch
  componentDidUpdate = this.fetch

  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  }
})