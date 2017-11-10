import React, { Component } from "react"
import { observer, inject } from "mobx-react"

@inject("store")
@observer
export default class Todo extends Component {
  toggleFinished() {
    const { todo, showAlert } = this.props
    const action = todo.toggleFinished()

    if (action) showAlert("success", `Todo '${todo.title}' is now completed...`)
    else showAlert("info", `Todo '${todo.title}' is current again...`)
  }

  removeTodo() {
    const { todo, store, showAlert } = this.props
    const action = store.removeTodo(todo.id)

    if (action) showAlert("success", `Task '${todo.title}' has been removed...`)
    else showAlert("error", `Error removing '${todo.title}' todo...`)
  }

  render() {
    const { todo } = this.props

    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {todo.title}
        <span>
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => this.toggleFinished()}
          >
            finish
          </button>{" "}
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => this.removeTodo()}
          >
            remove
          </button>{" "}
          <button type="button" className="btn btn-info btn-sm disabled">
            {todo.daysToComplete} days
          </button>
        </span>
      </li>
    )
  }
}
