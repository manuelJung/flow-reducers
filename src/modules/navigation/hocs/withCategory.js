// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Category, CategoryId} from '../entities'
import {getCategory, hasFetchedCategories} from '../selectors'

type Props = {
  categoryId: CategoryId
}

export type InjectedProps = {
  category: Category,
  hasFetched: boolean,
  categoryId: CategoryId
}

const mapStateToProps = (state:RootState, props) => ({
  category: getCategory(state.navigation, props.categoryId),
  hasFetched: hasFetchedCategories(state.navigation)
})

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({}, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props)


const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.navigation === b.navigation
  }
)(Comp)

export default hoc

export const Category = hoc(class Category extends React.Component<InjectedProps  & {render:Function}> {
  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  } 
})