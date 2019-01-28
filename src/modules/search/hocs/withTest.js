// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Context, CategoryPath} from '../entities'
import {getCategoryContext, isFetchingCategoryContext, shouldFetchCategoryContext} from '../selectors'
import {fetchContextRequest as fetch} from '../actions'

type Props = {
  categoryPath: CategoryPath
}

export type InjectedProps = {
  categoryPath: CategoryPath,
  context: Context,
  isFetching: boolean,
  shouldFetch: boolean,
  fetch: () => void
}

const mapStateToProps = (state:RootState, props) => ({
  category: getCategoryContext(state.navigation, props.categoryPath),
  isFetching: isFetchingCategoryContext(state.navigation, props.categoryPath),
  shouldFetch: shouldFetchCategoryContext(state.navigation, props.categoryPath)
})

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetch }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetch(props.categoryPath)}
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
    if(this.props.onMount){
      const {render,onMount,onUnmount,onUpdate, ...props} = this.props
      onMount(props)
    }
  }
  componentWillUnmount(){
    if(this.props.onUnmount){
      const {render,onMount,onUnmount,onUpdate, ...props} = this.props
      onUnmount(props)
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.onUpdate){
      const {render,onMount,onUnmount,onUpdate, ...props} = this.props
      const {render:a,onMount:b,onUnmount:c,onUpdate:d, ...props:_props} = prevProps
      onUpdate(props,_props)
    }
  }
  render() {
    const {render,onMount,onUnmount,onUpdate, ...props} = this.props
    return render ? render(props) : null
  } 
})