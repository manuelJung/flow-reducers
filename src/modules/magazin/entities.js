// @flow

export type ArticleIdentifier = string

export type ListIdentifier = string

export type MagazinArticle = {
  urlKey: ArticleIdentifier,
  title: string,
  breadcrumbTitle: string,
  category: string,
  teaser: string,
  sideCategories: string,
  body: string,
  teaserImageUrl: string,
  excludeFromSitemap: string,
  author: string,
  featuredInDropdownMenu: string,
  featuredOnHomepage: string,
  sponsoredArticle: boolean,
  relatedProducts: string,
  relatedMagazinArticles: string[],
  metaDescription: string,
  keyKeywords: string,
  test: string,
  name: string,
  categoryName: string,
  categoryUrlKey: string,
  _id: string,
  contentType: string,
  createdAt: string,
  updatedAt: string,
  parentId: string,
  objectID: string,
  useStory: boolean,
  story: mixed
}

export type ListingMagazinArticle = MagazinArticle

export type ListingFilters = {
  category?: string,
  filterIds?: string[],
  page?:number
}