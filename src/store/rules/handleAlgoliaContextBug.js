// @flow
import {addRule} from 'redux-interrupt'
import {fetchFilterOptionsRequest} from 'modules/products/actions'

import type {RootState} from 'store/rootReducer'

addRule({
  id: 'feature/REFETCH_FILTER_OPTIONS',
  target: 'DropdownFilter/OPEN_DROPDOWN',
  condition: (action, getState) => {
    const state:RootState = getState()
    const listState = state.products.lists[action.meta.identifier]
    return listState ? !listState.exhaustiveFilters : false
  },
  consequence: ({action: {meta: {identifier, filterKey}}}) => 
    fetchFilterOptionsRequest(identifier, filterKey, '')
})