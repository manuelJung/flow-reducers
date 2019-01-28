// @flow

export type Identifier = string

export type Page = {
  title: string,
  urlKey: Identifier,
  metaDescription: string,
  story: Object,
  useStory: boolean,
  authors: mixed[],
  authorsUrlKey: string[],
  objectID: string,
  body: mixed,
  bodyOverflow: mixed
}