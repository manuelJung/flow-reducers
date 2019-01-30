// @flow
import {addRule} from 'redux-interrupt'
import {fetchListRequest} from 'modules/products/actions'
import {TOGGLE_FILTER, FETCH_LIST_REQUEST} from 'modules/products/const'

addRule({
  id: 'feature/FETCH_AFTER_DROPDOWN_CLOSE',
  target: 'DropdownFilter/CLOSE_DROPDOWN',
  consequence: ({action}) => fetchListRequest(action.meta.identifier)
})

addRule({
  id: 'feature/DONT_FETCH_ON_FILTER_CHANGE',
  target: FETCH_LIST_REQUEST,
  position: 'INSERT_INSTEAD',
  consequence: () => undefined,
  addWhen: function* (action) {
    yield action(TOGGLE_FILTER)
    return 'ADD_RULE_BEFORE'
  },
  addUntil: function* (action) {
    return 'RECREATE_RULE'
  }
})