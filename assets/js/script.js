const tasks = [
    { id: 1, description: 'Tarea de prueba', completed: false },
    { id: 2, description: 'Tarea de prueba completada', completed: true },
];

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');

    function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.description}
                <div>
                    <button onclick="toggleTask(${task.id})">${task.completed ? 'Desmarcar' : 'Completar'}</button>
                    <button onclick="deleteTask(${task.id})">Borrar</button>
                </div>
            `;
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });

        totalTasks.textContent = tasks.length;
        completedTasks.textContent = tasks.filter(task => task.completed).length;
    }

    window.toggleTask = function (id) {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        updateTaskList();
    };

    window.deleteTask = function (id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks.splice(taskIndex, 1);
        updateTaskList();
    };

    addTaskButton.addEventListener('click', () => {
        const description = newTaskInput.value.trim();
        if (description) {
            const newTask = {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                description,
                completed: false
            };
            tasks.push(newTask);
            newTaskInput.value = '';
            updateTaskList();
        }
    });

    updateTaskList();
});
