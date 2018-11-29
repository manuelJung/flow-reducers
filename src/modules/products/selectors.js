// @flow
import createReSelector from 're-reselect'

import type {State} from './reducer'
import type {Article, Filter, FilterKey, FilterType, ProductNumber, ProductId, Number, FilterValue} from './entities.flow'

export const hasArticles = (state:State, pNumber:ProductNumber):boolean => Boolean(state.articles[state.numberToProductNumber[pNumber]])
export const getArticles = (state:State, pNumber:ProductNumber):Article[] => state.articles[state.numberToProductNumber[pNumber]] || []

const getProductNumberFromNumber = (state:State, number:Number):ProductNumber|null => state.numberToProductNumber[number] || null
const getProductNumberFromProductId = (state:State, pId:ProductId):ProductNumber|null => {
  const number = state.productIdsToNumber[pId]
  if(!number) return null
  return getProductNumberFromNumber(state, number)
}
const getArticlesByProductId = (state:State, pId:ProductId):Article[] => {
  const pNumber = getProductNumberFromProductId(state, pId)
  if(pNumber === null) return []
  return getArticles(state, pNumber)
}
const getFilterType:(state:State,pId:ProductNumber,filterKey:FilterKey) => FilterType = createReSelector(
  getArticlesByProductId,
  (_,__,filterKey) => filterKey,
  (articles, filterKey) => {
    return 'EMPTY'
  }
)((_,pNumber,filterKey) => `${pNumber}:${filterKey}`)

export const getFilter:(state:State,pId:ProductNumber,filterKey:FilterKey) => Filter = createReSelector(
  getArticlesByProductId,
  (_,__,filterKey) => filterKey,
  getFilterType,
  (_,pId) => pId,
  (articles, filterKey, filterType, pId):Filter => {
    return {
      options: [],//calcFilterOptions(product, filterKey),
      value: null,
      key: filterKey,
      type: filterType,
      productId: pId
    }
  }
)((_,pNumber,filterKey) => `${pNumber}:${filterKey}`)

export const getDisplayArticle:(state:State,pId:ProductId) => Article|null = createReSelector(
  getArticlesByProductId,
  (state,pId) => state.filters[pId],
  (articles, filterValues) => {
    let filterValueList = ((Object.entries(filterValues):any):[FilterKey, FilterValue][])
    filterValueList = filterValueList.filter(([_,val]) => val)
    const matchFilters = article => !filterValueList.find(([key,val]) => 
      article.filterValues[key]
      && val
      && article.filterValues[key].label === val.label 
    )
    return articles.find(matchFilters) || null
  }
)((_, pId) => pId)

export const getDisplayPrice:(state:State,pId:ProductId) => number = () => 100