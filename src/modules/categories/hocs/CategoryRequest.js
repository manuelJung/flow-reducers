// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Category, CategoryPath} from '../entities'
import {getCategory, hasFetchedCategories} from '../selectors'

export type InjectedProps = {
  category: Category | null,
  hasFetched: boolean,
  categoryPath: CategoryPath
}

type Props = {
  categoryPath: CategoryPath,
  pure?: boolean,
  children?: (props:$Diff<InjectedProps,{}>) => any
}

const mapStateToProps = (state:RootState, props) => ({
  category: getCategory(state.categories, props.categoryPath),
  hasFetched: hasFetchedCategories(state.categories)
})

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({}, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props)


export const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.categories === b.categories,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.children !== b.children) return false }
      return true
    }
  }
)(Comp)

export default hoc(class CategoryRenderer extends React.Component<InjectedProps  & {children:Function}> {
  render() {
    const {children, ...props} = this.props
    return children ? children(props) : null
  } 
})