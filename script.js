let botao = document.getElementById('criar-tarefa');
let elementoOl = document.getElementById('lista-tarefas')
criarElementoOl()
clicarDoBotao()


function criarElementoOl() {
  let elementoIdTabela =  document.getElementById('tabela')
  let elementoOl = document.createElement('ol')
  elementoIdTabela.appendChild(elementoOl);
  elementoOl.id = 'lista-tarefas';  
}

function clicarDoBotao(){
  botao.addEventListener('click', adicionaATarefa)
}

function adicionaATarefa() {
  let textInput = document.getElementById('texto-tarefa').value;
  let elementoLi = document.createElement('li')
  let elementoOl = document.getElementById('lista-tarefas')
  elementoOl.appendChild(elementoLi)
  elementoLi.innerHTML = textInput
  removeNoImput()
}

function removeNoImput() {
  document.getElementById('texto-tarefa').value = ''
}