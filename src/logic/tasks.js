import { saveState } from "./state.js";

class Task {
  constructor(title, priority, due_date) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.priority = priority;
    this.due_date = due_date;
    this.is_completed = false;
  }

  makeComplete() {
    this.is_completed = true;
  }
}

class TaskList {
  constructor() {
    this.listArr = [];
  }

  get list() {
    return this.listArr;
  }

  addNewTask(task_obj) {
    this.listArr.push(task_obj);
  }

  deleteTask(task_obj) {
    this.listArr = this.listArr.filter((task) => {
      if (task.id != task_obj.id) return task;
    });
    console.log("task deleted");
  }
}

export { Task, TaskList };
