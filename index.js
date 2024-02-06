const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.getElementById("taskForm");
const taskListContainer = document.getElementById("taskList");
const clockContainer = document.getElementById("clock");

const tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

showAllTasks();
updateClock();

function showAllTasks() {
  taskListContainer.innerHTML = ""; 

  tasks.forEach((value, index) => {
    const div = document.createElement("div");
    div.classList.add("task");

    const innerDiv = document.createElement("div");
    div.append(innerDiv);

    const p = document.createElement("p");
    p.innerText = value.title;
    innerDiv.append(p);

    const span = document.createElement("span");
    span.innerText = value.description;
    innerDiv.append(span);

    const btn = document.createElement("button");
    btn.classList.add("deleteBtn");
    btn.innerText = "-";
    btn.addEventListener("click", () => {
      removeTasks();
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showAllTasks();
    });

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("completeBtn");
    completeBtn.innerText = "✓";
    if (value.completed) {
      completeBtn.classList.add("completed");
    }
    completeBtn.addEventListener("click", () => {
      value.completed = !value.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showAllTasks();
    });

    div.append(innerDiv);
    div.append(completeBtn);
    div.append(btn);
    taskListContainer.append(div);
  });
}

function removeTasks() {
  taskListContainer.innerHTML = ""; 
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeTasks();

  tasks.push({
    title: title.value,
    description: description.value,
    completed: false,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  showAllTasks();
  title.value = "";
  description.value = "";
});

function updateClock() {
  setInterval(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    clockContainer.innerText = formattedDate;
  }, 1000);
}
