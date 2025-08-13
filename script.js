// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the HTML elements we'll need
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage or use an empty array if none are found
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    /**
     * Saves the current 'tasks' array to the browser's localStorage.
     */
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    /**
     * Renders the tasks from the 'tasks' array to the screen.
     */
    const renderTasks = () => {
        // Clear the current list to avoid duplicates
        taskList.innerHTML = '';

        // Loop through each task in the array
        tasks.forEach((task, index) => {
            // Create a new list item (<li>) for each task
            const li = document.createElement('li');
            if (task.completed) {
                li.classList.add('completed');
            }

            // Create a span to hold the task text
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.addEventListener('click', () => toggleTaskCompleted(index));

            // Create a container for the action buttons
            const taskButtons = document.createElement('div');
            taskButtons.className = 'task-buttons';

            // --- THIS SECTION CREATES THE BUTTONS ---
            // Create the Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = '✏️';
            editBtn.addEventListener('click', () => editTask(index)); // Attaches the edit function

            // Create the Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            deleteBtn.addEventListener('click', () => deleteTask(index)); // Attaches the delete function

            // Add the elements to the list item
            li.appendChild(taskText);
            taskButtons.appendChild(editBtn);
            taskButtons.appendChild(deleteBtn);
            li.appendChild(taskButtons);

            // Add the list item to the task list on the page
            taskList.appendChild(li);
        });
    };

    /**
     * CREATE: Adds a new task to the list.
     */
    const addTask = () => {
        const text = taskInput.value.trim();
        if (text === '') {
            alert('Please enter a task.');
            return;
        }
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    };

    /**
     * UPDATE Part 1: Toggles the 'completed' status of a task.
     */
    const toggleTaskCompleted = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    /**
     * UPDATE Part 2: Edits the text of an existing task.
     */
    const editTask = (index) => {
        const newText = prompt('Edit your task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    };

    /**
     * DELETE: Deletes a task from the list.
     */
    const deleteTask = (index) => {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    };

    // --- EVENT HANDLING ---
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // --- Initial Render ---
    renderTasks();
});
