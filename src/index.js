import "./styles.css";
import { TaskDialog } from "./dom/taskDialog.js";
import { populateTasks } from "./dom/cards.js";
import { taskList } from "./logic/init.js";
import { startNavHandlers } from "./dom/nav.js";

const startApp = (function () {
  const taskDialog = new TaskDialog(
    ".show-add-task-dialog",
    ".add-task-dialog",
  );
  taskDialog.attachEventHandlers();
  populateTasks(taskList.list);
  startNavHandlers("allTasks");
})();
