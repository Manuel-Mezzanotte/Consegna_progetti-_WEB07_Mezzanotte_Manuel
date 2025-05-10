let tasks = [];

function showMessage(text, type = 'error') {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    
    setTimeout(() => {
        messageElement.className = 'message';
        messageElement.textContent = '';
    }, 3000);
}

function loadTasks() {
    try {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        }
    } catch (error) {
        console.error('Errore nel caricamento delle attività:', error);
        showMessage('Si è verificato un errore nel caricamento delle attività.');
    }
}

function saveTasks() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Errore nel salvataggio delle attività:', error);
        showMessage('Si è verificato un errore nel salvataggio delle attività.');
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const newTask = {
            id: Date.now(), 
            text: taskText
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        
        taskInput.value = '';
        
        showMessage('Attività aggiunta con successo!', 'success');
    } else {
        showMessage('Inserisci un testo per l\'attività.');
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    
    saveTasks();
    
    renderTasks();
    
    showMessage('Attività eliminata con successo!', 'success');
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        
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
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    renderTasks();
});