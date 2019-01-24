// @flow

export type UrlKey = string

export type Page = {
  title: string,
  urlKey: UrlKey,
  metaDescription: string,
  story: Object,
  useStory: boolean,
  authors: mixed[],
  authorsUrlKey: string[],
  objectID: string
}