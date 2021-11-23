const BOTAO_CRIAR_TABELA = document.getElementById('criar-tarefa');
const INPUT_ESCREVER_TAREFA = document.getElementById('texto-tarefa');
const OL_DA_TABELA = document.getElementById('lista-tarefas');
const BOTAO_APAGA_TUDO = document.getElementById('apaga-tudo');
const BOTAO_APAGA_FINALIZADOS = document.getElementById('remover-finalizados');
const SALVAR_TODAS_AS_TAREFAS = document.getElementById('salvar-tarefas');

function iniciandoAPagina() {
  
}

function adicionarCorDaTarefa({ target }) {
  const classNameColor = document.querySelector('.selected');
  const tarefa = target;
  if (classNameColor === null) {
    tarefa.classList.add('selected');
  } else {
    classNameColor.classList.remove('selected');
    tarefa.classList.add('selected');
  }
}

function adicionarRiscoDaTarefa({ target }) {
  const tarefa = target;
  tarefa.classList.toggle('completed');
}

function adicionarTaregaATabela() {
  const valorDoInput = INPUT_ESCREVER_TAREFA.value;
  const criarLi = document.createElement('li');
  criarLi.innerText = valorDoInput;
  INPUT_ESCREVER_TAREFA.value = '';
  OL_DA_TABELA.appendChild(criarLi);
  criarLi.addEventListener('click', adicionarCorDaTarefa);
  criarLi.addEventListener('dblclick', adicionarRiscoDaTarefa);
}

function salvarListaDoLocalStorage() {
  const listaTarefa = document.querySelectorAll('li');
  const novoArray = [];
  listaTarefa.forEach((e) => {
    novoArray.push(e.innerText);
  });
  console.log(novoArray);
  localStorage.setItem('lista', JSON.stringify(novoArray));
}

function apagaTudoDaLista() {
  const listaTarefa = document.querySelectorAll('li');
  listaTarefa.forEach((e) => e.remove());
  salvarListaDoLocalStorage();
}

function apagaTarefaFinalizada() {
  const tarefaFinalizada = document.querySelectorAll('.completed');
  tarefaFinalizada.forEach((e) => e.remove());
  salvarListaDoLocalStorage();
}

BOTAO_CRIAR_TABELA.addEventListener('click', adicionarTaregaATabela);
BOTAO_APAGA_TUDO.addEventListener('click', apagaTudoDaLista);
BOTAO_APAGA_FINALIZADOS.addEventListener('click', apagaTarefaFinalizada);
SALVAR_TODAS_AS_TAREFAS.addEventListener('click', salvarListaDoLocalStorage);
iniciandoAPagina();
