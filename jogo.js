let jogo;

const elementos = {
  telaInicial: document.getElementById('inicial'),
  telaJogo: document.getElementById('jogo'),
  telaCadastro: document.getElementById('cadastrar'),
  telaMensagem: document.querySelector('.mensagem'),
  textoMensagem: document.querySelector('.mensagem .texto'),
  Dica: document.querySelector('.dica'),
  teclado: document.querySelector('.teclado'),
  palavra: document.querySelector('.palavra'),
  palavraCadastrada: document.getElementById('#palavraa'),
  dicaCadastrada: document.querySelector('#dica'),
  dificuldade: document.querySelector('#dificuldade-cadastro'),
  botoes: {
    facil: document.querySelector('.botao-facil'),
    medio: document.querySelector('.botao-medio'),
    dificil: document.querySelector('.botao-dificil'),
    cadastrar: document.querySelector('.botao-cadastrar'),
    submeter: document.querySelector('.botao-submeter'),
    reiniciar: document.querySelector('.reiniciar'),
  },
  boneco: [

    document.querySelector('.boneco-cabeca'),
    document.querySelector('.boneco-corpo'),
    document.querySelector('.boneco-braco-esquerdo'),
    document.querySelector('.boneco-braco-direito'),
    document.querySelector('.boneco-perna-esquerda'),
    document.querySelector('.boneco-perna-direita'),

  ],
};


const palavras = {

  facil: [
    { valor: 'dizer', dica: 'expor através de palavras; exprimir, enunciar.' },
    { valor: 'tempo', dica: 'duração relativa das coisas que cria no ser humano a ideia de presente, passado e futuro; período contínuo no qual os eventos se sucedem.' },
    { valor: 'alado', dica: 'dotado de asas, que voa.' },
    { valor: 'fusão', dica: 'transição da fase sólida para a fase líquida de uma substância ou mistura.'},
    { valor: 'bônus', dica: 'prêmio ou vantagem concedida, por sorteio, aos portadores de certos títulos, bilhetes de transportes etc.'},
    { valor: 'âmbar', dica: 'resina fóssil muito usada para a manufatura de objetos ornamentais'},
    
  ],
  medio: [
    { valor: 'ciência', dica: 'conhecimento atento e aprofundado de algo.' },
    { valor: 'melissa', dica: 'Popularmente conhecida como erva-cidreira, planta medicinal com várias substâncias benéficas à saúde humana, espécie aromática de origem europeia' },
    { valor: 'aflição', dica: 'algo quesentimento de persistente dor física ou moral; ânsia, agonia, angústia. não é frequente' },
    { valor: 'célebre', dica: 'distinto pelo saber, mérito e demais qualidades louváveis; notável, ilustre.'},
    { valor: 'mutável', dica: 'que pode mudar; sujeito a mudança; alterável, mudável.'},
    { valor: 'oráculo', dica: 'na Antiguidade, resposta de uma divindade a quem a consultava.'},
  ],
  dificil: [
    { valor: 'explícito', dica: 'que é claro, explicado sem ambiguidade.' },
    { valor: 'sintático', dica: 'originário ou resultante de uma síntese.' },
    { valor: 'plenitude', dica: 'estado do que é inteiro, completo; totalidade, integridade.' },
    { valor: 'supressão', dica: 'ação ou resultado de cancelar ou extinguir; eliminação, extinção, cancelamento.' },
    { valor: 'pretérito', dica: 'que não é do presente nem do futuro; situado no passado.' },
    { valor: 'ideologia', dica: 'conjunto de ideias que compõe algo; refere-se à reunião das convicções pessoais de alguém, de um grupo ou instituição' },
  ],
}

