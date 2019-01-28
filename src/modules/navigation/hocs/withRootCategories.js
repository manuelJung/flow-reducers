// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Category} from '../entities'
import {getRootCategories, hasFetchedCategories} from '../selectors'

type Props = {
  pure?: boolean,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

export type InjectedProps = {
  categories: Category[],
  hasFetched: boolean
}

const mapStateToProps = (state:RootState) => ({
  category: getRootCategories(state.navigation),
  hasFetched: hasFetchedCategories(state.navigation)
})

const mapDispatchToProps = (dispatch: *) => bindActionCreators({}, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props)


const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.navigation === b.navigation,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.render !== b.render) return false }
      return true
    }
  }
)(Comp)

export default hoc

export const RootCategories = hoc(class RootCategories extends React.Component<InjectedProps  & {render:Function}> {
  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  } 
})