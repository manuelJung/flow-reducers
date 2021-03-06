// @flow
import parseCategories from './parseCategories'
import algoliasearchHelper from 'algoliasearch-helper'
import algoliasearch from 'algoliasearch'

import type {Context, Category} from '../entities'

const client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

export type FetchCategoriesResponse = {
  categories: { [id:string]:Category },
  rootCategoryPaths: string[]
}

export const fetchCategories = ():Promise<FetchCategoriesResponse> => {
  const url = 'https://s3.eu-central-1.amazonaws.com/wucu-initialstate-dev/HeaderMainNavigation.json'
  return fetch(url)
    .then(res => res.json())
    .then(parseCategories)
}


export const fetchCategoryContext = (category:Category):Promise<Context> => {
  return algoliasearchHelper(client, 'navigation', {
    disjunctiveFacets: ['objectID'],
    attributesToHighlight: []
  }).addDisjunctiveFacetRefinement('objectID', category.id)
    .searchOnce()
    .then(result => result.content.hits[0])
}
