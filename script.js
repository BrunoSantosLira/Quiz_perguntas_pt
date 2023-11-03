GerarPergunta();
let contadorPerguntas= 0
let qtdePontos = 0

function GerarPergunta(){
  fetch("https://brunosantoslira.github.io/Quiz_perguntas_pt/perguntas.json")
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
    console.log('PERGUNTA ATUAL:', contadorPerguntas);
    console.log('TAMANHO DA LISTA:',perguntas.perguntas.length)

    if(contadorPerguntas == perguntas.perguntas.length){
      gerarFinal();
    }else{
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
      
      let badgeNumeroPergunta = window.document.getElementById('badges_pergunta');
      badgeNumeroPergunta.innerHTML = `Pergunta: ${perguntaAtual.numQuestao + 1} de 10`
      
      }

  }

function verificarResposta(event){
  let respostaSelecionada = event.value
  fetch("https://brunosantoslira.github.io/Quiz_perguntas_pt/perguntas.json")
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

function gerarFinal(){
      let tituloPergunta = window.document.getElementById('tituloPergunta');
      tituloPergunta.innerHTML = `Fim de Jogo! Você conseguiu ${qtdePontos} pontos`
      tituloPergunta.style.backgroundColor = '#07EDC8'
      tituloPergunta.style.boxShadow = '0px 0px 15px #134deb'
      tituloPergunta.style.borderRadius = '1rem';
      tituloPergunta.style.padding = '1rem';

      let caixa = window.document.getElementById('caixa');
      caixa.style.backgroundColor = 'none'

      let badgeNumeroPergunta = window.document.getElementById('badges_pergunta');
      badgeNumeroPergunta.innerHTML = ''
      


      let perguntaTexto = window.document.getElementById('pergunta');
      perguntaTexto.innerHTML = '<p class="text-center">Redirecionando para a página principal...</p>'

      let pergunta2 = window.document.getElementById('pergunta2');
      pergunta2.innerHTML = ''
      //ALTERNATIVAS
      let Alternativas = window.document.getElementById('caixa_alternativas');
      Alternativas.innerHTML = ''
      
      setTimeout(() => {
        window.location = 'index.html'
      }, 6000);
}

function resultadoCorreto(){
  var meuAudio = document.getElementById('meuAudio');
  meuAudio.play();
  contadorPerguntas++
  GerarPergunta();
  console.log('RESPOSTA CORRETA');
  qtdePontos += 10
}

function resultadoIncorreto(){
  var meuAudio = document.getElementById('meuAudioNegative');
  meuAudio.play();
  contadorPerguntas++
  GerarPergunta();
  console.log('RESPOSTA INCORRETA');
}