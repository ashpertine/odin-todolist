import { saveState } from "./state.js";

class Task {
  constructor(title, priority, due_date, project) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.priority = priority;
    this.due_date = due_date;
    this.project = project;
    this.is_completed = false;
  }

  makeComplete() {
    this.is_completed = true;
  }
}

class TaskList {
  constructor() {
    this.listArr = [];
    this.projectArr = ["All", "Default"];
    this.targetProjectList = []; //Dynamic List controlled by Nav
  }

  addNewTask(task_obj) {
    this.listArr.push(task_obj);
    const currentProject = this.targetProjectList[0].project;
    if (task_obj.project === currentProject) {
      this.targetProjectList.push(task_obj);
    }
  }

  addNewProject(project) {
    this.projectArr.push(project);
  }

  deleteTask(task_obj) {
    this.listArr = this.listArr.filter((task) => {
      if (task.id != task_obj.id) return task;
    });

    this.targetProjectList = this.targetProjectList.filter((task) => {
      if (task.id != task_obj.id) return task;
    });
    console.log("task deleted");
  }
}

export { Task, TaskList };
