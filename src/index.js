import './style.css';
import AppLogic from './modules/appLogic.js';
import { DOM } from './modules/domContent.js';

/**
 * ELEMEN GLOBAL
 */
const todoModal = document.getElementById("todo-modal");
const todoForm = document.getElementById("todo-form");
const closeModalBtn = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");

// State untuk melacak apakah sedang Edit atau Tambah baru
let isEditMode = false;
let editIndex = null;

/**
 * FUNGSI UTAMA UI
 */
function updateUI() {
    const projects = AppLogic.getProjects();
    const currentProject = AppLogic.getCurrentProject();
    const currentIndex = AppLogic.getCurrentProjectIndex(); 

    // Render daftar proyek di sidebar
    DOM.renderProjects(projects, (index) => {
        AppLogic.setCurrentProjectIndex(index);
        updateUI();
    }, currentIndex);

    // Render daftar todo (mengirimkan 4 callback: delete, toggle, dan edit)
    DOM.renderTodos(currentProject, handleDeleteTodo, handleToggleTodo, handleEditTodo);
}

/**
 * HANDLER INTERAKSI TODO
 */

// Menangani klik tombol Edit
function handleEditTodo(index, todo) {
    isEditMode = true;
    editIndex = index;
    
    // Ubah tampilan modal menjadi mode Edit
    if (modalTitle) modalTitle.textContent = "Edit Task";
    
    // Isi field form dengan data yang sudah ada
    document.getElementById("form-title").value = todo.title;
    document.getElementById("form-desc").value = todo.description || "";
    document.getElementById("form-date").value = todo.dueDate;
    document.getElementById("form-priority").value = todo.priority;
    
    todoModal.style.display = "flex";
}

// Menangani penghapusan Todo
function handleDeleteTodo(index) {
    if (confirm("Hapus tugas ini?")) {
        AppLogic.removeTodoFromCurrent(index);
        updateUI();
    }
}

// Menangani perubahan status checklist
function handleToggleTodo(index) {
    AppLogic.toggleTodoStatus(index);
    updateUI();
}

/**
 * EVENT LISTENERS
 */

// Tambah Project Baru
document.getElementById("add-project-btn").onclick = () => {
    const name = prompt("Nama Project Baru:");
    if (name && name.trim() !== "") {
        AppLogic.addProject(name.trim());
        updateUI();
    }
};

// Buka Modal untuk Tambah Todo Baru
document.getElementById("add-todo-btn").onclick = () => {
    isEditMode = false;
    editIndex = null;
    
    if (modalTitle) modalTitle.textContent = "Add New Task";
    
    todoForm.reset();
    // Set default tanggal ke hari ini
    document.getElementById("form-date").value = new Date().toISOString().split('T')[0];
    
    todoModal.style.display = "flex";
};

// Tutup Modal
closeModalBtn.onclick = () => {
    todoModal.style.display = "none";
    todoForm.reset();
};

// Submit Form (Logika ganda: Create atau Update)
todoForm.onsubmit = (e) => {
    e.preventDefault();
    
    const title = document.getElementById("form-title").value;
    const desc = document.getElementById("form-desc").value;
    const date = document.getElementById("form-date").value;
    const priority = document.getElementById("form-priority").value;

    if (isEditMode) {
        AppLogic.updateTodoInCurrent(editIndex, title, desc, date, priority);
    } else {
        AppLogic.addTodoToCurrent(title, desc, date, priority);
    }

    todoModal.style.display = "none";
    todoForm.reset();
    updateUI();
};

// Tutup modal jika user mengklik area gelap di luar form
window.onclick = (event) => {
    if (event.target == todoModal) {
        todoModal.style.display = "none";
        todoForm.reset();
    }
};

/**
 * INITIALIZE APP
 */
updateUI();