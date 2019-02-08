// @flow
import {addRule} from 'redux-interrupt'
import {fetchListRequest} from 'modules/products/actions'
import {TOGGLE_FILTER, FETCH_LIST_REQUEST} from 'modules/products/const'


addRule({
  id: 'feature/FETCH_ON_DROPDOWN_CLOSE',
  target: 'DropdownFilter/OPEN_DROPDOWN',
  consequence: ({ action, addRule }) => {
    const {filterKey} = action.meta
    const skipRuleId = 'feature/FETCH_ON_DROPDOWN_CLOSE/KILL_TOGGLE_FETCH/' + filterKey
    const fetchRuleId = 'feature/FETCH_ON_DROPDOWN_CLOSE/FETCH/' + filterKey
    const fetchTriggerRuleId = 'feature/FETCH_ON_DROPDOWN_CLOSE/FETCH_TRIGGER/' + filterKey
    // prevent search
    addRule({
      id: skipRuleId,
      target: TOGGLE_FILTER,
      position: 'INSERT_INSTEAD',
      condition: action => action.meta.filterKey === filterKey,
      addUntil: function* (next){
        yield next('DropdownFilter/CLOSE_DROPDOWN', action => action.meta.filterKey == filterKey)
        return 'REMOVE_RULE'
      },
      consequence: ({action}) => ({
        ...action,
        meta: {...action.meta, skipRule: ['products/TRIGGER_LIST_SEARCH', skipRuleId]}
      })
    })
    // fetch after dropdown close and after a filter was clicked
    addRule({
      id: fetchTriggerRuleId,
      target: TOGGLE_FILTER,
      condition: action => action.meta.filterKey === filterKey,
      concurrency: 'ONCE',
      addUntil: function* (next){
        yield next('DropdownFilter/CLOSE_DROPDOWN', action => action.meta.filterKey == filterKey)
        return 'REMOVE_RULE'
      },
      consequence: ({addRule}) => addRule({
        id: fetchRuleId,
        target: 'DropdownFilter/CLOSE_DROPDOWN',
        condition: action => action.meta.filterKey === filterKey,
        consequence: ({action}) => fetchListRequest(action.meta.identifier)
      })
    })
  }
})


// addRule({
//   id: 'feature/FETCH_ON_DROPDOWN_CLOSE',
//   target: 'DropdownFilter/OPEN_DROPDOWN',
//   addUntil: function* (next, action){
//     const {filterKey} = action.meta
//     yield next('DropdownFilter/CLOSE_DROPDOWN', action => action.meta.filterKey == filterKey)
//     return 'RECREATE_RULE'
//   },
//   consequence: ({ action, addRule }) => {
//     const {filterKey, identifier} = action.meta
//     // prevent search
//     addRule({
//       id: 'feature/FETCH_ON_DROPDOWN_CLOSE/KILL_TOGGLE_FETCH/' + filterKey,
//       target: TOGGLE_FILTER,
//       position: 'INSERT_INSTEAD',
//       condition: action => action.meta.filterKey === filterKey,
//       consequence: ({action}) => withSkippedRule('products/TRIGGER_LIST_SEARCH', action)
//     })
//     // fetch after dropdown close and after a filter was clicked
//     addRule({
//       id: 'feature/FETCH_ON_DROPDOWN_CLOSE/FETCH/' + filterKey,
//       target: 'DropdownFilter/CLOSE_DROPDOWN',
//       addWhen: function* (next){
//         yield next(TOGGLE_FILTER, action => action.meta.filterKey === filterKey)
//         return 'ADD_RULE'
//       },
//       condition: action => action.meta.filterKey === filterKey,
//       consequence: () => fetchListRequest(identifier)
//     })
//   }
// })