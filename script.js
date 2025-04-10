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
        completeBtn.classList.add("complete-btn");
        const completeIcon = document.createElement("img");
        completeIcon.src = "img/check.png";
        completeIcon.alt = "Concluir";
        completeIcon.classList.add("icon");
        completeBtn.appendChild(completeIcon);
        completeBtn.addEventListener("click", () => toggleTaskCompletion(taskSpan));

        // Botão de editar
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        const editIcon = document.createElement("img");
        editIcon.src = "img/edit.png";
        editIcon.alt = "Editar";
        editIcon.classList.add("icon");
        editBtn.appendChild(editIcon);
        editBtn.addEventListener("click", () => editTask(taskSpan));
        

        // Botão de deletar
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "img/delete.png";
        deleteIcon.alt = "Deletar";
        deleteIcon.classList.add("icon");
        deleteBtn.appendChild(deleteIcon);
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

const completeIcon = document.createElement("img");
completeIcon.src = "img/check.png";
completeIcon.classList.add("check");

const editIcon = document.createElement("img");
editIcon.src = "img/edit.png";
editIcon.classList.add("edit");

const deleteIcon = document.createElement("img");
deleteIcon.src = "img/delete.png";
deleteIcon.classList.add("delete");

