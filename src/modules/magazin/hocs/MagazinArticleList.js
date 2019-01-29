// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ListIdentifier as Identifier, ListingMagazinArticle} from '../entities'
import {getListRequest} from '../selectors'
import {} from '../actions'

export type InjectedProps = {
  identifier: Identifier,
  data: ListingMagazinArticle[] | null,
  isFetching: boolean,
  fetchError: null | string
}

type Props = {
  identifier: Identifier,
  pure?: boolean,
  render?: (props:$Diff<InjectedProps,{}>) => any
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
      if(!b.pure){ if(a.render !== b.render) return false }
      return (
        a.identifier === b.identifier
      )
    }
  }
)(Comp)

export default hoc(class MagazinArticleListRenderer extends React.Component<InjectedProps & {render:Function} > {
  
  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  }
})