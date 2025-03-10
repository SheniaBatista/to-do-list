document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const button = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    button.addEventListener("click", () => {
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            input.value = ""; // Limpa o campo de entrada
        }
    });

    function addTask(taskText) {
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✅";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => toggleTaskCompletion(listItem));

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => editTask(listItem));

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => listItem.remove());

        listItem.appendChild(completeBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }

    function toggleTaskCompletion(listItem) {
        listItem.classList.toggle("completed"); // Adiciona ou remove a classe 'completed'
    }

    function editTask(listItem) {
        const newTaskText = prompt(
            "Edite sua tarefa:",
            listItem.firstChild.textContent.trim()
        );
        if (newTaskText) {
            listItem.firstChild.textContent = newTaskText;
        }
    }
});
