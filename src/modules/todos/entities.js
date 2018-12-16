// @flow

export type TodoId = number

export type VisibilityFilter = 'ALL' | 'DONE' | 'OPEN'

export type Todo = {
  id: TodoId,
  done: boolean,
  task: string
}