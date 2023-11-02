GerarPergunta();
let contadorPerguntas= 0

function GerarPergunta(){
  fetch("http://127.0.0.1:5500/perguntas.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição HTTP');
    }
    return response.json(); // ou response.text() se a resposta for texto
  })
  .then(data => {
    // Manipule os dados da resposta aqui
   preencherPerguntar(data);
    
  })
}
  function preencherPerguntar(perguntas){
    let perguntaAtual = perguntas.perguntas[contadorPerguntas]
    console.log(perguntas.perguntas);

    let tituloPergunta = window.document.getElementById('tituloPergunta');
    tituloPergunta.innerHTML = perguntaAtual['titulo']

    let perguntaTexto = window.document.getElementById('pergunta');
    perguntaTexto.innerHTML = perguntaAtual.pergunta;

    let pergunta2 = window.document.getElementById('pergunta2');
    pergunta2.innerHTML = perguntaAtual.pergunta2;
    //ALTERNATIVAS
    let AlterA = window.document.getElementById('AlterA');
    let AlterB = window.document.getElementById('AlterB');
    let AlterC = window.document.getElementById('AlterC');
    let AlterD= window.document.getElementById('AlterD');

    AlterA.innerHTML = perguntaAtual.alternativaA
    AlterB.innerHTML = perguntaAtual.alternativaB
    AlterC.innerHTML = perguntaAtual.alternativaC
    AlterD.innerHTML = perguntaAtual.alternativaD
  }

function verificarResposta(event){
  let respostaSelecionada = event.value
  fetch("http://127.0.0.1:5500/perguntas.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição HTTP');
    }
    return response.json(); // ou response.text() se a resposta for texto
  })
  .then(data => {
    // Manipule os dados da resposta aqui
    respostaCorreta = data.perguntas[contadorPerguntas].correta
    console.log(respostaCorreta)

    if(respostaSelecionada == respostaCorreta){
      console.log('SELECIONADA:', respostaSelecionada);
      console.log('CORRETA:', respostaCorreta);
      resultadoCorreto()

    }else{
      console.log('SELECIONADA:', respostaSelecionada);
      console.log('CORRETA:', respostaCorreta);
      resultadoIncorreto()

    }

  })
}

function resultadoCorreto(){
  var meuAudio = document.getElementById('meuAudio');
  meuAudio.play();
  contadorPerguntas++
  GerarPergunta();
  console.log('RESPOSTA CORRETA');
}

function resultadoIncorreto(){
  var meuAudio = document.getElementById('meuAudioNegative');
  meuAudio.play();
  console.log('RESPOSTA INCORRETA');
}