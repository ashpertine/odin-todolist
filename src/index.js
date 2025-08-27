import "./styles.css";
import { TaskDialog } from "./dom/taskDialog.js";
import { ProjectDialog } from "./dom/projectDialog.js";
import { populateTasks } from "./dom/cards.js";
import { populateProjects } from "./dom/navProjects.js";
import { taskList } from "./logic/init.js";
import { startNavHandlers } from "./dom/nav.js";

const startApp = (function () {
  const taskDialog = new TaskDialog(
    "#show-add-task-dialog",
    "#add-task-dialog",
  );

  const projectDialog = new ProjectDialog(
    "#show-add-project-dialog",
    "#add-project-dialog",
  );

  taskDialog.attachEventHandlers();
  projectDialog.attachEventHandlers();
  populateTasks(taskList.listArr);
  populateProjects(taskList.projectArr);
  startNavHandlers("allTasks", "All");
})();
