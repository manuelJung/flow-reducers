// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ProductIdentifier as Identifier, Product} from '../entities'
import {getProductRequest} from '../selectors'
import {fetchRequest} from '../actions'

export type InjectedProps = {
  identifier: Identifier,
  data: Product | null,
  isFetching: boolean,
  fetchError: null | string,
  shouldFetch: boolean,
  fetch: () => void
}

type Props = {
  identifier: Identifier,
  pure?: boolean,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

const mapStateToProps = (state:RootState, props) => getProductRequest(state.products, props.identifier)

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetchRequest }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetchRequest(props.identifier)}
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

export default hoc(class ProductRenderer extends React.Component<InjectedProps & {render:Function} > {
  
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