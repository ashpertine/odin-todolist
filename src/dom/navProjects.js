import { taskList } from "../logic/init.js";

const addProjectToNav = (project) => {
  const projectsUl = document.querySelector(".projects");
  const projectLi = document.createElement("li");
  projectLi.innerText = project;
  projectLi.setAttribute("data-project", project);

  projectsUl.append(projectLi);
};

const populateProjects = (project_arr) => {
  const projectsUl = document.querySelector(".projects");
  while (projectsUl.firstChild) {
    projectsUl.removeChild(projectsUl.lastChild);
  }

  project_arr.forEach((project) => {
    addProjectToNav(project);
  });
};

export { populateProjects };
