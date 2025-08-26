import { populateTasks } from "./cards.js";
import { taskList } from "../logic/init.js";

class Header {
  constructor() {
    this.header = document.querySelector("h2");
  }
}

class AllTasksTab extends Header {
  constructor() {
    super();
    this.tab = document.querySelector("#all-tasks");
  }
  show() {
    this.header.innerText = "All Tasks";
    populateTasks(taskList.list);
  }

  attachEventListeners() {
    this.tab.addEventListener("click", () => {
      this.show();
    });
  }
}

class UpcomingTab extends Header {
  constructor() {
    super();
    this.tab = document.querySelector("#upcoming");
  }

  show() {
    this.header.innerText = "Upcoming";
    let currentList = taskList.list;
    let currentDate = new Date();
    const upcomingList = currentList.filter((task) => {
      let dueDate = new Date(task.due_date);
      if (dueDate >= currentDate) {
        return task;
      }
    });

    populateTasks(upcomingList);
  }

  attachEventListeners() {
    this.tab.addEventListener("click", () => {
      this.show();
    });
  }
}

class CompletedTab extends Header {
  constructor() {
    super();
    this.tab = document.querySelector("#completed");
  }

  show() {
    this.header.innerText = "Completed";
    let currentList = taskList.list;
    const completedList = currentList.filter((task) => {
      return task.is_completed;
    });

    populateTasks(completedList);
  }

  attachEventListeners() {
    this.tab.addEventListener("click", () => {
      this.show();
    });
  }
}

const startNavHandlers = (default_tab) => {
  const allTasksTab = new AllTasksTab();
  const upcomingTab = new UpcomingTab();
  const completedTab = new CompletedTab();

  allTasksTab.attachEventListeners();
  upcomingTab.attachEventListeners();
  completedTab.attachEventListeners();

  const tabs = {
    allTasks: allTasksTab,
    upcoming: upcomingTab,
    completed: completedTab,
  };

  tabs[default_tab].show();
};

export { startNavHandlers };
