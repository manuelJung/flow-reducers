// @flow
import createSelector from 're-reselect'

import type {State} from './reducer'
import type {Article, Filter} from './entities.flow'

export const hasArticles = (state:State, number:string):boolean => Boolean(state.articles[state.numberToProductNumber[number]])
export const getArticles = (state:State, number:string):Article[] => state.articles[state.numberToProductNumber[number]]

const getFilterType = () => createSelector(
  getArticles,
  (_,__,filterKey) => filterKey,
  (articles, filterKey) => {
    return 'EMPTY'
  }
)((_,id,filterKey) => `${id}:${filterKey}`)

export const getFilter = createSelector( 
  (state, id) => state.byId[id],
  (_,__,filterKey) => filterKey,
  getFilterType,
  (product, filterKey, filterType) => {
    return {
      options: calcFilterOptions(product, filterKey),
      value: product.filters[filterKey],
      key: filterKey,
      type: filterType
    }
  }
)((_,id,filterKey) => `${id}:${filterKey}`)

export const getDisplayProduct = createSelector(
  (state,id) => state.byId[id].articles,
  (state,id) => state.byId[id].filters,
  (articles:Article[], filters) => {
    const filterList:any = Object.values(filters)
    return articles.find((article:Article) => !filterList.find((filter:Filter) => !(
      filter.type === 'EMPTY' ||
      filter.type === 'TEXT' ||
      !filter.value ||
      !article.filterValues[filter.key] ||
      filter.value.label === article.filterValues[filter.key].label
    )))
  }
)((state, id) => id)
