fetch("http://127.0.0.1:5500/perguntas.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição HTTP');
    }
    return response.json(); // ou response.text() se a resposta for texto
  })
  .then(data => {
    // Manipule os dados da resposta aqui
    console.log(data);
  })