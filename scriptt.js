let currentEditIndex = null;
document.addEventListener("DOMContentLoaded", displayTasks);

function displayTasks() {
    const taskList = document.getElementById("taskList").getElementsByTagName("tbody")[0];
    taskList.innerHTML = "";

    const tasks = getTasks();
    if (tasks.length === 0) {
        taskList.innerHTML = `<tr><td colspan="4">No Tasks found</td></tr>`;
        return;
    }

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
        <tr>
        <td>${task.name}</td>
        <td>${task.details}</td>
        <td>${new Date(task.date).toLocaleString()}</td>
        <td>
        <button class="btn-edit" onclick="loadTask(${index})">Edit</button>
        <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
        </td>
        </tr>
        `;
    });
}

function addTask() {
    const taskName = document.getElementById("taskName").value.trim();
    const taskDetails = document.getElementById("taskDetails").value.trim();

    if (!taskName || !taskDetails) {
        alert("Both task name and details are required.");
        return;
    }

    const newTask = {
        id: generateId(),
        name: taskName,
        details: taskDetails,
        date: new Date().toLocaleString(),
    };

    const tasks = getTasks();
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    clearForm();
    displayTasks();
}

function loadTask(index) {
    const tasks = getTasks();
    const task = tasks[index];
    document.getElementById("taskName").value = task.name;
    document.getElementById("taskDetails").value = task.details;

    currentEditIndex = index;

    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline";
}

function updateTask() {
    const taskName = document.getElementById("taskName").value.trim();
    const taskDetails = document.getElementById("taskDetails").value.trim();

    if (!taskName || !taskDetails) {
        alert("Both task name and details are required.");
        return;
    }

    const tasks = getTasks();
    tasks[currentEditIndex].name = taskName;
    tasks[currentEditIndex].details = taskDetails;
    tasks[currentEditIndex].date = new Date().toLocaleString();

    localStorage.setItem("tasks", JSON.stringify(tasks));

    clearForm();
    displayTasks();

    document.getElementById("addButton").style.display = "inline";
    document.getElementById("updateButton").style.display = "none";
    currentEditIndex = null;
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function searchTask() {
    const query = document.getElementById("search").value.toLowerCase();
    const tasks = getTasks();

    const filteredTasks = tasks.filter((task) =>
        task.name.toLowerCase().includes(query) || task.details.toLowerCase().includes(query)
    );

    const taskList = document.getElementById("taskList").getElementsByTagName("tbody")[0];
    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<tr><td colspan="4">No Tasks found</td></tr>`;
        return;
    }

    filteredTasks.forEach((task, index) => {
        taskList.innerHTML += `
        <tr>
        <td>${task.name}</td>
        <td>${task.details}</td>
        <td>${new Date(task.date).toLocaleString()}</td>
        <td>
        <button class="btn-edit" onclick="loadTask(${index})">Edit</button>
        <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
        </td>
        </tr>
        `;
    });
}
function getTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks): [];
}

function clearForm() {
    document.getElementById("taskName").value = "";
    document.getElementById("taskDetails").value = "";
}

function generateId() {
    return Math.floor(Math.random() * Date.now());
}