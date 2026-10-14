'use strict';

/* ============================================================
   MinhaFantasia — data/divertidas.js
   Categoria: Divertidas (14 fantasias). Ver dicionário em data.js.
   ============================================================ */

registrarFantasias([
  {
    id: 5, nome: 'Fantasma de Lençol Chique', emoji: '👻', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Esforço mínimo, impacto máximo. Você assombra com estilo e ainda economiza na fantasia. Gênio.',
    imagem: 'https://source.unsplash.com/600x400/?ghost,sheet',
    pesos: {
      genero: { neutro: 6 }, altura: { baixo: 3, medio: 2 }, biotipo: { magro: 4 }, cabelo: { careca: 4, curto: 3 },
      filme: { vitima: 7 }, festa: { filmes: 7 }, arma: { sarcasmo: 8 },
      estilo: { comedia: 7 }, idade: { jovem: 4, adulto: 3 }, vibe: { conforto: 7, divertir: 6 },
    },
    itens: [
      { nome: 'Lençol branco (da sua cama mesmo)', emoji: '🛏️', busca: null },
      { nome: 'Óculos escuros por cima do lençol', emoji: '🕶️', busca: 'óculos escuros clássico' },
      { nome: 'Boina ou chapéu estiloso', emoji: '🎩', busca: 'boina francesa' },
      { nome: 'Tesoura para os buracos dos olhos', emoji: '✂️', busca: null },
    ],
    passos: [
      'Centralize o lençol na cabeça e marque onde ficam os olhos antes de cortar (parece óbvio, mas confie).',
      'Corte dois círculos limpos e vista; ajuste para não pisar na barra.',
      'Óculos escuros e boina POR CIMA do lençol. Pronto: o fantasma mais fotografável da festa.',
    ],
  },
  {
    id: 15, nome: 'Cientista Maluco', emoji: '🧪', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Ética duvidosa, cabelo elétrico e um "confia em mim" que nunca termina bem. A ciência agradece (e se esconde).',
    imagem: 'https://source.unsplash.com/600x400/?laboratory,scientist',
    pesos: {
      genero: { masc: 3, neutro: 4 }, altura: { baixo: 4, medio: 3 }, biotipo: { magro: 5 }, cabelo: { colorido: 8, careca: 4 }, oculos: { sim: 6 },
      filme: { assassino: 3, sobrevive: 3 }, festa: { rituais: 8 }, arma: { magia: 6, sarcasmo: 5 },
      estilo: { comedia: 5, fantasia: 3 }, idade: { adulto: 4, classico: 3 }, vibe: { divertir: 5, conforto: 4 },
    },
    itens: [
      { nome: 'Jaleco branco', emoji: '🥼', busca: 'jaleco branco' },
      { nome: 'Peruca despenteada (ou gel para arrepiar)', emoji: '🤯', busca: 'peruca einstein' },
      { nome: 'Óculos de proteção', emoji: '🥽', busca: 'óculos proteção laboratório' },
      { nome: 'Luvas de látex', emoji: '🧤', busca: 'luvas látex' },
      { nome: 'Tubos de ensaio com corante', emoji: '🧪', busca: 'tubo ensaio plástico' },
    ],
    passos: [
      'Suje o jaleco com manchas "suspeitas" de caneta e marcas de queimado (desenhadas, por favor).',
      'Arrepie o cabelo para todas as direções e pendure os óculos de proteção na testa.',
      'Carregue um tubo com líquido colorido e ria baixinho olhando para ele de vez em quando.',
    ],
  },
  {
    id: 33, nome: 'T-Rex Inflável', emoji: '🦖', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 3,
    descricao: 'Braços curtos, fama gigante. Você não dança bem, mas ninguém na história das festas se divertiu mais que um T-Rex inflável.',
    imagem: 'https://source.unsplash.com/600x400/?trex,dinosaur',
    pesos: {
      genero: { neutro: 5 }, altura: { baixo: 4, medio: 3 }, biotipo: { forte: 5, magro: 3 },
      filme: { vitima: 6 }, festa: { bebida: 6 }, arma: { sarcasmo: 7 },
      estilo: { comedia: 9 }, idade: { teen: 5, jovem: 5 }, vibe: { divertir: 9 },
    },
    itens: [
      { nome: 'Fantasia inflável de T-Rex', emoji: '🦖', busca: 'fantasia inflável dinossauro' },
      { nome: 'Pilhas AA para o ventilador', emoji: '🔋', busca: 'pilha AA pacote' },
      { nome: 'Roupa leve por baixo (esquenta!)', emoji: '🩳', busca: null },
      { nome: 'Tênis confortável', emoji: '👟', busca: null },
    ],
    passos: [
      'Vista roupa leve, entre na fantasia e ligue o ventilador — confira as pilhas ANTES de sair.',
      'Peça ajuda para fechar o zíper e teste a visão pela telinha (spoiler: você não vê quase nada).',
      'Corra em círculos pequenos na pista. É fisicamente impossível alguém não rir.',
    ],
  },
  {
    id: 34, nome: 'Banana Protagonista', emoji: '🍌', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 2,
    descricao: 'Amarela, confiante e levemente escorregadia. Toda festa tem uma banana — e, sejamos honestos, ela sempre rouba a cena.',
    imagem: 'https://source.unsplash.com/600x400/?banana,yellow',
    pesos: {
      genero: { neutro: 4 }, altura: { alto: 5 }, biotipo: { magro: 6 },
      filme: { vitima: 7 }, festa: { bebida: 7 }, arma: { sarcasmo: 8 },
      estilo: { comedia: 9 }, idade: { jovem: 6, teen: 4 }, vibe: { divertir: 8 },
    },
    itens: [
      { nome: 'Fantasia de banana', emoji: '🍌', busca: 'fantasia banana adulto' },
      { nome: 'Roupa amarela ou preta por baixo', emoji: '🟡', busca: null },
      { nome: 'Óculos escuros (banana estilosa)', emoji: '🕶️', busca: 'óculos escuros' },
      { nome: 'Tênis branco', emoji: '👟', busca: null },
    ],
    passos: [
      'Vista a banana por cima de roupa confortável — o rosto fica para fora, sorria de acordo.',
      'Óculos escuros para o charme. A banana é séria nos compromissos dela.',
      'Posicione-se em TODAS as fotos. A banana não pede licença: ela aparece.',
    ],
  },
  {
    id: 35, nome: 'Turista Perdido', emoji: '🧳', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Camisa havaiana, pochete regulamentar e um mapa aberto do tamanho de um lençol. Você não está perdido: está "explorando".',
    imagem: 'https://source.unsplash.com/600x400/?tourist,hawaiian',
    pesos: {
      genero: { masc: 4 }, altura: { medio: 4 }, biotipo: { forte: 4, magro: 3 }, cabelo: { careca: 4, curto: 4 }, barba: { bigode: 3 },
      filme: { vitima: 8 }, festa: { bebida: 8 }, arma: { sarcasmo: 7 },
      estilo: { comedia: 8 }, idade: { adulto: 6, classico: 4 }, vibe: { conforto: 9, divertir: 5 },
    },
    itens: [
      { nome: 'Camisa havaiana', emoji: '🌺', busca: 'camisa havaiana floral' },
      { nome: 'Pochete', emoji: '👝', busca: 'pochete' },
      { nome: 'Chapéu bucket ou de palha', emoji: '👒', busca: 'chapéu bucket' },
      { nome: 'Mapa impresso gigante (grátis)', emoji: '🗺️', busca: null },
      { nome: 'Meia branca + chinelo (do armário, infelizmente)', emoji: '🩴', busca: null },
      { nome: 'Protetor de nariz branco (zinco)', emoji: '🧴', busca: 'protetor solar bastão' },
    ],
    passos: [
      'Camisa havaiana aberta sobre camiseta, bermuda cargo e a combinação proibida: meia com chinelo.',
      'Pochete na cintura, chapéu, nariz branco de protetor e o mapa aberto na mão.',
      'Pare no meio da pista, gire o mapa confuso e pergunte onde fica a festa… estando na festa.',
    ],
  },
  {
    id: 36, nome: 'Unicórnio Aconchegante', emoji: '🦄', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 2,
    descricao: 'Mítico, raro e extremamente confortável. Enquanto todo mundo sofre no salto, você brilha de pijama. Quem venceu?',
    imagem: 'https://source.unsplash.com/600x400/?unicorn,rainbow',
    pesos: {
      genero: { fem: 5, neutro: 4 }, altura: { baixo: 5 }, biotipo: { forte: 3, magro: 3 }, cabelo: { colorido: 9 },
      filme: { vitima: 4, sobrevive: 3 }, festa: { filmes: 5, bebida: 4 }, arma: { magia: 6, sarcasmo: 4 },
      estilo: { comedia: 6, fantasia: 5 }, idade: { teen: 6, jovem: 5 }, vibe: { conforto: 7, divertir: 6 },
    },
    itens: [
      { nome: 'Pijama kigurumi de unicórnio', emoji: '🦄', busca: 'pijama kigurumi unicórnio' },
      { nome: 'Tiara de chifre (reforço)', emoji: '🌟', busca: 'tiara unicórnio' },
      { nome: 'Saia tutu arco-íris (versão alternativa)', emoji: '🌈', busca: 'saia tutu colorida' },
      { nome: 'Glitter holográfico', emoji: '✨', busca: 'glitter holográfico maquiagem' },
      { nome: 'Meias coloridas', emoji: '🧦', busca: 'meias coloridas kit' },
    ],
    passos: [
      'Caminho 1 (conforto máximo): kigurumi + glitter nas bochechas. Pronto, literalmente.',
      'Caminho 2 (festa quente): tutu arco-íris, top branco, tiara de chifre e meias coloridas.',
      'Em ambos: brilhe, tire fotos e lembre a todos que unicórnios não suam — eles "reluzem".',
    ],
  },
  {
    id: 37, nome: 'Robô de Papelão', emoji: '🤖', categoria: 'Divertidas',
    dificuldade: 'Caprichada', custo: 1,
    descricao: 'Beep boop. Processador movido a refrigerante, coração de LED e dança do robô tecnicamente obrigatória. Erro 404: vergonha não encontrada.',
    imagem: 'https://source.unsplash.com/600x400/?robot,cardboard',
    pesos: {
      genero: { neutro: 6 }, altura: { medio: 4, baixo: 3 }, biotipo: { forte: 4, magro: 3 }, cabelo: { careca: 5 },
      filme: { vitima: 5, sobrevive: 3 }, festa: { filmes: 6 }, arma: { sarcasmo: 6, magia: 3 },
      estilo: { comedia: 6, fantasia: 4 }, idade: { teen: 7 }, vibe: { divertir: 7 },
    },
    itens: [
      { nome: 'Caixas de papelão (corpo e cabeça — grátis no mercado)', emoji: '📦', busca: null },
      { nome: 'Tinta spray prata', emoji: '🥈', busca: 'tinta spray prata' },
      { nome: 'Fita adesiva metalizada', emoji: '🩹', busca: 'fita adesiva prata' },
      { nome: 'Pistola de cola quente', emoji: '🔫', busca: 'pistola cola quente' },
      { nome: 'Luzes LED adesivas', emoji: '💡', busca: 'luz led adesiva pilha' },
      { nome: 'Tampas e botões para colar', emoji: '🔘', busca: null },
    ],
    passos: [
      'Corte os buracos de braço e cabeça nas caixas e pinte tudo de prata (ao ar livre!).',
      'Cole tampinhas como botões, desenhe um "painel de controle" e instale os LEDs no peito.',
      'Vista por cima de roupa preta e só se mova em ângulos retos. Beep boop é resposta para tudo.',
    ],
  },
  {
    id: 38, nome: 'Alienígena Retrô', emoji: '👽', categoria: 'Divertidas',
    dificuldade: 'Média', custo: 2,
    descricao: 'Veio estudar os humanos e ficou pela playlist. Seu relatório para a nave-mãe: "civilização estranha, festas excelentes".',
    imagem: 'https://source.unsplash.com/600x400/?alien,ufo',
    pesos: {
      genero: { neutro: 7 }, altura: { baixo: 5, alto: 3 }, biotipo: { magro: 7 }, cabelo: { careca: 6, colorido: 4 },
      filme: { assassino: 3, sobrevive: 3 }, festa: { bebida: 5, rituais: 4 }, arma: { magia: 5, sarcasmo: 5 },
      estilo: { fantasia: 6, comedia: 4 }, idade: { jovem: 5, teen: 4 }, vibe: { divertir: 5, impressionar: 4 },
    },
    itens: [
      { nome: 'Tinta facial verde ou prata', emoji: '🟢', busca: 'tinta facial verde' },
      { nome: 'Tiara de antenas', emoji: '📡', busca: 'tiara antena alien' },
      { nome: 'Legging ou roupa metalizada', emoji: '🥈', busca: 'legging metalizada prata' },
      { nome: 'Óculos futuristas', emoji: '🕶️', busca: 'óculos rave futurista' },
      { nome: 'Glitter holográfico', emoji: '✨', busca: 'glitter holográfico' },
    ],
    passos: [
      'Pinte o rosto (e orelhas! todo mundo esquece as orelhas) de verde ou prata.',
      'Look metalizado dos pés à cabeça, antenas firmes e os óculos futuristas.',
      'Aponte para objetos comuns perguntando "para que serve isto?" — compromisso com a personagem.',
    ],
  },
  {
    id: 69, nome: 'Nerd Clássico', emoji: '🤓', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Óculos remendados, calça na altura do peito e um QI que intimida. Você corrige a gramática do convite e ainda assim é convidado.',
    imagem: 'https://source.unsplash.com/600x400/?nerd,glasses',
    pesos: {
      genero: { masc: 4, neutro: 3 }, altura: { baixo: 4, medio: 3 }, biotipo: { magro: 7 }, cabelo: { curto: 5 }, barba: { sem: 5 }, oculos: { sim: 10 },
      filme: { vitima: 6, sobrevive: 4 }, festa: { filmes: 7 }, arma: { sarcasmo: 7, magia: 3 },
      estilo: { comedia: 7 }, idade: { teen: 4, jovem: 4, adulto: 3 }, vibe: { divertir: 6, conforto: 6 },
    },
    itens: [
      { nome: 'Óculos grandes com fita no meio', emoji: '🤓', busca: 'óculos nerd fantasia' },
      { nome: 'Camisa xadrez abotoada até em cima (a sua)', emoji: '👔', busca: null },
      { nome: 'Suspensório', emoji: '🎽', busca: 'suspensório' },
      { nome: 'Gravata-borboleta', emoji: '🎀', busca: 'gravata borboleta' },
      { nome: 'Meias brancas (com sandália, se tiver coragem)', emoji: '🧦', busca: 'meia branca cano alto' },
    ],
    passos: [
      'Camisa abotoada até o último botão, calça puxada acima do umbigo e suspensório esticado.',
      'Cole fita adesiva branca no meio dos óculos e penteie o cabelo com risca lateral bem marcada.',
      'Carregue um livro grosso e corrija a pronúncia de todo mundo. Com carinho.',
    ],
  },
  {
    id: 70, nome: 'Fatia de Pizza Ambulante', emoji: '🍕', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 2,
    descricao: 'Quente, popular e desejada por todos às 3 da manhã. Você é a única fantasia que faz as pessoas sentirem fome.',
    imagem: 'https://source.unsplash.com/600x400/?pizza,slice',
    pesos: {
      genero: { neutro: 5 }, altura: { medio: 4 }, biotipo: { forte: 5, magro: 3 },
      filme: { vitima: 7 }, festa: { bebida: 6, filmes: 4 }, arma: { sarcasmo: 8 },
      estilo: { comedia: 9 }, idade: { teen: 4, jovem: 5 }, vibe: { divertir: 8, conforto: 4 },
    },
    itens: [
      { nome: 'Fantasia de fatia de pizza', emoji: '🍕', busca: 'fantasia pizza adulto' },
      { nome: 'Roupa preta por baixo (a sua)', emoji: '🖤', busca: null },
      { nome: 'Caixa de pizza vazia (grátis na pizzaria)', emoji: '📦', busca: null },
      { nome: 'Tênis', emoji: '👟', busca: null },
    ],
    passos: [
      'Vista a fatia por cima da roupa preta; se a fantasia for de pano, reforce o "queijo" com espuma.',
      'Carregue a caixa de pizza vazia como acessório e ofereça "delivery" para as pessoas.',
      'Fique perto da mesa de comida. É onde você pertence e onde as fotos acontecem.',
    ],
  },
  {
    id: 71, nome: 'Gnomo de Jardim', emoji: '🍄', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Chapéu pontudo, barba até o cinto e a serenidade de quem passa décadas parado no mesmo canteiro. Você protege o jardim e o open bar.',
    imagem: 'https://source.unsplash.com/600x400/?gnome,garden',
    pesos: {
      genero: { masc: 4, neutro: 4 }, altura: { baixo: 9 }, biotipo: { forte: 5 }, cabelo: { careca: 4 }, barba: { cheia: 10 },
      filme: { sobrevive: 4, vitima: 4 }, festa: { bebida: 5 }, arma: { magia: 5, sarcasmo: 5 },
      estilo: { comedia: 7, fantasia: 4 }, idade: { classico: 5, adulto: 4 }, vibe: { divertir: 7, conforto: 5 },
    },
    itens: [
      { nome: 'Chapéu vermelho pontudo', emoji: '🔺', busca: 'chapéu gnomo vermelho' },
      { nome: 'Barba branca postiça (se precisar)', emoji: '🧔', busca: 'barba branca longa postiça' },
      { nome: 'Camisa azul', emoji: '🟦', busca: 'camisa azul manga longa' },
      { nome: 'Calça marrom e cinto preto largo', emoji: '🟫', busca: 'cinto preto largo' },
      { nome: 'Regador pequeno', emoji: '🪴', busca: 'regador pequeno' },
    ],
    passos: [
      'Camisa azul para dentro da calça marrom, cinto preto largo com fivela grande e botas.',
      'Chapéu pontudo até as sobrancelhas, bochechas rosadas de blush e a barba alinhada.',
      'Fique parado em um canto com o regador. Quando alguém olhar, mude de posição. Só então.',
    ],
  },
  {
    id: 72, nome: 'Aeróbica Anos 80', emoji: '🎀', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Collant neon, polainas e uma playlist que não sabe o que é silêncio. Você não dança: você faz "step".',
    imagem: 'https://source.unsplash.com/600x400/?aerobics,80s,neon',
    pesos: {
      genero: { fem: 6, neutro: 3 }, altura: { medio: 4 }, biotipo: { atletico: 8 }, cabelo: { longo: 5, colorido: 5 }, barba: { sem: 3 },
      filme: { sobrevive: 5 }, festa: { bebida: 7, filmes: 3 }, arma: { sarcasmo: 5 },
      estilo: { comedia: 7 }, idade: { classico: 5, adulto: 4, jovem: 3 }, vibe: { divertir: 7, conforto: 6 },
    },
    itens: [
      { nome: 'Collant neon', emoji: '💗', busca: 'collant neon feminino' },
      { nome: 'Legging colorida', emoji: '🩷', busca: 'legging colorida estampada' },
      { nome: 'Polainas de lã', emoji: '🧦', busca: 'polaina lã colorida' },
      { nome: 'Faixa de cabeça esportiva', emoji: '🎽', busca: 'faixa cabeça esportiva' },
      { nome: 'Munhequeiras', emoji: '💪', busca: 'munhequeira colorida' },
    ],
    passos: [
      'Collant por cima da legging, polainas dobradas e tênis branco de cano alto.',
      'Cabelo preso bem alto com scrunchie, faixa na testa e maquiagem com blush forte.',
      'Comande um "aquecimento" surpresa no meio da festa. Todo mundo participa, ninguém reclama.',
    ],
  },
  {
    id: 73, nome: 'Tripulante do Among Us', emoji: '🚀', categoria: 'Divertidas',
    dificuldade: 'Média', custo: 2,
    descricao: 'Ninguém sabe se você é inocente. Você também não. Mas a reunião de emergência já foi convocada e o suspeito é… vermelho.',
    imagem: 'https://source.unsplash.com/600x400/?astronaut,colorful,toy',
    pesos: {
      genero: { neutro: 7 }, altura: { baixo: 5, medio: 3 }, biotipo: { forte: 4, magro: 3 },
      filme: { assassino: 8, sobrevive: 3 }, festa: { filmes: 4, bebida: 4 }, arma: { sarcasmo: 7, machado: 4 },
      estilo: { comedia: 7, pop: 5 }, idade: { teen: 9, jovem: 5 }, vibe: { divertir: 8 },
    },
    itens: [
      { nome: 'Fantasia inflável Among Us (ou macacão colorido)', emoji: '🚀', busca: 'fantasia among us inflável' },
      { nome: 'Mochila pequena da mesma cor', emoji: '🎒', busca: 'mochila pequena lisa' },
      { nome: 'Papel celofane azul para o visor', emoji: '🟦', busca: 'papel celofane azul' },
      { nome: 'Papelão para a estrutura do visor (grátis)', emoji: '📦', busca: null },
    ],
    passos: [
      'Macacão de uma cor só (ou o inflável) com a mochila pequena presa nas costas.',
      'Monte o visor: recorte um oval de papelão, cubra com celofane azul e prenda na altura do rosto.',
      'Acuse alguém de impostor a cada 10 minutos. Saia do "vent" (banheiro) com cara de inocente.',
    ],
  },
  {
    id: 74, nome: 'Minion', emoji: '💛', categoria: 'Divertidas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Amarelo, pequeno e movido a banana. Você fala uma língua própria e ainda assim é a pessoa mais compreendida da festa.',
    imagem: 'https://source.unsplash.com/600x400/?minion,yellow',
    pesos: {
      genero: { neutro: 6 }, altura: { baixo: 8 }, biotipo: { forte: 5, magro: 3 }, cabelo: { careca: 5, curto: 3 }, oculos: { sim: 6 },
      filme: { vitima: 6 }, festa: { bebida: 5, filmes: 4 }, arma: { sarcasmo: 6, magia: 3 },
      estilo: { comedia: 8, pop: 5 }, idade: { teen: 7, jovem: 3 }, vibe: { divertir: 8, conforto: 5 },
    },
    itens: [
      { nome: 'Camiseta ou moletom amarelo', emoji: '💛', busca: 'camiseta amarela lisa' },
      { nome: 'Macacão jeans', emoji: '👖', busca: 'macacão jeans adulto' },
      { nome: 'Óculos de Minion', emoji: '🥽', busca: 'óculos minion fantasia' },
      { nome: 'Gorro amarelo', emoji: '🧢', busca: 'gorro amarelo' },
      { nome: 'Luvas pretas', emoji: '🧤', busca: 'luvas pretas' },
    ],
    passos: [
      'Camiseta amarela por baixo do macacão jeans, gorro amarelo e luvas pretas.',
      'Óculos de Minion (ou óculos de proteção com fita preta em volta).',
      'Fale só "banana", "bello" e "papoy". Ninguém vai entender e todo mundo vai concordar.',
    ],
  },
]);
