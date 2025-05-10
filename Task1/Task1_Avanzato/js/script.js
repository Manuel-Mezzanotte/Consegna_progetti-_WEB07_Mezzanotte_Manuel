let tasks = [];
let currentEditId = null;

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
            text: taskText,
            status: 'to-do'
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

function openEditModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    currentEditId = taskId;
    
    document.getElementById('editTaskInput').value = task.text;
    document.getElementById('editStatusSelect').value = task.status;
    
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditId = null;
}

function saveEditedTask() {
    if (currentEditId === null) return;
    
    const editedText = document.getElementById('editTaskInput').value.trim();
    const editedStatus = document.getElementById('editStatusSelect').value;
    
    if (editedText === '') {
        showMessage('Il testo dell\'attività non può essere vuoto');
        return;
    }
    
    const taskIndex = tasks.findIndex(t => t.id === currentEditId);
    if (taskIndex !== -1) {
        tasks[taskIndex].text = editedText;
        tasks[taskIndex].status = editedStatus;
        
        saveTasks();
        renderTasks();
        closeEditModal();
        
        showMessage('Attività aggiornata con successo!', 'success');
    }
}

function searchTasks() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    renderTasks(searchText);
}

function getStatusLabel(status) {
    const statusLabels = {
        'to-do': 'Da fare',
        'in-progress': 'In corso',
        'completed': 'Completata'
    };
    return statusLabels[status] || status;
}

function renderTasks(searchText = '') {
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    
    if (searchText !== '') {
        filteredTasks = filteredTasks.filter(task => 
            task.text.toLowerCase().includes(searchText)
        );
    }
    
    if (filteredTasks.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item', task.status);
            
            taskItem.innerHTML = `
                <div class="task-content">
                    <span class="task-text">${task.text}</span>
                    <span class="status-badge status-${task.status}">${getStatusLabel(task.status)}</span>
                </div>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">Modifica</button>
                    <button class="delete-btn" data-id="${task.id}">Elimina</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
        
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-id'));
                openEditModal(taskId);
            });
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
    
    document.getElementById('searchInput').addEventListener('input', searchTasks);
    
    document.querySelector('.close').addEventListener('click', closeEditModal);
    document.getElementById('saveEditBtn').addEventListener('click', saveEditedTask);
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('editModal');
        if (e.target === modal) {
            closeEditModal();
        }
    });
    
    renderTasks();
});