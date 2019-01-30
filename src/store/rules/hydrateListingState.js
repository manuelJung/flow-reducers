// @flow
import {addRule} from 'redux-interrupt'
import {FETCH_LIST_SUCCESS, INIT_LIST} from 'modules/products/const'
import {initList} from 'modules/products/actions'
import {replace} from 'react-router-redux'
/*
{
  type: 'products/SET_QUERY',
  meta: {identifier: 'default'},
  payload: 'hose'
}
*/

addRule({
  id: 'feature/ADD_QUERY_STRING_TO_URL',
  target: FETCH_LIST_SUCCESS,
  consequence: ({action}) => replace(window.location.pathname+'#'+action.payload.queryString)
})

addRule({
  id: 'feature/HYDRATE_QUERY_STRING',
  target: INIT_LIST,
  position: 'INSERT_INSTEAD',
  condition: () => Boolean(window.location.hash),
  consequence: ({ action }) => {
    const queryString = window.location.hash
    const filters = mapQueryStringToFilters(queryString.slice(1))
    const newAction = initList(action.meta.identifier, filters)
    // $FlowFixMe
    newAction.meta.skipRule = 'feature/HYDRATE_QUERY_STRING'
    return newAction
  }
})

function mapQueryStringToFilters(queryString){
  let filters = {}
  queryString = decodeURIComponent(queryString)

  const queryMatch = queryString.match(/query=[^&]*/)

  if(queryMatch){
    filters.query = queryMatch[0].replace('query=', '')
  }

  
  return filters
}