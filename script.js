let botao = document.getElementById('criar-tarefa');
criarElementoOl()


function criarElementoOl() {
  let elementoIdTabela =  document.getElementById('tabela')
  let elementoOl = document.createElement('ol')
  elementoIdTabela.appendChild(elementoOl);
  elementoOl.id = "lista-tarefas";  
}


function clicarDoBotaoEnviar(){
  botao.addEventListener('click', adicionaOElementoETexto);
}

function adicionaOElementoETexto() {
}


