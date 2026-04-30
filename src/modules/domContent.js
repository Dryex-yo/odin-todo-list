import { format } from 'date-fns';

export const DOM = {
    renderProjects(projects, loadProjectFn, currentIndex) {
        const sidebar = document.getElementById("project-list");
        sidebar.innerHTML = "";
        
        projects.forEach((proj, index) => {
            const btn = document.createElement("button");
            btn.textContent = proj.name;
            
            if (index === currentIndex) {
                btn.classList.add("active");
            }
            
            btn.onclick = () => loadProjectFn(index);
            sidebar.appendChild(btn);
        });
    },

    renderTodos(project, deleteTodoFn, toggleTodoFn, editTodoFn) {
        const container = document.getElementById("todo-container");
        container.innerHTML = `<h2>Project: ${project.name}</h2>`;
        
        const listWrapper = document.createElement("div");
        listWrapper.className = "todo-list";

        project.todos.forEach((todo, index) => {
            const div = document.createElement("div");
            div.className = `todo-item priority-${todo.priority}`;
            
            // Format tanggal agar lebih mudah dibaca (Opsional: membutuhkan date-fns)
            let displayDate = todo.dueDate;
            try {
                displayDate = format(new Date(todo.dueDate), 'dd MMM yyyy');
            } catch (e) {
                displayDate = todo.dueDate;
            }

            div.innerHTML = `
                <div class="todo-main" style="display: flex; align-items: center; gap: 10px; width: 100%;">
                    <input type="checkbox" ${todo.checklist ? "checked" : ""}>
                    <div class="todo-clickable-area" style="flex: 1; cursor: pointer;">
                        <span class="todo-title ${todo.checklist ? 'completed' : ''}" style="font-weight: bold;">
                            ${todo.title}
                        </span>
                        <span class="todo-date" style="margin-left: 10px; color: #666; font-size: 0.9rem;">
                            (${displayDate})
                        </span>
                    </div>
                    <div class="todo-actions">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </div>
                <div class="todo-details" style="display: none; padding: 10px; background: #f9f9f9; border-radius: 5px; margin-top: 10px; border-left: 3px solid #ddd;">
                    <p><strong>Description:</strong> ${todo.description || 'No description provided.'}</p>
                </div>
            `;
            
            // Expand detail saat judul atau area judul diklik
            div.querySelector(".todo-clickable-area").onclick = () => {
                const details = div.querySelector(".todo-details");
                details.style.display = details.style.display === "none" ? "block" : "none";
            };

            div.querySelector("input").onchange = () => toggleTodoFn(index);

            div.querySelector(".delete-btn").onclick = (e) => {
                e.stopPropagation();
                deleteTodoFn(index);
            };

            div.querySelector(".edit-btn").onclick = (e) => {
                e.stopPropagation();
                editTodoFn(index, todo);
            };

            listWrapper.appendChild(div);
        });
        
        container.appendChild(listWrapper);
    }
};