// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Category, CategoryPath} from '../entities'
import {getCategory, hasFetchedCategories} from '../selectors'

type Props = {
  categoryPath: CategoryPath,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

export type InjectedProps = {
  category: Category | null,
  hasFetched: boolean,
  categoryPath: CategoryPath
}

const mapStateToProps = (state:RootState, props) => ({
  category: getCategory(state.navigation, props.categoryPath),
  hasFetched: hasFetchedCategories(state.navigation)
})

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({}, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props)


export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.navigation === b.navigation
  }
)(Comp)

export default hoc(class CategoryRenderer extends React.Component<InjectedProps  & {render:Function}> {
  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  } 
})