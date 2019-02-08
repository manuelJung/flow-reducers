// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import type {RootState as State} from 'store/rootReducer'
import type {Identifier, Page} from '../entities'
import {getPageRequest} from '../selectors'
import {fetchRequest} from '../actions'

type InjectedProps = {
  page: {
    data: Page | null,
    isFetching: boolean,
    fetchError: null | string,
    shouldFetch: boolean,
    fetch: () => void
  }
}


type OwnProps = {
  identifier: Identifier
}

export type PageProps = OwnProps & InjectedProps

const mapState = (state, props) => getPageRequest(state.pages, props.identifier)

const mapDispatch = { fetchRequest }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  page: Object.assign({}, sp, {
    fetch: () => dp.fetchRequest(props.identifier)
  })
})

const options = {
  areStatesEqual: (a,b) => a.pages === b.pages,
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

export default hoc(class PageRequestRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"page">)=>any
}> {
  fetch = () => this.props.page.shouldFetch && this.props.page.fetch()
  componentDidMount = this.fetch
  componentDidUpdate = this.fetch
  render(){
    const {children, page} = this.props
    return children ? children(page) : null
  }
})