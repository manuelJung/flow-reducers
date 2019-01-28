// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {Identifier, StaticBlock as StaticBlockType} from '../entities'
import {getStaticBlockRequest} from '../selectors'
import {fetchRequest} from '../actions'

type Props = {
  identifier: Identifier,
  pure?: boolean,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

export type InjectedProps = {
  identifier: Identifier,
  data: StaticBlockType | null,
  isFetching: boolean,
  fetchError: null | string,
  shouldFetch: boolean,
  fetch: () => void
}

const mapStateToProps = (state:RootState, props) => getStaticBlockRequest(state.staticBlocks, props.identifier)

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetchRequest }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetchRequest(props.identifier)}
})

const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.pages === b.pages,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.render !== b.render) return false }
      return (
        a.identifier === b.identifier
      )
    }
  }
)(Comp)

export default hoc


export const StaticBlock = hoc(class StaticBlock extends React.Component<InjectedProps & {render:Function} > {
  
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

