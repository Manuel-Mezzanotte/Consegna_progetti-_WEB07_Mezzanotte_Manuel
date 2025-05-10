let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const newTask = {
            id: Date.now(), 
            text: taskText
        };
        
        tasks.push(newTask);
        
        renderTasks();
        
        taskInput.value = '';
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">Elimina</button>
        `;
        taskList.appendChild(taskItem);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.getAttribute('data-id'));
            deleteTask(taskId);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    renderTasks();
});