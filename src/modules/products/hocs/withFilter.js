// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import {getFilter} from '../selectors'
import {setFilterValue} from '../actions'

import type {Filter as FilterType, FilterOption} from '../entities.flow'

type InjectedProps = {
  filter: FilterType,
  setValue: (opt:FilterOption) => void,
  clearValue: () => void,
  toggleValue: (opt:FilterOption) => void
}

type RequiredProps = {
  productId: string,
  filterKey: string,
  render?: (props:InjectedProps) => any
}

type Hoc = (
  Component:React.ComponentType<InjectedProps&RequiredProps>
) => React.ComponentType<RequiredProps>

function mapProps (state,{productId, filterKey}) {
  return ({
    filter: getFilter(state.products, productId, filterKey)
  })
}

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

const hoc:Hoc = connect(mapProps, {setFilterValue}, merge)

export default hoc

export const Filter = hoc(function Filter ({render, ...props}){
  return render ? render(props) : null
})


class Test extends React.Component<RequiredProps> {
  render(){
    return <Filter filterKey='a' productId='b' render={props => null}/>
  }
}