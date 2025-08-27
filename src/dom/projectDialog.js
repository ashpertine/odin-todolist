import { taskList } from "../logic/init.js";
import { saveState } from "../logic/state.js";
import { populateProjects } from "./navProjects.js";

class ProjectDialog {
  constructor(showDialogButton, dialogSelector) {
    this.showDialogButton = document.querySelector(showDialogButton);
    this.dialog = document.querySelector(dialogSelector);
    this.titleInput = this.dialog.querySelector("#project-title");

    this.closeButton = this.dialog.querySelector(".close-dialog");
    this.addProjectButton = this.dialog.querySelector("#add-project");
  }

  attachEventHandlers() {
    this.showDialogButton.addEventListener("click", () => this.show());
    this.closeButton.addEventListener("click", () => this.close());
    this.addProjectButton.addEventListener("click", () => {
      if (this.titleInput.value.length == 0) {
        return this.titleInput.classList.add("missing-input");
      }

      taskList.addNewProject(this.titleInput.value);
      populateProjects(taskList.projectArr);
      saveState(taskList);
      this.close();
    });
  }

  show() {
    this.resetInputs();
    this.dialog.showModal();
  }

  close() {
    this.resetInputs();
    this.dialog.close();
  }

  resetInputs() {
    this.titleInput.value = "";
    this.titleInput.classList.remove("missing-input");
  }
}

export { ProjectDialog };
