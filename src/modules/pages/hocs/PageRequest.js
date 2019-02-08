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
  page: Object.assign({}, sp, dp)
})

const options = {
  areStatesEqual: (a,b) => a.pages === b.pages,
  areOwnPropsEqual: (a,b) => {
    if(!b.pure){ if(a.children !== b.children) return false }
    return a.test === b.test
  }
}



export const hoc = /*:: <Config:InjectedProps>*/(Comp/*:: :React.AbstractComponent<Config> */) /*:: : React.AbstractComponent<$Diff<Config, $Shape<InjectedProps>>>*/ => // $FlowFixMe
connect/*:: <Config&InjectedProps, OwnProps, _, _, State, _>*/(mapState,mapDispatch,mergeProps,options)(Comp)

export default hoc(class Hoc extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"page">)=>any
}> {
  render(){
    const {children, page} = this.props
    return children ? children(page) : null
  }
})