const novoJogo = () => {



  jogo = {
    dificuldade: undefined,
    palavra: {
      original: undefined,
      semAcentos: undefined,
      tamanho: undefined,
      dica: undefined,
    },
    acertos: undefined,
    jogadas: [],
    chances: 6,
    definirPalavra: function (palavra) {

      this.palavra.original = palavra.valor;
      this.palavra.tamanho = palavra.valor.length;
      this.acertos = '';
      this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      for (let i = 0; i < this.palavra.tamanho; i++) {
        this.acertos += ' ';
      }
      elementos.Dica.innerHTML = `Dica: ${palavra.dica}.`
      elementos.telaMensagem.style.display = 'flex';



    },
    jogar: function (letraJogada) {
      let acertou = false;
      for (let i = 0; i < this.palavra.tamanho; i++) {
        const letra = this.palavra.semAcentos[i].toLowerCase();
        if (letra == letraJogada.toLowerCase()) {
          acertou = true;
          this.acertos = replace(this.acertos, i, this.palavra.original[i]);
        }
      }
      if (!acertou) {
        this.chances--;
      }

      return acertou;
    },
    ganhou: function () {
      return !this.acertos.includes(' ');
    },
    perdeu: function () {
      return this.chances <= 0;
    },
    acabou: function () {
      return this.ganhou() || this.perdeu();
    },
  };

  elementos.telaInicial.style.display = 'flex';
  elementos.telaJogo.style.display = 'none';
  elementos.telaMensagem.style.display = 'none';
  elementos.telaCadastro.style.display = 'none';
  elementos.telaMensagem.classList.remove('mensagem-vitoria');
  elementos.telaMensagem.classList.remove('mensagem-derrota');
  for (const parte of elementos.boneco) {
    parte.classList.remove('escondido');
    parte.classList.add('escondido');
  }

  criarTeclado();
};

const cadastrarPalavra = () => {
  elementos.telaInicial.style.display = 'none';
  elementos.telaCadastro.style.display = 'flex';
  elementos.textoMensagem.innerHTML = '<p>Voltar</p>';
  elementos.telaMensagem.style.display = 'flex';

  elementos.botoes.submeter.addEventListener('click', () => submeter());


}

const submeter = () => {
  const valor = document.querySelector('#palavraa');
  const dica = document.querySelector('#dica');
  const aux = document.querySelector('#dificuldade-cadastro');
  const selectedIndex = aux.selectedIndex;
  const dificuldade = aux.options[selectedIndex].value;

  const palavra = {
    valor: valor.value,
    dica: dica.value,
  }

  palavras[dificuldade].push(palavra)

  console.log(palavras);
}

const criarTeclado = () => {
  const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  elementos.teclado.textContent = '';
  for (const letra of letras) {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(letra.toUpperCase()));
    button.classList.add(`botao-${letra}`);

    elementos.teclado.appendChild(button);

    button.addEventListener('click', () => {

      if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {
        const acertou = jogo.jogar(letra);
        jogo.jogadas.push(letra);
        button.classList.add(acertou ? 'certo' : 'errado');
        mostrarPalavra();

        if (!acertou) {
          mostrarErro();
        }

        if (jogo.ganhou()) {
          mostrarMensagem(true);
        } else if (jogo.perdeu()) {
          mostrarMensagem(false);
        }

      }

    });
  }
};

const mostrarErro = () => {
  const parte = elementos.boneco[5 - jogo.chances];
  parte.classList.remove('escondido');
}

const mostrarMensagem = vitoria => {
  const mensagem = vitoria ? '<p>Parabéns</p><p>Você ganhou</p>' : '<p>Que pena</p><p>Você perdeu</p>';
  elementos.textoMensagem.innerHTML = mensagem;
  elementos.telaMensagem.style.display = 'flex';
  elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`);
}

const sortearPalavra = () => {
  const i = Math.floor(Math.random() * palavras[jogo.dificuldade].length)
  const palavra = palavras[jogo.dificuldade][i];
  jogo.definirPalavra(palavra);

  console.log(jogo.palavra.original);

  return jogo.palavra.original;
}

const mostrarPalavra = () => {
  elementos.palavra.textContent = '';
  for (let i = 0; i < jogo.acertos.length; i++) {
    const letra = jogo.acertos[i].toUpperCase();
    elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
  }

};

const iniciarJogo = (dificuldade) => {

  jogo.dificuldade = dificuldade;
  elementos.telaInicial.style.display = 'none';
  elementos.telaJogo.style.display = 'flex';


  sortearPalavra();
  mostrarPalavra();
};

const replace = (str, i, newChar) => str.substring(0, i) + newChar + str.substring(i + 1);

elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'));
elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'));
elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'));
elementos.botoes.cadastrar.addEventListener('click', () => cadastrarPalavra());
elementos.botoes.reiniciar.addEventListener('click', () => novoJogo());

novoJogo();