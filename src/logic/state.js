const saveState = (task_list) => {
  const currentTaskList = task_list;
  localStorage.setItem("task_list", JSON.stringify(currentTaskList));
};

const restoreState = () => {
  return localStorage.getItem("task_list");
};

export { saveState, restoreState };
