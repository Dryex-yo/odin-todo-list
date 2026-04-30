import { Project } from './project.js';
import { Todo } from './todo.js';
import { Storage } from './storage.js';

const AppLogic = (() => {
    let projects = Storage.loadData();
    let currentProjectIndex = 0;

    const getProjects = () => projects;
    const getCurrentProject = () => projects[currentProjectIndex];
    const getCurrentProjectIndex = () => currentProjectIndex;

    const setCurrentProjectIndex = (index) => {
        currentProjectIndex = index;
    };

    const addProject = (name) => {
        if (!name) return;
        const newProject = new Project(name);
        projects.push(newProject);
        save();
    };

    // Fungsi untuk mengupdate Todo yang sudah ada
    const updateTodoInCurrent = (index, title, desc, date, priority) => {
        const project = projects[currentProjectIndex];
        const todo = project.todos[index];
        
        todo.title = title;
        todo.description = desc;
        todo.dueDate = date;
        todo.priority = priority;
        
        save();
    };

    const deleteProject = (index) => {
        if (projects.length > 1) {
            projects.splice(index, 1);
            currentProjectIndex = 0;
            save();
        } else {
            alert("Harus ada minimal satu project!");
        }
    };

    const addTodoToCurrent = (title, desc, date, priority) => {
        const newTodo = new Todo(title, desc, date, priority);
        projects[currentProjectIndex].addTodo(newTodo);
        save();
    };

    const removeTodoFromCurrent = (todoIndex) => {
        projects[currentProjectIndex].removeTodo(todoIndex);
        save();
    };

    const toggleTodoStatus = (todoIndex) => {
        projects[currentProjectIndex].todos[todoIndex].toggleComplete();
        save();
    };

    const save = () => {
        Storage.saveData(projects);
    };

    return {
        getProjects,
        getCurrentProject,
        getCurrentProjectIndex,
        setCurrentProjectIndex,
        addProject,
        updateTodoInCurrent,
        deleteProject,
        addTodoToCurrent,
        removeTodoFromCurrent,
        toggleTodoStatus
    };
})();

export default AppLogic;