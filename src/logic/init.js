import { TaskList } from "./tasks.js";
import { restoreState } from "./state.js";

function startTaskList() {
  const currentState = JSON.parse(restoreState());
  if (currentState == null || currentState == undefined) {
    return new TaskList();
  } else {
    //rehydrate the restored object with the prototype
    const restoredTaskList = Object.assign(new TaskList(), currentState);
    return restoredTaskList;
  }
}

let taskList = startTaskList();
export { taskList };
