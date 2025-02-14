import { makeTodo, makeProject, addTodoToProject, updateTodo, projects, removeTodo } from "./projectsLogic.js";
// import "./main.css";
// import "./add-task.css";
// import "./projectsStyle.css";
// import "./add-project.css"
import { navButtonHandler } from "./nav.js";
import { addTask, ScreenController, addProject } from "./UI.js";
console.log("Hello");
console.log("Before saving:", projects.getProjects());
projects.loadStorage();
console.log("After loading:", projects.getProjects());

console.log(projects.getProjects().projects[1]);

navButtonHandler();
addTask();
addProject();
ScreenController();