import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"

import "bootstrap/dist/css/bootstrap.css"

import TodoListModel from "./models/TodoListModel"
const store = new TodoListModel()

import App from "./App"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
