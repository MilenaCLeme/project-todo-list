const elementoIdTabela =  document.getElementById('tabela');
const botaoEnviar = document.getElementById('criar-tarefa');
const botaoApagaTudo = document.getElementById('apaga-tudo');
const botaoApagaFinalizados = document.getElementById('remover-finalizados');


function criarElementoOl() {
  let elementoOl = document.createElement('ol')
  elementoIdTabela.appendChild(elementoOl);
  elementoOl.id = 'lista-tarefas';   
}

function adicionaATarefa() {
  let textInput = document.getElementById('texto-tarefa').value;
  let elementoLi = document.createElement('li')
  let elementoPai = document.getElementById('lista-tarefas');
  elementoPai.appendChild(elementoLi)
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
  event.target.classList.toggle('completed');
}


function apagaTudoDaLista() {
  let elementoPai = document.getElementById('lista-tarefas')
  elementoPai.remove()
  criarElementoOl()
/*
  let elementoPai = document.getElementById('lista-tarefas');
  let listaCompleta = document.getElementsByTagName('li');
  for(let index = 0; index < listaCompleta.length; index += 1) {
    elementoPai.removeChild(listaCompleta[index])
    index -= 1;
  }
*/
}

function apagaTarefasFinalizadas() {
  let listaCompleta = document.getElementsByTagName('li');
  let elementoPai = document.getElementById('lista-tarefas');
  for(let index = 0; index < listaCompleta.length; index += 1) {
    if (listaCompleta[index].classList.contains('completed')) {
      elementoPai.removeChild(listaCompleta[index])
      index -= 1;
    }
  }
}

criarElementoOl();
botaoEnviar.addEventListener('click', adicionaATarefa)
botaoApagaTudo.addEventListener('click', apagaTudoDaLista)
botaoApagaFinalizados.addEventListener('click', apagaTarefasFinalizadas)






/*
let botao = document.getElementById('criar-tarefa');
let ol = document.querySelector('lista-tarefas');
let botaoApagaTudo = document.getElementById('apaga-tudo');
let botaoApagaFinalizados = document.getElementById('remover-finalizados');
criarElementoOl()
clicarDoBotao()


function apagaTudoDaLista() {
  let lista = document.getElementById('lista-tarefas');
  lista.remove(); 
}

function apagaTarefasFinalizadas() {
  let listaCompleta = document.getElementsByTagName('li');
  let elementoOl = document.getElementById('lista-tarefas');
  for(let index = 0; index < listaCompleta.length; index += 1) {
    if (listaCompleta[index].classList.contains('completed')) {
      elementoOl.removeChild(listaCompleta[index])
      index -= 1;
    }
  }



/*
botaoApagaTudo.addEventListener('click', apagaTudoDaLista)
botaoApagaFinalizados.addEventListener('click', apagaTarefasFinalizadas)
*/