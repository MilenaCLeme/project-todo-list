let botao = document.getElementById('criar-tarefa');
let elementoOl = document.getElementById('lista-tarefas');
let elementoLi = document.getElementsByTagName('li');
let ol = document.querySelector('lista-tarefas');
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
  elementoLi.addEventListener('click', adicionaCor)
  elementoLi.addEventListener('dblclick', adicionaUmRiscoATarefa)
  removeNoImput()
}

function removeNoImput() {
  document.getElementById('texto-tarefa').value = ''
}

function adicionaCor(event) {
  let elemento = document.querySelector('.selected');
  if (elemento === null) {
    event.target.classList.add('selected');
  } else {
    elemento.classList.remove('selected');
    event.target.classList.add('selected');
  }
}

function adicionaUmRiscoATarefa(event){
  console.log('funcionando');
  event.target.classList.toggle('completed');
}

