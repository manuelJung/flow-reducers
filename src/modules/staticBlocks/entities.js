// @flow

export type Identifier = string

export type StaticBlock = {
  identifier: Identifier,
  content: string,
  useStory: boolean,
  story: mixed
}