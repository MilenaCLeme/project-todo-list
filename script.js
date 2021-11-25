const BOTAO_CRIAR_TABELA = document.getElementById('criar-tarefa');
const INPUT_ESCREVER_TAREFA = document.getElementById('texto-tarefa');
const OL_DA_TABELA = document.getElementById('lista-tarefas');
const BOTAO_APAGA_TUDO = document.getElementById('apaga-tudo');
const BOTAO_APAGA_FINALIZADOS = document.getElementById('remover-finalizados');
const SALVAR_TODAS_AS_TAREFAS = document.getElementById('salvar-tarefas');
const BOTAO_MOVER_CIMA = document.getElementById('mover-cima');
const BOTAO_MOVER_BAIXO = document.getElementById('mover-baixo');
const BOTAO_REMOVE_SELECIONADO = document.getElementById('remover-selecionado');
const BOTAO_DO_CALENDARIO = document.getElementById('adicionar-calendario');
const DIV_CALENDARIO = document.getElementById('calendario');
const BOTAO_DE_MOSTRAR_CALENDARIO = document.getElementById('mostrar');
const DIV_MOSTAR_CALENDARIO = document.getElementById('mostrar-tarefas');

const CALENDARIO = [];

function recuperarDoLocalStorageOCalendario() {
  const localStorageItensSalvosCalendario = localStorage.getItem('calendario');
  if (localStorageItensSalvosCalendario) {
    const itens = JSON.parse(localStorageItensSalvosCalendario);
    itens.forEach((e) => {
      CALENDARIO.push(e);
    });
  }
}

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
}

function adicionarDoLocalStorageOCalendario() {
  localStorage.setItem('calendario', JSON.stringify(CALENDARIO));
}

function adicionarTarefasDoCalendario() {
  const elementosLi = document.querySelectorAll('li');
  if (elementosLi.length > 0) {
    const valorDoInputData = DIV_CALENDARIO.children[1].value;
    const arrayDosValoresDoLi = [];
    elementosLi.forEach((e) => {
      arrayDosValoresDoLi.push(e.innerHTML);
    });
    CALENDARIO.push({ [valorDoInputData]: arrayDosValoresDoLi });
    adicionarDoLocalStorageOCalendario();
    apagaTudoDaLista();
  } else {
    alert('Por gentileza, insera uma tarefa!');
  }
}

function adicionarInputDeCalendario() {
  const numeroDeFilhosDaDiv = DIV_CALENDARIO.children;
  const numeroDeIndex = numeroDeFilhosDaDiv.length;
  if (numeroDeFilhosDaDiv.length === 0) {
    const tagParaInformação = document.createElement('p');
    const inputDeCalendario = document.createElement('input');
    const botao = document.createElement('button');
    inputDeCalendario.type = 'date';
    tagParaInformação.innerText = 'Informe a data e envie todas as tarefas ao calendario';
    botao.innerHTML = 'Enviar';
    DIV_CALENDARIO.appendChild(tagParaInformação);
    DIV_CALENDARIO.appendChild(inputDeCalendario);
    DIV_CALENDARIO.appendChild(botao);
    botao.addEventListener('click', adicionarTarefasDoCalendario);
  } else {
    for (let index = 0; index < numeroDeIndex; index += 1) {
      numeroDeFilhosDaDiv[0].remove();
    }
  }
}

function exibirTarefas(item) {
  if (CALENDARIO[item]) {
    const obj = CALENDARIO[item];
    const data = Object.keys(obj);
    const valores = obj[data[0]];
    const elementoH4 = document.createElement('h4');
    data.forEach((e) => { elementoH4.innerText = e; });
    DIV_MOSTAR_CALENDARIO.appendChild(elementoH4);
    valores.forEach((elemento) => {
      console.log(elemento);
      const p = document.createElement('p');
      p.innerText = elemento;
      DIV_MOSTAR_CALENDARIO.appendChild(p);
    });
  }
}

function adicionarOProximo() {
  exibirTarefas(CALENDARIO[1]);
}

function adicionarBotaoEDiv() {
  const quantidadeDeElemento = DIV_MOSTAR_CALENDARIO.children.length;
  if (quantidadeDeElemento === 1) {
    exibirTarefas(0);
    const botaoDeProximo = document.createElement('button');
    botaoDeProximo.innerHTML = 'Proximo';
    DIV_MOSTAR_CALENDARIO.appendChild(botaoDeProximo);
    botaoDeProximo.addEventListener('click', adicionarOProximo);
  } else {
    for (let index = 0; index < quantidadeDeElemento; index += 1) {
      DIV_MOSTAR_CALENDARIO.children[0].remove();
    }
    const div = document.createElement('div');
    div.classList.add('item');
    DIV_MOSTAR_CALENDARIO.appendChild(div);
  }
}

BOTAO_CRIAR_TABELA.addEventListener('click', adicionarTaregaATabela);
BOTAO_APAGA_TUDO.addEventListener('click', apagaTudoDaLista);
BOTAO_APAGA_FINALIZADOS.addEventListener('click', apagaTarefaFinalizada);
SALVAR_TODAS_AS_TAREFAS.addEventListener('click', salvarListaDoLocalStorage);
BOTAO_MOVER_CIMA.addEventListener('click', moverElementoParaCima);
BOTAO_MOVER_BAIXO.addEventListener('click', moverElementoParaBaixo);
BOTAO_REMOVE_SELECIONADO.addEventListener('click', removeElementoSelecionado);
BOTAO_DO_CALENDARIO.addEventListener('click', adicionarInputDeCalendario);
BOTAO_DE_MOSTRAR_CALENDARIO.addEventListener('click', adicionarBotaoEDiv);
iniciandoAPagina();
recuperarDoLocalStorageOCalendario();
