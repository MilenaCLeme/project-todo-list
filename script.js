const BOTAO_CRIAR_TABELA = document.getElementById('criar-tarefa');
const INPUT_ESCREVER_TAREFA = document.getElementById('texto-tarefa');
const OL_DA_TABELA = document.getElementById('lista-tarefas');
const BOTAO_APAGA_TUDO = document.getElementById('apaga-tudo');
const BOTAO_APAGA_FINALIZADOS = document.getElementById('remover-finalizados');
const SALVAR_TODAS_AS_TAREFAS = document.getElementById('salvar-tarefas');
const BOTAO_MOVER_CIMA = document.getElementById('mover-cima');
const BOTAO_MOVER_BAIXO = document.getElementById('mover-baixo');
const BOTAO_REMOVE_SELECIONADO = document.getElementById('remover-selecionado');

function adicionarRiscoDaTarefa({ target }) {
  const tarefa = target;
  tarefa.classList.toggle('completed');
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

function colocarATarefaDaTela(item, itemclass) {
  const criarLi = document.createElement('li');
  criarLi.innerText = item;
  if (itemclass !== '') {
    criarLi.className = itemclass;
  }
  INPUT_ESCREVER_TAREFA.value = '';
  OL_DA_TABELA.appendChild(criarLi);
  criarLi.addEventListener('click', adicionarCorDaTarefa);
  criarLi.addEventListener('dblclick', adicionarRiscoDaTarefa);
}

function iniciandoAPagina() {
  const localStorageItensSalvos = localStorage.getItem('lista');
  if (localStorageItensSalvos) {
    const arrayDeTarefasSalvas = JSON.parse(localStorageItensSalvos);
    arrayDeTarefasSalvas.forEach((elemento) => {
      colocarATarefaDaTela(elemento.text, elemento.class);
    });
  }
}

function adicionarTaregaATabela() {
  const valorDoInput = INPUT_ESCREVER_TAREFA.value;
  const iniciouSemClass = '';
  colocarATarefaDaTela(valorDoInput, iniciouSemClass);
}

function salvarListaDoLocalStorage() {
  const listaTarefa = document.querySelectorAll('li');
  const novoArray = [];
  listaTarefa.forEach((e) => {
    novoArray.push({ text: e.innerText, class: e.className });
  });
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

function moverElementoParaCima() {
  const todosOsElementosLi = document.querySelectorAll('li');
  const novoArray = [];
  todosOsElementosLi.forEach((e, index) => {
    if (e.className === 'selected' && index !== 0) {
      const elemento = todosOsElementosLi[index - 1];
      novoArray[index - 1] = e;
      novoArray.push(elemento);
    } else {
      novoArray.push(e);
    }
  });
  apagaTudoDaLista();
  novoArray.forEach((elemento) => {
    colocarATarefaDaTela(elemento.innerText, elemento.className);
  });
  salvarListaDoLocalStorage();
}

function moverElementoParaBaixo() {
  const todosOsElementosLis = document.querySelectorAll('li');
  const novoArray = [...todosOsElementosLis];
  todosOsElementosLis.forEach((elemento, index) => {
    if (elemento.className === 'selected' && index < todosOsElementosLis.length - 1) {
      const remove = novoArray.splice((index + 1), 1);
      novoArray.splice((index !== 0 ? index - 1 : 0), 0, remove[0]);
    }
  });
  apagaTudoDaLista();
  novoArray.forEach((e) => {
    colocarATarefaDaTela(e.innerText, e.className);
  });
  salvarListaDoLocalStorage();
}

function removeElementoSelecionado() {
  const elementosLi = document.querySelectorAll('li');
  const novoArray = [...elementosLi];
  elementosLi.forEach((elemento, index) => {
    if (elemento.className === 'selected' || elemento.className === 'selected completed') {
      const remover = novoArray.splice((index), 1);
      console.log(remover);
    }
  });
  apagaTudoDaLista();
  novoArray.forEach((e) => {
    colocarATarefaDaTela(e.innerText, e.className);
  });
  salvarListaDoLocalStorage();
}

BOTAO_CRIAR_TABELA.addEventListener('click', adicionarTaregaATabela);
BOTAO_APAGA_TUDO.addEventListener('click', apagaTudoDaLista);
BOTAO_APAGA_FINALIZADOS.addEventListener('click', apagaTarefaFinalizada);
SALVAR_TODAS_AS_TAREFAS.addEventListener('click', salvarListaDoLocalStorage);
BOTAO_MOVER_CIMA.addEventListener('click', moverElementoParaCima);
BOTAO_MOVER_BAIXO.addEventListener('click', moverElementoParaBaixo);
BOTAO_REMOVE_SELECIONADO.addEventListener('click', removeElementoSelecionado);
iniciandoAPagina();
