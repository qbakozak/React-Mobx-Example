import { observable, computed, action } from "mobx"
import _ from "lodash"

import TodoModel from "./TodoModel"

export default class TodoListModel {
  @observable todos = []
  id = 0

  constructor() {
    this.addTodo("Go to the gym and lift 300kg 20 times", 28)
    this.addTodo("Get my cat to the hairdresser", 2)
    this.addTodo("Find out why moon is not made of cheese", 10)
    this.addTodo("Talk to Sebastian about the trip to the vulcano", 14)
  }

  @computed
  get completedTodos() {
    return this.todos.filter(todo => todo.finished === true)
  }

  @computed
  get currentTodos() {
    return this.todos.filter(todo => todo.finished === false)
  }

  @action
  addTodo(title, daysToComplete) {
    if (!title || !daysToComplete)
      return {
        status: false,
        type: "warning",
        message: "Some of the fileds are empty!"
      }

    const index = _.findIndex(this.todos, { title })
    if (index === -1) {
      this.todos.push(new TodoModel(this.id, title, daysToComplete))
      this.id++
      return {
        status: true,
        type: "success",
        message: "Task has been added successfuly"
      }
    } else {
      return { status: false, type: "danger", message: "Task already exists!" }
    }
  }

  @action
  removeTodo(id) {
    this.todos = this.todos.filter(todo => {
      return id !== todo.id
    })

    return true
  }
}
