// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ListIdentifier as Identifier, Filter, FilterKey, FilterOption} from '../entities'
import {getFilter, isFetchingList} from '../selectors'
import {toggleFilter} from '../actions'

export type InjectedProps = {
  identifier: Identifier,
  filterKey: FilterKey,
  data: Filter,
  isFetching: boolean,
  toggleOption: (option:FilterOption) => void
}

type Props = {
  identifier: Identifier,
  filterKey: FilterKey,
  pure?: boolean,
  children?: (props:$Diff<InjectedProps,{}>) => any
}

const mapStateToProps = (state:RootState, props) => ({
  data: getFilter(state.products, props.identifier, props.filterKey),
  isFetching: isFetchingList(state.products, props.identifier)
})

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ toggleFilter }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  toggleOption: (option:FilterOption) => {dp.toggleFilter(props.identifier, props.filterKey, option)}
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
        a.filterKey === b.filterKey
      )
    }
  }
)(Comp)

export default hoc(class ProductListFilterRenderer extends React.Component<InjectedProps & {children:Function} > {
  render() {
    const {children, ...props} = this.props
    return children ? children(props) : null
  }
})