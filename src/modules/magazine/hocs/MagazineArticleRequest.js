// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ArticleIdentifier as Identifier, MagazineArticle} from '../entities'
import {getMagazineArticleRequest} from '../selectors'
import {fetchArticleRequest} from '../actions'

export type InjectedProps = {
  identifier: Identifier,
  data: MagazineArticle | null,
  isFetching: boolean,
  fetchError: null | string,
  shouldFetch: boolean,
  fetch: () => void
}

type Props = {
  identifier: Identifier,
  pure?: boolean,
  children?: (props:$Diff<InjectedProps,{}>) => any
}

const mapStateToProps = (state:RootState, props) => getMagazineArticleRequest(state.magazine, props.identifier)

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetchArticleRequest }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetchArticleRequest(props.identifier)}
})

export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.magazine === b.magazine,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.children !== b.children) return false }
      return (
        a.identifier === b.identifier
      )
    }
  }
)(Comp)

export default hoc(class MagazineArticleRenderer extends React.Component<InjectedProps & {children:Function} > {
  
  fetch = () => {
    if(this.props.shouldFetch){
      this.props.fetch()
    }
  }

  componentDidMount = this.fetch
  componentDidUpdate = this.fetch

  render() {
    const {children, ...props} = this.props
    return children ? children(props) : null
  }
})