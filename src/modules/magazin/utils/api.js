// @flow
import algoliasearchHelper from 'algoliasearch-helper'
import algoliasearch from 'algoliasearch'
import type {MagazinArticle, ListingMagazinArticle, UrlKey, ListingKey, ListingFilters} from '../entities'

const client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

export const fetchArticle = (urlKey:UrlKey):Promise<MagazinArticle> => {
  return algoliasearchHelper(client, 'magazine', {
    disjunctiveFacets: ['urlKey'],
    attributesToHighlight: []
  }).addDisjunctiveFacetRefinement('urlKey', urlKey)
    .searchOnce()
    .then(result => result.content.hits[0])
    .then(result => result ? result : Promise.reject('404'))
}

export type ListingResponse = {
  hits: ListingMagazinArticle[],
  numPages: number
}

export const fetchArticleList = (key:ListingKey, filters: ListingFilters):Promise<ListingResponse> => {
  const helper = algoliasearchHelper(client, 'magazine', {
    disjunctiveFacets: ['objectID'],
    hierarchicalFacets: [{
      name: 'categories',
      attributes: ['categoryName'],
      sortBy: ['name:asc']
    }],
    hitsPerPage: 20,
    attributesToHighlight: []
  })

  if(filters.filterIds){
    filters.filterIds.forEach(id => helper.addDisjunctiveFacetRefinement('objectId', id))
  }

  if(filters.category){
    helper.addHierarchicalFacetRefinement('catgories', filters.category)
  }

  if(filters.page){
    helper.setPage(filters.page)
  }

  return helper
    .searchOnce()
    .then(result => ({
      hits: result.content.hits,
      numPages: result.content.content.nbPages
    }))
}