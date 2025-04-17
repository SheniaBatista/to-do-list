document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const button = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Adiciona tarefa ao clicar no botão
    button.addEventListener("click", handleAddTask);

    // Adiciona tarefa ao pressionar Enter no campo de input
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddTask();
        }
    });

    // Função para salvar no localstorage
    function salvarTarefa (tarefa) {
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.push(tarefa);
        localStorage.setItem("tarefas",JSON.stringify(tarefas));
    }

    //Carrega as tarefas ao abrir a página
    window.onload = function () {
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.forEach(tarefa => {
            addTask(tarefa); 
        });
    }
    
    //Função que adiciona a tarefa na tela
    function adicionarTarefaNaTela(tarefa){
        const item = document.createElement("li")
        item.textContent = tarefa;
        taskList.appendChild(item);
    }

    //Apagar do localstorage quando apagar da tela
    function deletarTarefa(tarefa){
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas = tarefas.filter(item => item !== tarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function handleAddTask() {
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            input.value = ""; // Limpa o campo de entrada
        }
    }

    function formatText(text) {
        if (!text) return "";

        let formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

        if (!formattedText.endsWith(".")) {
            formattedText += ".";
        }

        return formattedText;
    }

    function addTask(taskText) {
        const listItem = document.createElement("li");
        const formattedTaskText = formatText(taskText);
        salvarTarefa(formattedTaskText); 

        const taskSpan = document.createElement("span");
        taskSpan.textContent = formattedTaskText;
        taskSpan.classList.add("task-text");

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        const completeIcon = document.createElement("img");
        completeIcon.src = "img/check.png";
        completeIcon.alt = "Concluir";
        completeIcon.classList.add("icon");
        completeBtn.appendChild(completeIcon);
        completeBtn.addEventListener("click", () => toggleTaskCompletion(taskSpan));

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        const editIcon = document.createElement("img");
        editIcon.src = "img/edit.png";
        editIcon.alt = "Editar";
        editIcon.classList.add("icon");
        editBtn.appendChild(editIcon);
        editBtn.addEventListener("click", () => editTask(taskSpan));

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "img/delete.png";
        deleteIcon.alt = "Deletar";
        deleteIcon.classList.add("icon");
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.addEventListener("click", () => {
            deletarTarefa(formattedTaskText);
            listItem.remove();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(completeBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }

    function toggleTaskCompletion(taskSpan) {
        taskSpan.classList.toggle("completed");
    }

    function editTask(taskSpan) {
        const newTaskText = prompt("Edite sua tarefa:", taskSpan.textContent.trim());
        if (newTaskText) {
            taskSpan.textContent = formatText(newTaskText);
        }
    }
});