import { observable, computed, action } from "mobx"

export default class TodoModel {
  @observable id
  @observable title
  @observable finished
  @observable daysToComplete

  constructor(id, title, daysToComplete) {
    this.id = id
    this.title = title
    this.finished = false
    this.daysToComplete = daysToComplete
  }

  @action
  toggleFinished() {
    this.finished = !this.finished
    return this.finished
  }

  @action
  changeDaysToComplete(daysToComplete) {
    this.daysToComplete = daysToComplete
  }
}
