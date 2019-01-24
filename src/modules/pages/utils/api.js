// @flow
import algoliasearchHelper from 'algoliasearch-helper'
import algoliasearch from 'algoliasearch'
import type {UrlKey, Page} from '../entities'

const client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

const getClient = urlKey => {
  const helper = algoliasearchHelper(client, 'pages', {
    disjunctiveFacets: ['urlKey'],
  })

  helper.addDisjunctiveFacetRefinement('urlKey', urlKey)
  return helper
}

export function fetchPage(urlKey:UrlKey):Promise<Page> {
  return getClient(urlKey)
    .searchOnce()
    .then(result => result.content.hits[0])
}