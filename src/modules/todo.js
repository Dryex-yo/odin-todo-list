export class Todo {
    constructor(title, description, dueDate, priority, notes = "", checklist = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    toggleComplete() {
        this.checklist = !this.checklist;
    }
}