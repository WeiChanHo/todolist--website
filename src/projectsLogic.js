import { parseJSON } from "date-fns";

const makeTodo = (title, description = "none", dueDate, priority) => {
    return { title, description, dueDate, priority, };
};


const makeProject = (name) => {
    let myTodos = [];

    return { name, myTodos };
}

const removeTodo = (project, todoToRemove) => {
    project.myTodos = project.myTodos.filter((todo) => {
        if (todoToRemove === todo)
            return false;
        return true;
    })
    projects.populateStorage()
}

const addTodoToProject = (project, todo) => {
    project.myTodos.push(todo);
    projects.populateStorage();
}

const projects = (() => {
    let projects = [];

    const updateProjects = (project) => {
        projects.push(project);
        populateStorage();
    };
    const changeProjectName = (project, newName) => {
        let index = projects.indexOf(project);
        projects[index].name = newName;
    }
    const getProjects = () => {
        return { projects }
    }
    const removeProject = (projectToRemove) => {
        projects = projects.filter((project) => {
            if (projectToRemove === project)
                return false;
            return true;
        })
        populateStorage();
    }
    const populateStorage = () => {
        localStorage.setItem("projects", JSON.stringify(projects));
        console.log(JSON.parse(localStorage.getItem('projects')));
    }
    const initializeLocalStorage = ()=> {
        if (!localStorage.getItem('projects')){
            const homeProject = makeProject("Home");
            const firstTodo = makeTodo("Start using the app.","",new Date(),"4");

            addTodoToProject(homeProject, firstTodo);
            updateProjects(homeProject);
            populateStorage();
        }
    }
    const loadStorage = () => {
        const savedProjects = localStorage.getItem("projects");
        if(savedProjects)
        projects = JSON.parse(savedProjects);
    }

    return { updateProjects, getProjects, removeProject, changeProjectName, populateStorage, loadStorage, initializeLocalStorage };
})();
projects.initializeLocalStorage();


const updateTodo = (todo) => {
    const changeTodoPriority = (newPriority) => {
        todo.priority = newPriority;
    }

    const changeTodoTitle = (newTitle) => {
        todo.title = newTitle;
    }

    const changeTodoDescription = (newDescription) => {
        todo.description = newDescription;
    }

    const changeTodoDueDate = (newDate) => {
        todo.dueDate = newDate;
    }

    return {
        changeTodoTitle,
        changeTodoDescription,
        changeTodoDueDate,
        changeTodoPriority,
    };
};
export { makeTodo, makeProject, addTodoToProject, updateTodo, removeTodo, projects };