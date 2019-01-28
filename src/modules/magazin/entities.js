// @flow

export type ArticleIdentifier = string

export type ListIdentifier = string

export type MagazinArticle = {
  urlKey: ArticleIdentifier
}

export type ListingMagazinArticle = {
  urlKey: string
}

export type ListingFilters = {
  category?: string,
  filterIds?: string[],
  page?:number
}