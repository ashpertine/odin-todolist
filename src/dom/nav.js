import { populateTasks } from "./cards.js";
import { taskList } from "../logic/init.js";

class Header {
  constructor() {
    this.header = document.querySelector("#filter");
    this.projectHeader = document.querySelector("#current-project");
  }
}

class AllTasksFilter extends Header {
  constructor() {
    super();
    this.filter = document.querySelector("#all-tasks");
  }

  show(list_arr) {
    this.header.innerText = "All Tasks";
    populateTasks(list_arr);
  }
}

class UpcomingFilter extends Header {
  constructor() {
    super();
    this.filter = document.querySelector("#upcoming");
  }

  show(list_arr) {
    this.header.innerText = "Upcoming";
    let currentList = list_arr;
    let currentDate = new Date();
    const upcomingList = currentList.filter((task) => {
      let dueDate = new Date(task.due_date);
      if (dueDate >= currentDate) {
        return task;
      }
    });
    populateTasks(upcomingList);
  }
}

class CompletedFilter extends Header {
  constructor() {
    super();
    this.filter = document.querySelector("#completed");
  }

  show(list_arr) {
    this.header.innerText = "Completed";
    let currentList = list_arr;
    const completedList = currentList.filter((task) => {
      return task.is_completed;
    });

    populateTasks(completedList);
  }
}

class ProjectTab extends Header {
  constructor() {
    super();
    this.tab = document.querySelector(".projects");
  }

  show(event, list_arr, default_project) {
    let targetProjectTab = default_project;
    if (event && event.target) {
      if (!event.target.getAttribute("data-project")) {
        return list_arr;
      }
      targetProjectTab = event.target.getAttribute("data-project");
    }

    list_arr = taskList.listArr;
    console.log(list_arr);
    if (targetProjectTab != default_project) {
      list_arr = list_arr.filter((task) => {
        if (task.project == targetProjectTab) return task;
      });
    }

    this.projectHeader.innerText = `Project: ${targetProjectTab}`;
    populateTasks(list_arr);
    return list_arr;
  }
}

const startNavHandlers = (default_filter, default_project) => {
  const filters = {
    allTasks: new AllTasksFilter(),
    upcoming: new UpcomingFilter(),
    completed: new CompletedFilter(),
  };

  const projectTab = new ProjectTab();

  //default Project
  taskList.targetProjectList = [...taskList.listArr]; //All

  //default to full tasklist
  projectTab.tab.addEventListener("click", (event) => {
    taskList.targetProjectList = projectTab.show(
      event,
      taskList.targetProjectList,
      default_project,
    );
  });

  filters.allTasks.filter.addEventListener("click", () => {
    filters.allTasks.show(taskList.targetProjectList);
  });

  filters.upcoming.filter.addEventListener("click", () => {
    filters.upcoming.show(taskList.targetProjectList);
  });

  filters.completed.filter.addEventListener("click", () => {
    filters.completed.show(taskList.targetProjectList);
  });

  //show defaults
  filters[default_filter].show(taskList.targetProjectList);
  projectTab.show(undefined, taskList.targetProjectList, default_project);
};

export { startNavHandlers };
