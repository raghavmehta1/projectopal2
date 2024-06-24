// Simulated user data
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'guest', password: 'guest123', role: 'guest' },
];

// Simulated task data
let tasks = [
    { id: 1, title: 'Implement login system', status: 'In Progress', assignee: 'admin' },
    { id: 2, title: 'Design homepage', status: 'Todo', assignee: 'guest' },
];

let currentUser = null;

const loginSection = document.getElementById('login-section');
const taskSection = document.getElementById('task-section');
const userGreeting = document.getElementById('user-greeting');
const taskList = document.getElementById('task-list');
const adminControls = document.getElementById('admin-controls');

// Event listeners
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Simulated OPA client
function evaluatePolicy(action) {
    const input = {
        user: currentUser,
        action: action
    };

    // In a real application, this would make an HTTP request to OPA
    // For simplicity, we're implementing the policy logic directly here
    if (action === "view_tasks") {
        return currentUser.role === "admin" || currentUser.role === "guest";
    } else if (["add_task", "update_task", "delete_task"].includes(action)) {
        return currentUser.role === "admin";
    }
    return false;
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        loginSection.style.display = 'none';
        taskSection.style.display = 'block';
        userGreeting.textContent = currentUser.username;
        if (evaluatePolicy("add_task")) {
            adminControls.style.display = 'block';
        }
        renderTasks();
    } else {
        alert('Invalid credentials');
    }
}

function renderTasks() {
    if (evaluatePolicy("view_tasks")) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <span>${task.title} - Status: ${task.status} - Assignee: ${task.assignee}</span>
                ${evaluatePolicy("update_task") ? `
                    <button onclick="updateTask(${task.id})">Update</button>
                ` : ''}
                ${evaluatePolicy("delete_task") ? `
                    <button onclick="deleteTask(${task.id})">Delete</button>
                ` : ''}
            `;
            taskList.appendChild(taskElement);
        });
    } else {
        taskList.innerHTML = '<p>You do not have permission to view tasks.</p>';
    }
}

function addTask() {
    if (evaluatePolicy("add_task")) {
        const newTaskTitle = document.getElementById('new-task').value;
        if (newTaskTitle.trim()) {
            const newTask = {
                id: tasks.length + 1,
                title: newTaskTitle,
                status: 'Todo',
                assignee: currentUser.username
            };
            tasks.push(newTask);
            document.getElementById('new-task').value = '';
            renderTasks();
        }
    } else {
        alert('You do not have permission to add tasks.');
    }
}

function updateTask(id) {
    if (evaluatePolicy("update_task")) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.status = task.status === 'Todo' ? 'In Progress' : 'Completed';
            renderTasks();
        }
    } else {
        alert('You do not have permission to update tasks.');
    }
}

function deleteTask(id) {
    if (evaluatePolicy("delete_task")) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    } else {
        alert('You do not have permission to delete tasks.');
    }
}