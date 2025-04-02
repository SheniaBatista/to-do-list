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

    function formatText(text) {
        if (!text) return "";
        
        // Deixar a priemira letra maiúscula e o restante minúsculo.
        let formattedText = text.charAt(0).toUpperCase() + text.slice(1);
        
        // Adiciona um ponto final caso não tenha um
        if (!formattedText.endsWith(".")) {
            formattedText += ".";
        }
        
        return formattedText;
    }

    function addTask(taskText) {
        const listItem = document.createElement("li");
        const formattedTaskText = formatText(taskText);
        

        // Criando um <span> para envolver o texto da tarefa
        const taskSpan = document.createElement("span");
        taskSpan.textContent = formattedTaskText;
        taskSpan.classList.add("task-text");

        // Botão de completar
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✅";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => toggleTaskCompletion(taskSpan));

        // Botão de editar
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => editTask(taskSpan));

        // Botão de deletar
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => listItem.remove());

        // Adicionando elementos ao <li>
        listItem.appendChild(taskSpan);
        listItem.appendChild(completeBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }

    function toggleTaskCompletion(taskSpan) {
        taskSpan.classList.toggle("completed"); // Aplica a classe apenas no <span>
    }

    function editTask(taskSpan) {
        const newTaskText = prompt("Edite sua tarefa:", taskSpan.textContent.trim());
        if (newTaskText) {
            taskSpan.textContent = newTaskText;
        }
    }
});
