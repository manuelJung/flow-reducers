// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Context, CategoryId} from '../entities'
import {getCategoryContext, isFetchingCategoryContext, shouldFetchCategoryContext} from '../selectors'
import {fetchContextRequest as fetch} from '../actions'

type Props = {
  categoryId: CategoryId
}

export type InjectedProps = {
  categoryId: CategoryId,
  context: Context,
  isFetching: boolean,
  shouldFetch: boolean,
  fetch: () => void
}

const mapStateToProps = (state:RootState, props) => ({
  category: getCategoryContext(state.navigation, props.categoryId),
  isFetching: isFetchingCategoryContext(state.navigation, props.categoryId),
  shouldFetch: shouldFetchCategoryContext(state.navigation, props.categoryId)
})

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetch }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetch(props.categoryId)}
})


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
  componentDidMount(){
    if(this.props.shouldFetch) this.props.fetch()
  }
  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  } 
})