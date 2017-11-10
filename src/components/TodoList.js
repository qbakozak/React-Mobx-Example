import React, { Component } from "react"
import { observer, inject } from "mobx-react"
import { observable, action } from "mobx"

import Todo from "./Todo"

@inject("store")
@observer
export default class TodoList extends Component {
  @observable newTodoTitle = ""
  @observable daysToComplete = 0
  @observable
  alert = {
    show: false,
    type: "",
    message: ""
  }

  addTodo() {
    const result = this.props.store.addTodo(
      this.newTodoTitle.value,
      this.daysToComplete.value
    )

    if (result.status) {
      this.newTodoTitle.value = ""
      this.daysToComplete.value = ""
    } else {
      this.showAlert(result.type, result.message)
    }
  }

  showAlert(type, message) {
    this.alert = {
      show: true,
      type,
      message
    }
  }

  hideAlert() {
    this.alert = {
      show: false,
      type: "",
      message: ""
    }
  }

  render() {
    const { store } = this.props

    return (
      <div>
        {this.alert.show && (
          <div className={`alert alert-${this.alert.type} show`} role="alert">
            {this.alert.message}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => this.hideAlert()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              ref={title => (this.newTodoTitle = title)}
              placeholder="Task to do..."
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              ref={days => (this.daysToComplete = days)}
              placeholder="Days..."
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary btn-sm"
              onClick={this.addTodo.bind(this)}
            >
              Add new task...
            </button>
          </div>
        </div>

        <hr />

        <ul className="list-group">
          <li className="list-group-item list-group-item-primary">
            <b>Current Tasks</b>
          </li>
          {store.currentTodos.length === 0 && (
            <li className="list-group-item disabled">No current todos</li>
          )}
          {store.currentTodos.map((todo, i) => {
            return (
              <Todo key={i} todo={todo} showAlert={this.showAlert.bind(this)} />
            )
          })}
        </ul>

        <hr />

        <ul className="list-group">
          <li className="list-group-item list-group-item-success">
            <b>Completed Tasks</b>
          </li>
          {store.completedTodos.length === 0 && (
            <li className="list-group-item disabled">No completed todos</li>
          )}
          {store.completedTodos.map((todo, i) => {
            return (
              <Todo key={i} todo={todo} showAlert={this.showAlert.bind(this)} />
            )
          })}
        </ul>
      </div>
    )
  }
}
