// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Context, CategoryId} from '../entities'
import {getCategoryContextRequest} from '../selectors'
import {fetchContextRequest as fetch} from '../actions'

type Props = {
  categoryId: CategoryId,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

export type InjectedProps = {
  categoryId: CategoryId,
  data: Context | null,
  isFetching: boolean,
  shouldFetch: boolean,
  fetch: () => void
}

const mapStateToProps = (state:RootState, props) => getCategoryContextRequest(state.navigation, props.categoryId)

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

export const CategoryContext = hoc(class CategoryContext extends React.Component<InjectedProps & {render:Function} > {
  static fetchedCategoryIds = {}

  fetch = () => {
    const {categoryId} = this.props
    if(this.props.shouldFetch && !CategoryContext.fetchedCategoryIds[categoryId]){
      this.props.fetch()
      CategoryContext.fetchedCategoryIds[categoryId] = true
    }
  }

  componentDidMount = this.fetch
  componentDidUpdate = this.fetch

  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  }
})
