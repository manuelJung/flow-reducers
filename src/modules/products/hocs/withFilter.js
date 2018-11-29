// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import {getFilter} from '../selectors'
import {setFilterValue} from '../actions'

import type {RootState} from 'store/rootReducer'
import type {Filter as FilterType, FilterOption, ProductId, FilterKey} from '../entities.flow'

type InjectedProps = {
  filter: FilterType,
  setValue: (opt:FilterOption) => void,
  clearValue: () => void,
  toggleValue: (opt:FilterOption) => void
}

type RequiredProps = {
  productId: ProductId,
  filterKey: FilterKey,
  render?: (props:InjectedProps) => any
}

type Hoc = (
  Component:React.ComponentType<InjectedProps&RequiredProps>
) => React.ComponentType<RequiredProps>

function mapProps (state:RootState,{productId, filterKey}) {
  return ({
    filter: getFilter(state.products, productId, filterKey)
  })
}

const mapDispatch = {setFilterValue}

function merge (props, {filter}, {setFilteValue}) {
  return {
    filter: filter,
    setValue: opt => setFilterValue(filter, filter.key, opt),
    clearValue: () => setFilterValue(filter, filter.key, null),
    toggleValue: opt => filter.value && filter.value.label === opt.value.label
      ? setFilterValue(filter, filter.key, opt)
      : setFilterValue(filter, filter.key, null)
  }
}

const hoc:Hoc = connect(mapProps, mapDispatch, merge)

export default hoc

export const Filter = hoc(function Filter ({render, ...props}){
  return render ? render(props) : null
})


class Test extends React.Component<RequiredProps> {
  render(){
    let {filterKey, productId} = this.props
    return <Filter filterKey={filterKey} productId={productId} render={props => null}/>
  }
}