// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ListIdentifier as Identifier, ListingMagazinArticle} from '../entities'
import {getListRequest} from '../selectors'

export type InjectedProps = {
  identifier: Identifier,
  data: ListingMagazinArticle[] | null,
  isFetching: boolean,
  fetchError: null | string
}

type Props = {
  identifier: Identifier,
  pure?: boolean,
  children?: (props:$Diff<InjectedProps,{}>) => any
}

const mapStateToProps = (state:RootState, props) => getListRequest(state.magazin, props.identifier)

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({}, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props)

export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.magazin === b.magazin,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.children !== b.children) return false }
      return (
        a.identifier === b.identifier
      )
    }
  }
)(Comp)

export default hoc(class MagazinArticleListRenderer extends React.Component<InjectedProps & {children:Function} > {
  
  render() {
    const {children, ...props} = this.props
    return children ? children(props) : null
  }
})