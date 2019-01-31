// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Context, Identifier} from '../entities'
import {getCategoryContextRequest} from '../selectors'
import {fetchContextRequest as fetch} from '../actions'

export type InjectedProps = {
  identifier: Identifier,
  data: Context | null,
  isFetching: boolean,
  shouldFetch: boolean,
  fetchError: null | string,
  fetch: () => void
}

type Props = {
  identifier: Identifier,
  pure?: boolean,
  children?: (props:$Diff<InjectedProps,{}>) => any
}

const mapStateToProps = (state:RootState, props) => getCategoryContextRequest(state.categories, props.identifier)

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetch }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetch(props.identifier)}
})


export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.categories === b.categories,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.children !== b.children) return false }
      return (
        a.identifier === b.identifier
      )
    }
  }
)(Comp)

export default hoc(class CategoryContextRenderer extends React.Component<InjectedProps & {children:Function} > {
  
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
