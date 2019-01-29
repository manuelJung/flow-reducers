// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ListIdentifier as Identifier, FilterValues} from '../entities'
import {initList} from '../actions'

export type InjectedProps = {
  identifier: Identifier,
  create: () => void
}

type Props = {
  identifier: Identifier,
  pure?: boolean,
  filters?: $Diff<FilterValues,{}>,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

const mapStateToProps = null

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ initList }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  create: () => {dp.initList(props.identifier, props.filters)}
})

export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.products === b.products,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.render !== b.render) return false }
      return (
        a.identifier === b.identifier
      )
    }
  }
)(Comp)

export default hoc(class ListInitializer extends React.Component<InjectedProps & {render:Function} > {

  componentDidMount(){
    this.props.create()
  }
  componentDidUpdate(prevProps){
    if(prevProps.identifier !== this.props.identifier){
      this.props.create()
    }
  }

  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  }
})