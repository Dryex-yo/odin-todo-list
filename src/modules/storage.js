import { Project } from './project.js';
import { Todo } from './todo.js';

export const Storage = {
    saveData(projects) {
        localStorage.setItem('todoProjects', JSON.stringify(projects));
    },

    loadData() {
        const data = JSON.parse(localStorage.getItem('todoProjects'));
        if (!data) return [new Project("Default")];

        // Mengembalikan methods yang hilang setelah JSON.parse
        return data.map(projData => {
            const project = new Project(projData.name);
            project.todos = projData.todos.map(t => 
                new Todo(t.title, t.description, t.dueDate, t.priority, t.notes, t.checklist)
            );
            return project;
        });
    }
};