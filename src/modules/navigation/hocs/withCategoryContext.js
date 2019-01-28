// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState } from 'store/rootReducer'
import type {Context, CategoryPath} from '../entities'
import {getCategoryContextRequest} from '../selectors'
import {fetchContextRequest as fetch} from '../actions'

type Props = {
  categoryPath: CategoryPath,
  pure?: boolean,
  render?: (props:$Diff<InjectedProps,{}>) => any
}

export type InjectedProps = {
  categoryPath: CategoryPath,
  data: Context | null,
  isFetching: boolean,
  shouldFetch: boolean,
  fetchError: null | string,
  fetch: () => void
}

const mapStateToProps = (state:RootState, props) => getCategoryContextRequest(state.navigation, props.categoryPath)

const mapDispatchToProps = (dispatch: *, props) => bindActionCreators({ fetch }, dispatch)

const mergeProps = (sp, dp, props):InjectedProps => Object.assign({}, sp, props, {
  fetch: () => {dp.fetch(props.categoryPath)}
})


const hoc = (Comp:React.AbstractComponent<*>) => connect<typeof Comp,_,_,Props,Props,_,_,Props,_,_>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    areStatesEqual: (a:RootState,b:RootState) => a.navigation === b.navigation,
    areOwnPropsEqual: (a,b) => {
      if(!b.pure){ if(a.render !== b.render) return false }
      return (
        a.categoryPath === b.categoryPath
      )
    }
  }
)(Comp)

export default hoc

export const CategoryContext = hoc(class CategoryContext extends React.Component<InjectedProps & {render:Function} > {
  
  fetch = () => {
    if(this.props.shouldFetch){
      this.props.fetch()
    }
  }

  componentDidMount = this.fetch
  componentDidUpdate = this.fetch

  render() {
    const {render, ...props} = this.props
    return render ? render(props) : null
  }
})
