// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ListIdentifier as Identifier, FilterValues} from '../entities'
import {initList} from '../actions'

export type InjectedProps = {
  identifier: Identifier,
  updateKey?: string,
  create: () => void
}

type Props = {
  identifier: Identifier,
  pure?: boolean,
  updateKey?: string,
  filters?: $Shape<FilterValues>,
  children?: (props:$Diff<InjectedProps,{}>) => any
}

const mapStateToProps = null

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ initList }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  create: () => { dp.initList(props.identifier, props.filters) }
})

export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.products === b.products,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.children !== b.children) return false }
      return (
        a.identifier === b.identifier &&
        a.updateKey === b.updateKey
      )
    }
  }
)(Comp)

export default hoc(class ProductListInitializer extends React.Component<InjectedProps & {children:Function} > {

  componentDidMount(){
    this.props.create()
  }
  componentDidUpdate(prevProps){
    if(
      prevProps.identifier !== this.props.identifier ||
      prevProps.updateKey !== this.props.updateKey
    ){
      this.props.create()
    }
  }

  render() {
    const {children, ...props} = this.props
    return children ? children(props) : null
  }
})