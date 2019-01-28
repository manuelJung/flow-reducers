// @flow

export type Pagination = {
  currPage: number,
  numPages: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  pages: number[]
}

export type Request<Data> = 
  {| isFeching: false, fetchError: null, data: null, shouldFetch: true |} 
| {| isFeching: true, fetchError: null, data: null, shouldFetch: false |} 
| {| isFeching: true, fetchError: null, data: Data, shouldFetch: false |} 
| {| isFeching: false, fetchError: string, data: null, shouldFetch: false |} 
| {| isFeching: false, fetchError: null, data: Data, shouldFetch: false |} 
| {| isFeching: false, fetchError: string, data: Data, shouldFetch: false |}
