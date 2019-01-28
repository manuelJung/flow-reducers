// @flow
import * as at from './const'
import type {MagazinArticle, ListingMagazinArticle, UrlKey, ListingKey} from './entities'
import type {Action} from './actions'

export type State = {
  +articles: {+[key:UrlKey]:ArticleState},
  +articleLists: {+[key:ListingKey]:ListingState}
}

type ArticleState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +data: MagazinArticle | null
}

type ListingState = {
  +isFetching: boolean,
  +fetchError: string | null,
  +data: ListingMagazinArticle[] | null,
  +filters: {
    +filterIds: string[],
    +category: string,
    +page: number
  },
  +numPages: number
}

const defaultState = {
  articles: {},
  articleLists: {}
}

export default function reducer (state:State=defaultState, action:Action):State {
  switch(action.type){
    case at.FETCH_ARTICLE_REQUEST:
    case at.FETCH_ARTICLE_SUCCESS:
    case at.FETCH_ARTICLE_FAILURE: {
      const {urlKey} = action.meta
      return {
        ...state,
        articles: {
          ...state.articles,
          [urlKey]: articleReducer(state.articles[urlKey], action)
        }
      }
    }
    case at.CREATE_LIST: {
      return {
        ...state,
        articleLists: {
          ...state.articleLists,
          [action.payload]: listingReducer(state.articleLists[action.payload], action)
        }
      }
    }
    case at.TOGGLE_CATEGORY:
    case at.SET_PAGE:
    case at.FETCH_LIST_REQUEST:
    case at.FETCH_LIST_SUCCESS:
    case at.FETCH_LIST_FAILURE: {
      const {key} = action.meta
      return {
        ...state,
        articleLists: {
          ...state.articleLists,
          [key]: listingReducer(state.articleLists[key], action)
        }
      }
    }
    default: return state
  }
}

const defaultArticleState = {
  isFetching: false,
  fetchError: null,
  data: null
}

function articleReducer (state:ArticleState=defaultArticleState, action:Action):ArticleState {
  switch(action.type){
    case at.FETCH_ARTICLE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        fetchError: null
      }
    }
    case at.FETCH_ARTICLE_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload
      }
    }
    case at.FETCH_ARTICLE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    }
    default: return state
  }
}

const defaultListingState = {
  isFetching: false,
  fetchError: null,
  data: null,
  filters: {
    filterIds: [],
    category: '',
    page: 0
  },
  numPages: 5
}

function listingReducer (state:ListingState=defaultListingState, action:Action):ListingState {
  switch(action.type){
    case at.CREATE_LIST: {
      return {
        ...state,
        filters: {
          ...defaultListingState.filters,
          ...action.meta
        }
      }
    }
    case at.TOGGLE_CATEGORY: {
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.payload === state.filters.category 
            ? defaultListingState.filters.category 
            : action.payload
        }
      }
    }
    case at.SET_PAGE: {
      return {
        ...state,
        page: action.payload
      }
    }
    case at.FETCH_LIST_REQUEST: {
      return {
        ...state,
        isFetching: true,
        fetchError: null
      }
    }
    case at.FETCH_LIST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload
      }
    }
    case at.FETCH_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.payload.hits,
        numPages: action.payload.numPages
      }
    }
    default: return state
  }
}