document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const button = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    button.addEventListener("click", () => {
        const taskText = input.value.trim();

        if (taskText !== "") {
            addTask(taskText);
            input.value = ""; // Limpa o campo de entrada após adicionar
        }
    });

    function addTask(taskText) {
        // Criando o item da lista
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Criando os botões de ação
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "🗑️"; // Ícone de lixeira
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => listItem.remove());

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️"; // Ícone de lápis
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => editTask(listItem));

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✅"; // Ícone de check
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            listItem.classList.toggle("completed"); // Alterna a classe para marcar como concluído
        });

        // Adiciona os botões ao item da lista
        listItem.appendChild(completeBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        // Adiciona o item à lista
        taskList.appendChild(listItem);
    }

    function editTask(listItem) {
        const newTaskText = prompt("Edite sua tarefa:", listItem.textContent.replace(/[\u2705\u270F\uD83D\uDDD1]/g, "").trim());
        if (newTaskText) {
            listItem.childNodes[0].textContent = newTaskText; // Atualiza o texto da tarefa
        }
    }
});
