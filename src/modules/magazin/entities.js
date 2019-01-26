// @flow

export type UrlKey = string

export type ListingKey = string

export type MagazinArticle = {
  urlKey: UrlKey
}

export type ListingMagazinArticle = {
  urlKey: UrlKey
}

export type ListingFilters = {
  category?: string,
  filterIds?: string[],
  page?:number
}