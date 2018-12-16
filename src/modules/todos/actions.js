// @flow
import * as at from './const'

import type {Todo, TodoId} from './entities'

export type AddTodoAction = {
  type: typeof at.ADD_TODO,
  payload: Todo
}

export type RemoveTodoAction = {
  type: typeof at.REMOVE_TODO,
  meta: {id: TodoId}
}

export type ToggleTodoAction = {
  type: typeof at.TOGGLE_TODO,
  meta: {id: TodoId}
}

export type Action = AddTodoAction | RemoveTodoAction | ToggleTodoAction

let todoId = 1
export const addTodo = (task:string):AddTodoAction => ({
  type: at.ADD_TODO,
  payload: {
    id: todoId++,
    done: false,
    task: task
  }
})

export const removeTodo = (id:TodoId):RemoveTodoAction => ({
  type: at.REMOVE_TODO,
  meta: {id}
})

export const toggleTodo = (id:TodoId):ToggleTodoAction => ({
  type: at.TOGGLE_TODO,
  meta: {id}
})