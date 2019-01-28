// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {UrlKey, MagazinArticle} from '../entities'
import {getMagazinArticleRequest} from '../selectors'
import {fetchArticleRequest} from '../actions'

type Props = {
  urlKey: UrlKey,
  pure?: boolean,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

export type InjectedProps = {
  urlKey: UrlKey,
  data: PageType | null,
  isFetching: boolean,
  fetchError: null | string,
  shouldFetch: boolean,
  fetch: () => void
}

const mapStateToProps = (state:RootState, props) => getMagazinArticleRequest(state.magazin, props.urlKey)

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetchArticleRequest }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetchArticleRequest(props.urlKey)}
})

export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.pages === b.pages,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.render !== b.render) return false }
      return (
        a.urlKey === b.urlKey
      )
    }
  }
)(Comp)

export default hoc(class MagazinArticleRenderer extends React.Component<InjectedProps & {render:Function} > {
  
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