const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const totalSpan = document.getElementById('total');
const completedSpan = document.getElementById('completed');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    emptyState.style.display = todos.length === 0 ? 'block' : 'none';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo(${index})"></div>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        todoList.appendChild(li);
    });
    
    updateStats();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function updateStats() {
    totalSpan.textContent = todos.length;
    completedSpan.textContent = todos.filter(t => t.completed).length;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Events
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initial render
renderTodos();
