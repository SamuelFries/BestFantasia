'use strict';

/* ============================================================
   MinhaFantasia — data/magia.js
   Categoria: Fantasia & Magia (12 fantasias). Ver dicionário em data.js.
   ============================================================ */

registrarFantasias([
  {
    id: 2, nome: 'Bruxa Moderna', emoji: '🧙‍♀️', categoria: 'Fantasia & Magia',
    dificuldade: 'Média', custo: 2,
    descricao: 'Cristais na estante, caldeirão no fogão e um feitiço na ponta da língua. Mexeu com você, mexeu com o coven inteiro.',
    imagem: 'https://source.unsplash.com/600x400/?witch,magic',
    pesos: {
      genero: { fem: 6, neutro: 3 }, altura: { baixo: 3, medio: 3 }, biotipo: { magro: 3, atletico: 2 }, cabelo: { longo: 5, colorido: 7 }, barba: { sem: 3 },
      filme: { sobrevive: 5 }, festa: { rituais: 9 }, arma: { magia: 10 },
      estilo: { fantasia: 6, terror: 4 }, idade: { jovem: 4, adulto: 4 }, vibe: { impressionar: 4, assustar: 3 },
    },
    itens: [
      { nome: 'Chapéu de bruxa', emoji: '🎩', busca: 'chapéu bruxa' },
      { nome: 'Vestido preto longo', emoji: '🖤', busca: 'vestido preto longo' },
      { nome: 'Meia arrastão', emoji: '🕸️', busca: 'meia arrastão' },
      { nome: 'Colares de cristais', emoji: '🔮', busca: 'colar pedra cristal' },
      { nome: 'Vassoura decorativa', emoji: '🧹', busca: 'vassoura palha decorativa' },
      { nome: 'Batom escuro', emoji: '💄', busca: 'batom roxo escuro' },
    ],
    passos: [
      'Combine o vestido preto com a meia arrastão e empilhe os colares de cristais sem medo.',
      'Faça um olho esfumado roxo, batom escuro e finalize com o chapéu levemente torto.',
      'Ande com a vassoura como se fosse acessório de luxo e murmure "interessante…" para tudo.',
    ],
  },
  {
    id: 28, nome: 'Mago Ancião', emoji: '🧙', categoria: 'Fantasia & Magia',
    dificuldade: 'Caprichada', custo: 2,
    descricao: 'Barba lendária, cajado imponente e paciência zero com aventureiros apressados. Você não se atrasa: chega precisamente quando quer.',
    imagem: 'https://source.unsplash.com/600x400/?wizard,magic',
    pesos: {
      genero: { masc: 6, neutro: 4 }, altura: { alto: 6 }, biotipo: { magro: 6 }, cabelo: { longo: 7, careca: 4 }, barba: { cheia: 9 },
      filme: { sobrevive: 5 }, festa: { rituais: 8 }, arma: { magia: 10 },
      estilo: { fantasia: 9 }, idade: { classico: 8 }, vibe: { impressionar: 5, conforto: 3 },
    },
    itens: [
      { nome: 'Túnica longa cinza ou azul', emoji: '🥻', busca: 'túnica medieval fantasia' },
      { nome: 'Barba branca postiça', emoji: '🧔', busca: 'barba branca longa postiça' },
      { nome: 'Chapéu pontudo de mago', emoji: '🎩', busca: 'chapéu mago' },
      { nome: 'Cajado (galho grande + verniz resolve)', emoji: '🪄', busca: 'cajado madeira decorativo' },
      { nome: 'Livro antigo de capa dura', emoji: '📖', busca: 'caderno capa dura vintage' },
    ],
    passos: [
      'Vista a túnica com um cordão na cintura e pendure bolsinhas de "componentes mágicos".',
      'Ajuste a barba e o chapéu pontudo; sobrancelhas empoadas de branco dão +10 de sabedoria.',
      'Bata o cajado no chão para pedir passagem. Se alguém duvidar do seu poder: "você não vai passar!"',
    ],
  },
  {
    id: 29, nome: 'Fada Sombria', emoji: '🧚', categoria: 'Fantasia & Magia',
    dificuldade: 'Média', custo: 2,
    descricao: 'Pó de fada vencido, asas escuras e feitiços com cláusulas de rescisão. Fofura e perigo na mesma dose.',
    imagem: 'https://source.unsplash.com/600x400/?fairy,dark',
    pesos: {
      genero: { fem: 7, neutro: 3 }, altura: { baixo: 6, medio: 3 }, biotipo: { magro: 5, atletico: 3 }, cabelo: { colorido: 7, longo: 4 }, barba: { sem: 4 },
      filme: { sobrevive: 4 }, festa: { rituais: 6 }, arma: { magia: 9 },
      estilo: { fantasia: 8, terror: 3 }, idade: { teen: 4, jovem: 5 }, vibe: { impressionar: 6, assustar: 3 },
    },
    itens: [
      { nome: 'Asas de fada escuras', emoji: '🦋', busca: 'asas fada preta' },
      { nome: 'Vestido esvoaçante', emoji: '👗', busca: 'vestido tule preto' },
      { nome: 'Glitter roxo e preto', emoji: '✨', busca: 'glitter maquiagem roxo' },
      { nome: 'Coroa de galhos', emoji: '🌿', busca: 'tiara galhos coroa' },
      { nome: 'Varinha', emoji: '🪄', busca: 'varinha fada fantasia' },
    ],
    passos: [
      'Vestido esvoaçante em camadas escuras com as asas bem presas nas costas.',
      'Glitter roxo nas têmporas e pontos de luz no canto dos olhos; coroa de galhos no cabelo.',
      'Conceda "desejos" com a varinha — sempre com uma condição suspeita nas letras miúdas.',
    ],
  },
  {
    id: 30, nome: 'Sereia Encantada', emoji: '🧜‍♀️', categoria: 'Fantasia & Magia',
    dificuldade: 'Caprichada', custo: 3,
    descricao: 'Cabelo de comercial, escamas brilhando e um contrato vitalício com o glitter. Terra firme nunca foi sua praia — a praia é.',
    imagem: 'https://source.unsplash.com/600x400/?mermaid,ocean',
    pesos: {
      genero: { fem: 8 }, altura: { medio: 4, baixo: 3 }, biotipo: { atletico: 4, magro: 4 }, cabelo: { longo: 9, colorido: 5 }, barba: { sem: 4 },
      filme: { sobrevive: 4, vitima: 3 }, festa: { bebida: 4, filmes: 3 }, arma: { magia: 7 },
      estilo: { fantasia: 8 }, idade: { jovem: 6 }, vibe: { impressionar: 8 },
    },
    itens: [
      { nome: 'Saia estilo cauda de sereia', emoji: '🧜‍♀️', busca: 'saia sereia' },
      { nome: 'Top com conchas', emoji: '🐚', busca: 'top sereia conchas' },
      { nome: 'Sombra glitter azul/verde', emoji: '💙', busca: 'sombra glitter azul' },
      { nome: 'Rede de pesca fina (molde de escamas)', emoji: '🕸️', busca: 'meia arrastão' },
      { nome: 'Coroa de conchas', emoji: '👑', busca: 'tiara conchas' },
    ],
    passos: [
      'Pressione a meia arrastão na têmpora e passe a sombra por cima: escamas perfeitas ao tirar.',
      'Monte o look com a saia-cauda, o top de conchas e glitter em todo lugar que a luz tocar.',
      'Ondule o cabelo, ajuste a coroa e reclame da hidratação do ar a noite inteira.',
    ],
  },
  {
    id: 31, nome: 'Elfo da Floresta', emoji: '🧝', categoria: 'Fantasia & Magia',
    dificuldade: 'Média', custo: 2,
    descricao: 'Pontaria perfeita, cabelo de shampoo élfico e 300 anos de idade aparentando 25. A floresta confia em você.',
    imagem: 'https://source.unsplash.com/600x400/?elf,forest',
    pesos: {
      genero: { neutro: 5, fem: 4 }, altura: { alto: 5, medio: 3 }, biotipo: { magro: 6, atletico: 5 }, cabelo: { longo: 8 }, barba: { sem: 5 },
      filme: { sobrevive: 7 }, festa: { rituais: 4, filmes: 4 }, arma: { magia: 6, machado: 3 },
      estilo: { fantasia: 9 }, idade: { jovem: 4, adulto: 4 }, vibe: { impressionar: 5, conforto: 3 },
    },
    itens: [
      { nome: 'Orelhas de elfo de látex', emoji: '🧝', busca: 'orelhas elfo látex' },
      { nome: 'Capa verde com capuz', emoji: '🟢', busca: 'capa capuz verde fantasia' },
      { nome: 'Arco e flecha de brinquedo', emoji: '🏹', busca: 'arco e flecha brinquedo' },
      { nome: 'Túnica e cinto de couro', emoji: '🟤', busca: 'túnica medieval' },
      { nome: 'Coroa de folhas', emoji: '🍃', busca: 'tiara folhas dourada' },
    ],
    passos: [
      'Cole as orelhas pontudas com cuidado e esconda a borda com o cabelo solto e liso.',
      'Túnica, cinto de couro e a capa verde fechando o conjunto; coroa de folhas por cima.',
      'Arco nas costas e superioridade serena no olhar. Suspire quando alguém derrubar bebida.',
    ],
  },
  {
    id: 32, nome: 'Aprendiz de Escola de Magia', emoji: '🪄', categoria: 'Fantasia & Magia',
    dificuldade: 'Fácil', custo: 2,
    descricao: 'Uniforme impecável, varinha na manga e uma coruja de estimação imaginária. Detenção? Só se o feitiço falhar.',
    imagem: 'https://source.unsplash.com/600x400/?wizard,school',
    pesos: {
      genero: { neutro: 4 }, altura: { baixo: 5, medio: 4 }, biotipo: { magro: 5 }, cabelo: { curto: 4, colorido: 3 }, oculos: { sim: 8 },
      filme: { sobrevive: 6 }, festa: { filmes: 7, rituais: 4 }, arma: { magia: 9 },
      estilo: { fantasia: 8, pop: 4 }, idade: { teen: 8, jovem: 5 }, vibe: { divertir: 4, conforto: 4 },
    },
    itens: [
      { nome: 'Capa preta escolar', emoji: '🧥', busca: 'capa bruxo fantasia' },
      { nome: 'Gravata listrada', emoji: '👔', busca: 'gravata listrada' },
      { nome: 'Varinha mágica', emoji: '🪄', busca: 'varinha mágica fantasia' },
      { nome: 'Óculos redondos sem grau', emoji: '👓', busca: 'óculos redondo sem grau' },
      { nome: 'Cicatriz com lápis de olho (grátis)', emoji: '⚡', busca: 'lápis olho preto' },
    ],
    passos: [
      'Camisa branca, gravata listrada da sua "casa" e a capa preta por cima.',
      'Óculos redondos e, se quiser, a cicatriz de raio desenhada na testa.',
      'Aponte a varinha para portas automáticas e assuma o crédito quando abrirem.',
    ],
  },
  {
    id: 63, nome: 'Maléfica', emoji: '🖤', categoria: 'Fantasia & Magia',
    dificuldade: 'Caprichada', custo: 2,
    descricao: 'Chifres imponentes, maçãs do rosto afiadas e uma maldição guardada para quem não te convidou. Você É a festa a que não foi chamada.',
    imagem: 'https://source.unsplash.com/600x400/?dark,queen,horns',
    pesos: {
      genero: { fem: 8 }, altura: { alto: 6 }, biotipo: { magro: 6 }, cabelo: { curto: 3, careca: 3 }, barba: { sem: 4 },
      filme: { assassino: 7 }, festa: { rituais: 8 }, arma: { magia: 10 },
      estilo: { fantasia: 8, pop: 4 }, idade: { adulto: 5, classico: 4 }, vibe: { impressionar: 8, assustar: 4 },
    },
    itens: [
      { nome: 'Tiara de chifres da Maléfica', emoji: '🖤', busca: 'tiara chifres maléfica' },
      { nome: 'Vestido ou capa preta longa', emoji: '🧥', busca: 'capa preta longa gola alta' },
      { nome: 'Cajado com esfera', emoji: '🔮', busca: 'cajado bruxa esfera' },
      { nome: 'Batom vinho', emoji: '💄', busca: 'batom vinho' },
      { nome: 'Sombra roxa e contorno forte', emoji: '🟣', busca: 'paleta sombra roxa' },
    ],
    passos: [
      'Chifres bem fixos (prenda com grampos por dentro) e a capa fechada até o pescoço.',
      'Contorno agressivo nas maçãs do rosto, sombra roxa e batom vinho.',
      'Entre na festa devagar, olhe para o aniversariante e diga: "Eu não fui convidada".',
    ],
  },
  {
    id: 64, nome: 'Daenerys, Mãe dos Dragões', emoji: '🐉', categoria: 'Fantasia & Magia',
    dificuldade: 'Média', custo: 2,
    descricao: 'Cabelo platinado, títulos infinitos e um dragão no ombro. Você não pede: você liberta (o bar, no caso).',
    imagem: 'https://source.unsplash.com/600x400/?dragon,queen,blonde',
    pesos: {
      genero: { fem: 9 }, altura: { baixo: 4, medio: 4 }, biotipo: { magro: 5, atletico: 3 }, cabelo: { longo: 9, colorido: 4 }, barba: { sem: 4 },
      filme: { sobrevive: 6, assassino: 3 }, festa: { bebida: 4, rituais: 4 }, arma: { magia: 7, machado: 3 },
      estilo: { fantasia: 9, pop: 5 }, idade: { jovem: 5, adulto: 5 }, vibe: { impressionar: 8 },
    },
    itens: [
      { nome: 'Peruca platinada longa (para trançar)', emoji: '👱‍♀️', busca: 'peruca loira platinada longa' },
      { nome: 'Vestido azul ou branco', emoji: '👗', busca: 'vestido azul longo' },
      { nome: 'Dragão de pelúcia para o ombro', emoji: '🐉', busca: 'dragão pelúcia ombro' },
      { nome: 'Broche de dragão', emoji: '📌', busca: 'broche dragão' },
      { nome: 'Capa com pelo (opcional)', emoji: '🤍', busca: 'capa pelo sintético branco' },
    ],
    passos: [
      'Faça as tranças de Khaleesi na peruca (tutorial rápido resolve) e prenda o broche no ombro.',
      'Vestido longo, capa se estiver frio e o dragão de pelúcia preso com velcro no ombro.',
      'Apresente-se com todos os títulos de uma vez e diga "Dracarys" para qualquer vela.',
    ],
  },
  {
    id: 65, nome: 'Chapeleiro Maluco', emoji: '🎩', categoria: 'Fantasia & Magia',
    dificuldade: 'Caprichada', custo: 2,
    descricao: 'Cartola gigante, cabelo laranja e um chá eterno às seis da tarde. Por que um corvo se parece com uma escrivaninha? Você também não sabe.',
    imagem: 'https://source.unsplash.com/600x400/?mad,hatter,tea',
    pesos: {
      genero: { masc: 5, neutro: 4 }, altura: { medio: 4, alto: 3 }, biotipo: { magro: 5 }, cabelo: { colorido: 8, longo: 4 }, barba: { sem: 3 },
      filme: { sobrevive: 4 }, festa: { bebida: 6, rituais: 3 }, arma: { sarcasmo: 7, magia: 4 },
      estilo: { fantasia: 7, comedia: 5, pop: 4 }, idade: { jovem: 4, adulto: 4 }, vibe: { divertir: 7, impressionar: 4 },
    },
    itens: [
      { nome: 'Cartola grande', emoji: '🎩', busca: 'cartola grande fantasia' },
      { nome: 'Peruca laranja', emoji: '🟠', busca: 'peruca laranja' },
      { nome: 'Blazer estampado colorido', emoji: '🧥', busca: 'blazer estampado colorido' },
      { nome: 'Gravata-borboleta gigante', emoji: '🎀', busca: 'gravata borboleta grande' },
      { nome: 'Xícara de chá (da sua cozinha)', emoji: '🍵', busca: null },
    ],
    passos: [
      'Monte o look com o máximo de estampas que não combinam: blazer, colete, gravata-borboleta.',
      'Peruca laranja, cartola com um cartão "10/6" na fita e sombra colorida nos olhos.',
      'Carregue a xícara a noite toda e comemore o "desaniversário" de cada pessoa que encontrar.',
    ],
  },
  {
    id: 66, nome: 'Alice no País das Maravilhas', emoji: '💙', categoria: 'Fantasia & Magia',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Vestido azul, laço preto e a curiosidade que mete qualquer um em confusão. Você seguiu o coelho e deu nesta festa.',
    imagem: 'https://source.unsplash.com/600x400/?alice,wonderland',
    pesos: {
      genero: { fem: 8 }, altura: { baixo: 5, medio: 3 }, biotipo: { magro: 5 }, cabelo: { longo: 6 }, barba: { sem: 4 },
      filme: { sobrevive: 5, vitima: 3 }, festa: { filmes: 5, rituais: 3 }, arma: { magia: 6, sarcasmo: 4 },
      estilo: { fantasia: 8 }, idade: { teen: 5, jovem: 5 }, vibe: { conforto: 5, impressionar: 4 },
    },
    itens: [
      { nome: 'Vestido azul claro', emoji: '💙', busca: 'vestido azul claro' },
      { nome: 'Avental branco', emoji: '🤍', busca: 'avental branco' },
      { nome: 'Meias listradas', emoji: '🧦', busca: 'meia listrada preta branca' },
      { nome: 'Tiara com laço preto', emoji: '🎀', busca: 'tiara laço preto' },
      { nome: 'Relógio de bolso', emoji: '⏱️', busca: 'relógio de bolso' },
    ],
    passos: [
      'Vestido azul com o avental branco por cima, meias listradas e sapatilha preta.',
      'Tiara de laço, cabelo solto e um blush rosado de quem acabou de cair numa toca de coelho.',
      'Olhe para o relógio e grite "estou atrasada!" ao passar por qualquer porta.',
    ],
  },
  {
    id: 67, nome: 'Rainha Má', emoji: '🍎', categoria: 'Fantasia & Magia',
    dificuldade: 'Caprichada', custo: 3,
    descricao: 'Espelho, espelho meu: existe alguém mais bem vestida que eu nesta festa? Não. E a maçã é só uma cortesia.',
    imagem: 'https://source.unsplash.com/600x400/?evil,queen,crown',
    pesos: {
      genero: { fem: 8 }, altura: { alto: 5, medio: 3 }, biotipo: { magro: 4, atletico: 3 }, cabelo: { curto: 3, careca: 3 }, barba: { sem: 3 },
      filme: { assassino: 8 }, festa: { rituais: 7 }, arma: { magia: 8, sarcasmo: 4 },
      estilo: { fantasia: 7, terror: 3 }, idade: { adulto: 5, classico: 5 }, vibe: { impressionar: 7, assustar: 4 },
    },
    itens: [
      { nome: 'Vestido roxo com gola alta', emoji: '👗', busca: 'vestido rainha má' },
      { nome: 'Coroa dourada pontuda', emoji: '👑', busca: 'coroa rainha má' },
      { nome: 'Capa roxa ou preta', emoji: '🟣', busca: 'capa roxa longa' },
      { nome: 'Maçã vermelha (da fruteira)', emoji: '🍎', busca: null },
      { nome: 'Batom vermelho', emoji: '💄', busca: 'batom vermelho' },
    ],
    passos: [
      'Vestido roxo com a gola alta estruturada e a capa pesada caindo até o chão.',
      'Coroa bem presa, sobrancelhas arqueadas com lápis e batom vermelho perfeito.',
      'Ofereça a maçã para as pessoas mais bonitas da festa, com um sorriso lento.',
    ],
  },
  {
    id: 68, nome: 'Cruella de Vil', emoji: '🐾', categoria: 'Fantasia & Magia',
    dificuldade: 'Média', custo: 2,
    descricao: 'Metade preto, metade branco, cem por cento vilã da moda. Os dálmatas tremem; os estilistas também.',
    imagem: 'https://source.unsplash.com/600x400/?cruella,fur,blackandwhite',
    pesos: {
      genero: { fem: 8 }, altura: { alto: 5, medio: 3 }, biotipo: { magro: 6 }, cabelo: { colorido: 7, curto: 5 }, barba: { sem: 3 },
      filme: { assassino: 7 }, festa: { bebida: 6 }, arma: { sarcasmo: 9 },
      estilo: { pop: 6, fantasia: 3, comedia: 3 }, idade: { adulto: 5, classico: 5 }, vibe: { impressionar: 8 },
    },
    itens: [
      { nome: 'Peruca preta e branca', emoji: '🦓', busca: 'peruca cruella' },
      { nome: 'Casaco de pele sintética', emoji: '🧥', busca: 'casaco pele sintética' },
      { nome: 'Luvas longas vermelhas', emoji: '🧤', busca: 'luvas longas vermelhas' },
      { nome: 'Piteira decorativa', emoji: '🚬', busca: 'piteira decorativa' },
      { nome: 'Dálmata de pelúcia', emoji: '🐶', busca: 'dálmata pelúcia' },
    ],
    passos: [
      'Vestido preto, casaco de pele por cima e luvas vermelhas até o cotovelo.',
      'Peruca bicolor, batom vermelho intenso e sobrancelhas marcadas.',
      'Piteira na mão, dálmata debaixo do braço e um olhar de quem avalia o casaco de todo mundo.',
    ],
  },
]);
