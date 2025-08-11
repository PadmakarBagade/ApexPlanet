document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        addTask();
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event listener for clicks on the task list
    taskList.addEventListener('click', (e) => {
        // Mark task as completed if the user clicks on the list item itself
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            saveTasks();
        }
        // Remove task if the user clicks the "Delete" button
        if (e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
            saveTasks();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `${taskText} <button>Delete</button>`;
            taskList.appendChild(li);
            taskInput.value = '';
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.textContent.replace('Delete', '').trim(), // Clean up text for saving
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;
                if (task.completed) {
                    li.classList.add('completed');
                }
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }
    }
});