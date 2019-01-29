// @flow

export type Identifier = string

export type StaticBlock = {
  identifier: Identifier,
  title: string,
  enabled: boolean,
  content: string,
  _id: string,
  contentType: string,
  createdAt: string,
  updatedAt: string,
  parentId: string,
  objectID: string,
  useStory: boolean,
  story: mixed
}