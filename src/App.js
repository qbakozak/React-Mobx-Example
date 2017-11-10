import React, { Component } from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"
import DevTools from "mobx-react-devtools"

import { Container } from "reactstrap"

import TodoList from "./components/TodoList"

import "./styles/styles.css"

@observer
class App extends Component {
  render() {
    return (
      <Container>
        <h4 className="display-4">Simple Todo List</h4>

        <TodoList />

        <DevTools highlightTimeout={2000} />
      </Container>
    )
  }
}

export default App
