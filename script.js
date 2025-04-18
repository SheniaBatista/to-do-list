// Se não houver usuário logado, redireciona para a página de login
if (!localStorage.getItem("usuarioLogado")) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const button = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Carrega as tarefas ao abrir a página
    carregarTarefasSalvas();

    // Adiciona tarefa ao clicar no botão
    button.addEventListener("click", handleAddTask);

    // Adiciona tarefa ao pressionar Enter
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddTask();
        }
    });

    // Salva nova tarefa no localStorage
    function salvarTarefa(tarefa) {
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        if (!tarefas.includes(tarefa)) {
            tarefas.push(tarefa);
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        }
    }

    // Remove tarefa do localStorage
    function deletarTarefa(tarefa) {
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas = tarefas.filter(item => item !== tarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    // Atualiza uma tarefa no localStorage
    function editarTarefaAntiga(tarefaAntiga, tarefaNova) {
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        const index = tarefas.indexOf(tarefaAntiga);
        if (index !== -1) {
            tarefas[index] = tarefaNova;
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        }
    }

    // Lógica principal para adicionar tarefa
    function handleAddTask() {
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            input.value = ""; // Limpa campo
        }
    }

    // Formata o texto: primeira letra maiúscula e termina com ponto
    function formatText(text) {
        if (!text) return "";
        let formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        if (!formattedText.endsWith(".")) {
            formattedText += ".";
        }
        return formattedText;
    }

    // Adiciona tarefa à lista e cria os botões (check, editar, deletar)
    function addTask(taskText, salvar = true) {
        const listItem = document.createElement("li");
        const formattedTaskText = formatText(taskText);

        if (salvar) salvarTarefa(formattedTaskText); // Salva no localStorage, exceto se já for carregada

        const taskSpan = document.createElement("span");
        taskSpan.textContent = formattedTaskText;
        taskSpan.classList.add("task-text");

        // Botão de concluir
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
        editBtn.addEventListener("click", () => editTask(taskSpan, formattedTaskText));

        // Botão de deletar
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

        // Junta tudo no item da lista
        listItem.appendChild(taskSpan);
        listItem.appendChild(completeBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }

    // Marca tarefa como concluída (estiliza com classe CSS)
    function toggleTaskCompletion(taskSpan) {
        taskSpan.classList.toggle("completed");
    }

    // Permite editar o texto da tarefa
    function editTask(taskSpan, tarefaAntiga) {
        const novoTexto = prompt("Edite sua tarefa:", taskSpan.textContent.trim());
        if (novoTexto) {
            const formatado = formatText(novoTexto);
            taskSpan.textContent = formatado;
            editarTarefaAntiga(tarefaAntiga, formatado);
        }
    }

    // Carrega as tarefas salvas no localStorage ao iniciar
    function carregarTarefasSalvas() {
        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.forEach(tarefa => {
            addTask(tarefa, false); // Evita salvar novamente no localStorage
        });
    }
});

// Menu hamburguer (corrigido)
document.getElementById("burger").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Ações do menu lateral
function verTarefasConcluidas() {
    alert("mostrar tarefas concluídas (em breve)");
}

function verTarefasExcluidas() {
    alert("mostrar tarefas excluídas (em breve)");
}

function sair() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}

function deletarConta() {
    if (confirm("Tem certeza que deseja deletar sua conta? Isso apagará todas as tarefas!")) {
        localStorage.clear();
        window.location.href = "login.html";
    }
}
