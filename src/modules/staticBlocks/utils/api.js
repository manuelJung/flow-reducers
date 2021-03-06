// @flow
import algoliasearchHelper from 'algoliasearch-helper'
import algoliasearch from 'algoliasearch'
import type {StaticBlock} from '../entities'

const client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

export function fetchBlock(identifier:string):Promise<StaticBlock> {
  return algoliasearchHelper(client, 'staticblocks', {
    disjunctiveFacets: ['identifier'],
    attributesToHighlight: []
  }).addDisjunctiveFacetRefinement('identifier', identifier)
    .searchOnce()
    .then(result => result.content.hits[0])
    .then(result => result ? result : Promise.reject('404'))
}