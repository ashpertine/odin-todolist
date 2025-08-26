import { taskList } from "../logic/init.js";
import { saveState } from "../logic/state.js";
import closeIcon from "../assets/icons/close.svg";

class TaskCardSkeleton {
  constructor() {
    this.cardBox = document.createElement("div");
    this.cardHeader = document.createElement("h4");

    this.cardDetailsDiv = document.createElement("div");
    this.cardDetailsUl = document.createElement("ul");

    this.inputDiv = document.createElement("div");

    this.cardBox.classList.add("task-card");
    this.cardHeader.classList.add("card-header");

    this.cardDetailsDiv.classList.add("card-details");
    this.inputDiv.classList.add("input-div");
  }
}

class TaskCardContent {
  constructor() {
    this.cardDesc = document.createElement("h4");
    this.completeCheck = document.createElement("input");
    this.deleteBtn = document.createElement("button");
    this.deleteBtnIcon = document.createElement("img");
    this.cardDetails = {
      priority: document.createElement("li"),
      dueDate: document.createElement("li"),
    };

    this.cardDesc.classList.add("card-desc");
    this.completeCheck.classList.add("complete-check");
    this.deleteBtn.classList.add("delete-button");

    this.completeCheck.setAttribute("type", "checkbox");
  }

  adjustDeleteBtnIcon(icon_src, width, height) {
    this.deleteBtnIcon.src = icon_src;
    this.deleteBtnIcon.width = width;
    this.deleteBtnIcon.height = height;
  }

  attachEventListeners() {
    this.completeCheck.addEventListener("change", function () {
      const id = this.parentElement.id;
      taskList.listArr.forEach((task) => {
        if (task.id == id) {
          if (this.checked) {
            task.is_completed = true;
            saveState(taskList);
          } else {
            task.is_completed = false;
            saveState(taskList);
          }
        }
      });
    });

    this.deleteBtn.addEventListener("click", function () {
      const id = this.parentElement.id;
      taskList.listArr.forEach((task) => {
        if (task.id == id) {
          taskList.deleteTask(task);
          saveState(taskList);

          const elements = document.getElementsByClassName(id);
          while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
          }
        }
      });
    });
  }
}

const addTaskCard = (info_obj) => {
  const taskCardSkeleton = new TaskCardSkeleton();
  const taskCardContent = new TaskCardContent();
  const taskContainer = document.querySelector(".task-container");

  taskCardSkeleton.inputDiv.id = info_obj.id;
  taskCardSkeleton.cardBox.classList.add(info_obj.id);

  if (info_obj.is_completed) {
    taskCardContent.completeCheck.checked = true;
  }

  taskCardContent.adjustDeleteBtnIcon(closeIcon, 20, 20);

  //fill in information
  taskCardContent.cardDesc.innerText = `${info_obj.title}`;
  taskCardContent.cardDetails.priority.innerText = `Priority: ${info_obj.priority}/10`;
  taskCardContent.cardDetails.dueDate.innerText = `Due Date: ${info_obj.due_date} `;

  taskCardSkeleton.cardHeader.append(taskCardContent.cardDesc);
  taskCardSkeleton.cardHeader.append(taskCardSkeleton.inputDiv);

  taskCardSkeleton.inputDiv.append(taskCardContent.completeCheck);
  taskCardSkeleton.inputDiv.append(taskCardContent.deleteBtn);
  taskCardContent.deleteBtn.append(taskCardContent.deleteBtnIcon);

  taskCardSkeleton.cardDetailsDiv.append(taskCardSkeleton.cardDetailsUl);
  taskCardSkeleton.cardDetailsUl.append(taskCardContent.cardDetails.priority);
  taskCardSkeleton.cardDetailsUl.append(taskCardContent.cardDetails.dueDate);

  taskCardSkeleton.cardBox.append(taskCardSkeleton.cardHeader);
  taskCardSkeleton.cardBox.append(taskCardSkeleton.cardDetailsDiv);

  taskContainer.append(taskCardSkeleton.cardBox);
  taskCardContent.attachEventListeners(taskList);
};

const populateTasks = (list_arr) => {
  const taskContainer = document.querySelector(".task-container");
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.lastChild);
  }

  list_arr.forEach((task) => {
    addTaskCard(task);
  });
};

export { addTaskCard, populateTasks };
