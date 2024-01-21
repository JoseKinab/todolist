
let input = document.querySelector("input")
let addTarefa = document.getElementById("add-tarefa");
let ul = document.querySelector("ul");

addTarefa.addEventListener("click", function criaTarefa (e){
    let txt = input.value
    if (txt ==="") {
        return
    }else {
        let div = document.createElement("div")
        div.classList.add("tarefa")
        div.innerHTML =
       `
       <li>${txt}</li>
      <i class="excluir fa-solid fa-circle-xmark"></i></li>
      `
      ul.appendChild(div)
      input.value = "";
      let excluir = div.querySelector(".excluir");
      excluir.addEventListener("click", function removeTarefa(e) {
        div.classList.add("efect")
        setTimeout(function() { 
            div.remove();
            salvaTarefas();
          }, 310);

    })
    salvaTarefas();
    }
})


// Função para salvar as tarefas no local storage
function salvaTarefas() {
    // Seleciona todas as divs com a classe tarefa
    let tarefas = document.querySelectorAll(".tarefa");
    // Cria um array vazio para armazenar os textos das tarefas
    let listaTarefas = [];
    // Percorre as divs e adiciona os textos ao array
    for (let tarefa of tarefas) {
      let textoTarefa = tarefa.querySelector("li").textContent;
      listaTarefas.push(textoTarefa);
    }
    // Converte o array em uma string JSON
    let tarefasJSON = JSON.stringify(listaTarefas);
    // Salva a string no local storage com a chave "tarefas"
    localStorage.setItem("tarefas", tarefasJSON);
  }
  
  // Função para recuperar as tarefas do local storage
  function recuperaTarefas() {
    // Obtém a string do local storage com a chave "tarefas"
    let tarefasJSON = localStorage.getItem("tarefas");
    // Converte a string em um array
    let listaTarefas = JSON.parse(tarefasJSON);
    // Percorre o array e cria as divs com as tarefas salvas
    for (let textoTarefa of listaTarefas) {
      let div = document.createElement("div");
      div.classList.add("tarefa");
      div.innerHTML = `
        <li>${textoTarefa}</li>
        <i class="excluir fa-solid fa-circle-xmark"></i>
      `;
      ul.appendChild(div);
      let excluir = div.querySelector(".excluir");
      excluir.addEventListener("click", function removeTarefa(e) {
        div.classList.add("efect");
        setTimeout(function () {
          div.remove();
          salvaTarefas(); // Chama a função para salvar as tarefas após remover uma delas
        }, 310);
      });
    }
  }
  
  // Chama a função para recuperar as tarefas quando a página carrega
  recuperaTarefas();
  