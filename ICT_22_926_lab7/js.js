const taskNameInput = document.getElementById('task-name');
const taskCategoryInput = document.getElementById('task-category');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');
const filterCategory = document.getElementById('filter-category');
const clearTasksButton = document.getElementById('clear-tasks');

let tasks = [];

addTaskButton.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    const taskCategory = taskCategoryInput.value;

    if (taskName === '') {
        alert('Please enter a task name.');
        return;
    }

    const task = { name: taskName, category: taskCategory, completed: false };
    tasks.push(task);
    taskNameInput.value = '';
    renderTasks();
});

function renderTasks() {
    tasksList.innerHTML = '';
    const filteredTasks = filterCategory.value === 'All' ? tasks : tasks.filter(task => task.category === filterCategory.value);

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.name} (${task.category})</span>
            <div>
                <button onclick="markComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="removeTask(${index})">Remove</button>
            </div>
        `;
        tasksList.appendChild(li);
    });
}

function markComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}


function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}


clearTasksButton.addEventListener('click', () => {
    tasks = [];
    renderTasks();
});

filterCategory.addEventListener('change', renderTasks);
