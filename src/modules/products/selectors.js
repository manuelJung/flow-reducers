// @flow
import type {State} from './reducer'
import type {Article} from './entities.flow'

export const hasArticles = (state:State, number:string):boolean => Boolean(state.articles[state.numberToProductNumber[number]])
export const getArticles = (state:State, number:string):Article[] => state.articles[state.numberToProductNumber[number]]