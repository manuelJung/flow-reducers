// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ArticleIdentifier as Identifier, MagazineArticle} from '../entities'
import {getMagazineArticleRequest} from '../selectors'
import {fetchArticleRequest} from '../actions'

type InjectedProps = {
  magazineArticle: {
    data: MagazineArticle | null,
    isFetching: boolean,
    fetchError: null | string,
    shouldFetch: boolean,
    fetch: () => void
  }
}

type OwnProps = {
  identifier: Identifier
}

export type MagazineArticleProps = OwnProps & InjectedProps

const mapState = (state, props) => getMagazineArticleRequest(state.magazine, props.identifier)

const mapDispatch = { fetchArticleRequest }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  magazineArticle: Object.assign({}, sp, {
    fetch: () => {dp.fetchArticleRequest(props.identifier)}
  })
})

const options = {
  areStatesEqual: (a,b) => a.magazine === b.magazine,
  areOwnPropsEqual: (a,b) => {
    if(!b.pure){ if(a.children !== b.children) return false }
    for(let key in b){
      if(key === 'children') continue
      if(b[key] !== a[key]) return false
    }
    return true
  }
}

export const hoc = /*:: <Config:InjectedProps>*/(Comp/*:: :React.AbstractComponent<Config> */) /*:: : React.AbstractComponent<$Diff<Config, $Shape<InjectedProps>>>*/ => // $FlowFixMe
connect/*:: <Config&InjectedProps, OwnProps, _, _, State, _>*/(mapState,mapDispatch,mergeProps,options)(Comp)

export default hoc(class MagazineArticleRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"magazineArticle">)=>any
}> {
  fetch = () => this.props.magazineArticle.shouldFetch && this.props.magazineArticle.fetch()
  componentDidMount = this.fetch
  componentDidUpdate = this.fetch
  render(){
    const {children, magazineArticle} = this.props
    return children ? children(magazineArticle) : null
  }
})
