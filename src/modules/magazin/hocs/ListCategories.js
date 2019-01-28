// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import type {RootState} from 'store/rootReducer'
import type {ListingKey} from '../entities'
import {getCategory, getCategoryOptions} from '../selectors'

type Props = {
  listingKey: ListingKey,
  pure?: boolean,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

export type InjectedProps = {
  listingKey: ListingKey,
  category: string,
  options: string[],
  fetch: () => void
}

const mapStateToProps = (state:RootState, props) => ({
  category: getCategory(state.magazin, props.listingKey),
  options: getCategoryOptions(state.magazin, props.listingKey)
})

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
        a.listingKey === b.listingKey
      )
    }
  }
)(Comp)

export default hoc(class MagazinArticleRenderer extends React.Component<InjectedProps & {render:Function} > {

  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  }
})