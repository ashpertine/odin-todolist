import { populateTasks } from "./cards.js";
import { Task } from "../logic/tasks.js";
import { taskList } from "../logic/init.js";
import { saveState } from "../logic/state.js";

class TaskDialog {
  constructor(showDialogButton, dialogSelector) {
    this.showDialogButton = document.querySelector(showDialogButton);
    this.dialog = document.querySelector(dialogSelector);

    this.inputObj = {
      titleInput: this.dialog.querySelector("#title"),
      priorityInput: this.dialog.querySelector("#priority"),
      dueDateInput: this.dialog.querySelector("#due-date"),
    };

    this.closeButton = this.dialog.querySelector("#close-dialog");
    this.addTaskButton = this.dialog.querySelector("#add-task");
  }

  attachEventHandlers() {
    this.showDialogButton.addEventListener("click", () => this.show());
    this.closeButton.addEventListener("click", () => this.close());

    this.inputObj.titleInput.addEventListener("click", () =>
      this.inputObj.titleInput.classList.remove("missing-input"),
    );
    this.inputObj.dueDateInput.addEventListener("click", () =>
      this.inputObj.dueDateInput.classList.remove("missing-input"),
    );

    this.addTaskButton.addEventListener("click", () => {
      const keysWithMissingVal = TaskDialogValidator.getMissingKeys(
        this.inputs,
      );
      if (keysWithMissingVal.length > 0) {
        TaskDialogValidator.highlightMissing(keysWithMissingVal, this.inputObj);
      } else {
        //add task to backend first before updating dom
        const task = new Task(
          this.inputs.title,
          this.inputs.priority,
          this.inputs.due_date,
        );

        taskList.addNewTask(task);
        saveState(taskList);
        populateTasks(taskList.list);
        return this.dialog.close();
      }
    });
  }

  resetInputs() {
    this.inputObj.titleInput.value = "";
    this.inputObj.titleInput.classList.remove("missing-input");

    this.inputObj.priorityInput.value = 5;
    this.inputObj.dueDateInput.value = "";

    this.inputObj.dueDateInput.classList.remove("missing-input");
  }

  show() {
    this.resetInputs();
    this.dialog.showModal();
  }

  close() {
    this.resetInputs();
    this.dialog.close();
  }

  get inputs() {
    let infoObj = {
      title: this.inputObj.titleInput.value,
      priority: this.inputObj.priorityInput.value,
      due_date: this.inputObj.dueDateInput.value,
    };
    return infoObj;
  }
}

class TaskDialogValidator {
  static highlightMissing(arr, input_obj) {
    //convert to camelcase + Input
    try {
      arr = arr.map((word) => {
        word = word + "Input";
        return word.replace(/([-_][a-z])/gi, ($1) => {
          return $1.toUpperCase().replace("-", "").replace("_", "");
        });
      });
    } catch (error) {
      throw new Error("Missing keys array contains invalid string format");
    }

    arr.forEach((input) => {
      input_obj[input].classList.add("missing-input");
    });
  }

  static getMissingKeys(info_obj) {
    let keysWithMissingVal = [];
    for (let [key, value] of Object.entries(info_obj)) {
      if (value == "") keysWithMissingVal.push(key);
    }
    return keysWithMissingVal;
  }
}

export { TaskDialog, TaskDialogValidator };
