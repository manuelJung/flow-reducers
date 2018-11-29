// @flow
import createReSelector from 're-reselect'

import type {State} from './reducer'
import type {Article, Filter, FilterKey, FilterType, ProductNumber, ProductId} from './entities.flow'

export const hasArticles = (state:State, pNumber:ProductNumber):boolean => Boolean(state.articles[state.numberToProductNumber[pNumber]])
export const getArticles = (state:State, pNumber:ProductNumber):Article[] => state.articles[state.numberToProductNumber[pNumber]]


const getFilterType:(state:State,pNumber:ProductNumber,filterKey:FilterKey) => FilterType = createReSelector(
  getArticles,
  (_,__,filterKey) => filterKey,
  (articles, filterKey) => {
    return 'EMPTY'
  }
)((_,pNumber,filterKey) => `${pNumber}:${filterKey}`)

const getFilter:(state:State,pNumber:ProductNumber,filterKey:FilterKey) => Filter = createReSelector(
  (state,pNumber) => state.articles[pNumber],
  (_,__,filterKey) => filterKey,
  getFilterType,
  (articles, filterKey, filterType):Filter => {
    return {
      options: [],//calcFilterOptions(product, filterKey),
      value: null,
      key: filterKey,
      type: filterType,
      productId: 'missing'
    }
  }
)((_,pNumber,filterKey) => `${pNumber}:${filterKey}`)

export const getDisplayProduct:(state:State,id:ProductNumber) => Article|null = createReSelector(
  (state,id:ProductNumber) => state.articles[id],
  (articles) => {
    return null
  }
)((_, id:string) => id)

// export const getDisplayProduct = createReSelector(
//   (state,id) => state.byId[id].articles,
//   (state,id) => state.byId[id].filters,
//   (articles:Article[], filters) => {
//     const filterList:any = Object.values(filters)
//     return articles.find((article:Article) => !filterList.find((filter:Filter) => !(
//       filter.type === 'EMPTY' ||
//       filter.type === 'TEXT' ||
//       !filter.value ||
//       !article.filterValues[filter.key] ||
//       filter.value.label === article.filterValues[filter.key].label
//     )))
//   }
// )((_, id:string) => id)
