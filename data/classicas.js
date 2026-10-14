'use strict';

/* ============================================================
   MinhaFantasia — data/classicas.js
   Categoria: Clássicas (13 fantasias). Ver dicionário em data.js.
   ============================================================ */

registrarFantasias([
  {
    id: 7, nome: 'Esqueleto Neon', emoji: '💀', categoria: 'Clássicas',
    dificuldade: 'Fácil', custo: 2,
    descricao: 'Zero gordura, zero vergonha e brilho no escuro. Você dança até o osso — literalmente.',
    imagem: 'https://source.unsplash.com/600x400/?skeleton,neon',
    pesos: {
      genero: { neutro: 4, fem: 2 }, altura: { alto: 4 }, biotipo: { magro: 10 }, cabelo: { careca: 6 },
      filme: { sobrevive: 3, vitima: 3 }, festa: { bebida: 8 }, arma: { sarcasmo: 5 },
      estilo: { comedia: 4 }, idade: { teen: 4, jovem: 6 }, vibe: { divertir: 5, conforto: 4 },
    },
    itens: [
      { nome: 'Fantasia de esqueleto que brilha no escuro', emoji: '🦴', busca: 'fantasia esqueleto neon adulto' },
      { nome: 'Tinta facial preta e branca', emoji: '🎨', busca: 'tinta facial halloween' },
      { nome: 'Pulseiras neon', emoji: '💚', busca: 'pulseira neon festa' },
      { nome: 'Tênis branco confortável', emoji: '👟', busca: null },
    ],
    passos: [
      'Vista o macacão de esqueleto (ou camiseta e calça pretas com ossos pintados).',
      'Pinte a caveira no rosto: base branca, olhos pretos fundos e nariz triangular.',
      'Distribua as pulseiras neon e vá direto para a pista de dança iluminar o ambiente.',
    ],
  },
  {
    id: 8, nome: 'Monstro de Frankenstein', emoji: '⚡', categoria: 'Clássicas',
    dificuldade: 'Média', custo: 2,
    descricao: 'Grande, incompreendido e cheio de pontos (de costura). No fundo, você só quer um abraço… bem forte.',
    imagem: 'https://source.unsplash.com/600x400/?frankenstein,monster',
    pesos: {
      genero: { masc: 6 }, altura: { alto: 9 }, biotipo: { forte: 10 }, cabelo: { careca: 5, curto: 3 }, barba: { sem: 2 },
      filme: { vitima: 6 }, festa: { filmes: 4 }, arma: { machado: 6 },
      estilo: { terror: 5 }, idade: { classico: 5, adulto: 3 }, vibe: { assustar: 5, divertir: 3 },
    },
    itens: [
      { nome: 'Blazer escuro apertado (ombros marcados)', emoji: '🧥', busca: 'blazer preto' },
      { nome: 'Tinta facial verde', emoji: '🟢', busca: 'tinta facial verde' },
      { nome: 'Parafusos de pescoço', emoji: '🔩', busca: 'kit frankenstein parafusos pescoço' },
      { nome: 'Bota tratorada', emoji: '🥾', busca: 'bota tratorada preta' },
      { nome: 'Lápis preto para cicatrizes', emoji: '✏️', busca: 'lápis olho preto' },
    ],
    passos: [
      'Vista o blazer um número menor para os ombros parecerem gigantes; suba a barra da calça.',
      'Pinte o rosto de verde e desenhe cicatrizes com pontos de costura na testa e no pescoço.',
      'Cole os parafusos no pescoço e ande duro, de braços esticados. Grunhidos são bem-vindos.',
    ],
  },
  {
    id: 9, nome: 'Múmia Enrolada', emoji: '🏺', categoria: 'Clássicas',
    dificuldade: 'Média', custo: 1,
    descricao: 'Milênios de soneca e ainda acorda icônica. Você é a prova viva (ou quase) de que skincare funciona.',
    imagem: 'https://source.unsplash.com/600x400/?mummy,egypt',
    pesos: {
      genero: { neutro: 4 }, altura: { baixo: 4, medio: 3 }, biotipo: { magro: 6 }, cabelo: { careca: 8 },
      filme: { sobrevive: 4, vitima: 4 }, festa: { rituais: 6 }, arma: { magia: 5 },
      estilo: { terror: 4 }, idade: { classico: 4, adulto: 3 }, vibe: { conforto: 3, assustar: 3 },
    },
    itens: [
      { nome: 'Rolos de atadura/gaze (muitos!)', emoji: '🩹', busca: 'atadura gaze rolo 10 unidades' },
      { nome: 'Roupa bege ou branca por baixo', emoji: '🤍', busca: null },
      { nome: 'Chá preto para "envelhecer" a gaze', emoji: '🍵', busca: 'chá preto caixa' },
      { nome: 'Alfinetes de segurança', emoji: '🧷', busca: 'alfinete segurança kit' },
      { nome: 'Sombra marrom para olheiras', emoji: '🟤', busca: 'paleta sombra marrom' },
    ],
    passos: [
      'Na véspera, mergulhe a gaze em chá preto e deixe secar: efeito "3.000 anos de tumba" garantido.',
      'Vista a roupa clara e enrole a gaze por cima, prendendo com alfinetes e deixando pontas soltas.',
      'Esfumace olheiras marrons e saia andando rígido, reclamando do despertador dos faraós.',
    ],
  },
  {
    id: 10, nome: 'Diabinho de Plantão', emoji: '😈', categoria: 'Clássicas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Pequeno no tamanho, gigante na travessura. Sua especialidade? Ideias péssimas apresentadas com muito carisma.',
    imagem: 'https://source.unsplash.com/600x400/?devil,red',
    pesos: {
      genero: { fem: 3, masc: 3 }, altura: { baixo: 8 }, biotipo: { atletico: 4 }, cabelo: { curto: 4, colorido: 4 }, barba: { cavanhaque: 3 },
      filme: { assassino: 4 }, festa: { bebida: 8 }, arma: { sarcasmo: 9 },
      estilo: { comedia: 5 }, idade: { jovem: 6, teen: 3 }, vibe: { divertir: 6, impressionar: 3 },
    },
    itens: [
      { nome: 'Tiara de chifres', emoji: '😈', busca: 'tiara chifres vermelho' },
      { nome: 'Roupa toda vermelha ou preta', emoji: '🟥', busca: null },
      { nome: 'Rabo de diabo', emoji: '🔱', busca: 'rabo diabo fantasia' },
      { nome: 'Tridente pequeno', emoji: '🔱', busca: 'tridente fantasia' },
      { nome: 'Batom vermelho', emoji: '💄', busca: 'batom vermelho' },
    ],
    passos: [
      'Monte um look monocromático vermelho (ou preto com detalhes vermelhos) com o que já tem no armário.',
      'Prenda o rabo, ajuste a tiara de chifres e capriche no batom.',
      'Circule com o tridente apontando para a pista de dança como quem diz "a travessura começa aqui".',
    ],
  },
  {
    id: 11, nome: 'Anjo Caído', emoji: '🪽', categoria: 'Clássicas',
    dificuldade: 'Média', custo: 2,
    descricao: 'Aura celestial, decisões questionáveis. Você caiu do céu, mas caiu com pose de capa de álbum.',
    imagem: 'https://source.unsplash.com/600x400/?angel,wings',
    pesos: {
      genero: { fem: 6, neutro: 3 }, altura: { alto: 6 }, biotipo: { atletico: 5, magro: 3 }, cabelo: { longo: 8 }, barba: { sem: 4 },
      filme: { sobrevive: 5 }, festa: { rituais: 4, filmes: 3 }, arma: { magia: 8 },
      estilo: { fantasia: 5 }, idade: { jovem: 5, adulto: 3 }, vibe: { impressionar: 7 },
    },
    itens: [
      { nome: 'Asas pretas (ou brancas sujas de cinza)', emoji: '🪽', busca: 'asas anjo preta fantasia' },
      { nome: 'Auréola', emoji: '😇', busca: 'tiara auréola' },
      { nome: 'Look branco ou todo preto', emoji: '🤍', busca: null },
      { nome: 'Glitter prata', emoji: '✨', busca: 'glitter maquiagem prata' },
      { nome: 'Delineador marcante', emoji: '✏️', busca: 'delineador preto gel' },
    ],
    passos: [
      'Escolha o lado: branco celestial com detalhes "queimados", ou todo preto com a auréola torta.',
      'Prenda as asas por cima do look e espalhe glitter nas maçãs do rosto e nos ombros.',
      'Delineado dramático, olhar de tédio eterno e pose: você não anda, você desfila a queda.',
    ],
  },
  {
    id: 14, nome: 'Gato Preto Misterioso', emoji: '🐈‍⬛', categoria: 'Clássicas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Sete vidas, zero paciência e um talento nato para aparecer onde não foi chamado. Azar? Só para os outros.',
    imagem: 'https://source.unsplash.com/600x400/?black-cat,night',
    pesos: {
      genero: { fem: 8 }, altura: { baixo: 6, medio: 3 }, biotipo: { atletico: 6, magro: 4 }, cabelo: { curto: 5, longo: 3 }, barba: { sem: 4 },
      filme: { sobrevive: 8 }, festa: { filmes: 7 }, arma: { sarcasmo: 8 },
      estilo: { comedia: 3 }, idade: { jovem: 4, adulto: 4 }, vibe: { conforto: 7, impressionar: 3 },
    },
    itens: [
      { nome: 'Tiara de orelhas de gato', emoji: '🐱', busca: 'tiara orelha gato preta' },
      { nome: 'Roupa preta (do armário)', emoji: '🖤', busca: null },
      { nome: 'Rabo de gato', emoji: '〰️', busca: 'rabo gato fantasia' },
      { nome: 'Delineador para focinho e bigodes', emoji: '✏️', busca: 'delineador preto' },
      { nome: 'Choker com guizo', emoji: '🔔', busca: 'choker sino guizo' },
    ],
    passos: [
      'Monte um look preto confortável da cabeça aos pés — você vai querer repetir essa fantasia.',
      'Desenhe o nariz triangular, três bigodes de cada lado e um delineado puxado felino.',
      'Orelhas, rabo e guizo no pescoço. Derrube um copo da mesa olhando nos olhos de alguém (opcional).',
    ],
  },
  {
    id: 20, nome: 'Catrina Floral', emoji: '🌺', categoria: 'Clássicas',
    dificuldade: 'Caprichada', custo: 2,
    descricao: 'A caveira mais elegante das Américas. Flores no cabelo, arte no rosto e uma lição: a morte pode ser um espetáculo.',
    imagem: 'https://source.unsplash.com/600x400/?catrina,day-of-the-dead',
    pesos: {
      genero: { fem: 8 }, altura: { medio: 3, alto: 3 }, biotipo: { magro: 4 }, cabelo: { longo: 6, colorido: 3 }, barba: { sem: 3 },
      filme: { sobrevive: 4 }, festa: { rituais: 7 }, arma: { magia: 5 },
      estilo: { fantasia: 4, terror: 3 }, idade: { adulto: 5, classico: 4 }, vibe: { impressionar: 9 },
    },
    itens: [
      { nome: 'Kit de maquiagem caveira mexicana', emoji: '💀', busca: 'kit maquiagem caveira mexicana' },
      { nome: 'Coroa de flores', emoji: '🌺', busca: 'tiara flores coroa' },
      { nome: 'Vestido preto ou colorido', emoji: '👗', busca: 'vestido longo preto' },
      { nome: 'Colares coloridos', emoji: '📿', busca: 'colar contas coloridas' },
      { nome: 'Leque ou mantilha de renda', emoji: '🪭', busca: 'leque renda preto' },
    ],
    passos: [
      'Reserve 1h para a maquiagem: base branca, órbitas floridas, "costuras" na boca e detalhes coloridos.',
      'Coroa de flores firme no alto e vestido elegante — a Catrina não conhece "look básico".',
      'Finalize com os colares e o leque; mova-se devagar, como quem lidera o desfile dos mortos.',
    ],
  },
  {
    id: 49, nome: 'Faraó do Nilo', emoji: '🏺', categoria: 'Clássicas',
    dificuldade: 'Média', custo: 2,
    descricao: 'Ouro no pescoço, olhar de quem mandou construir pirâmides e paciência zero com rebeliões. A festa é sua colônia.',
    imagem: 'https://source.unsplash.com/600x400/?pharaoh,egypt,gold',
    pesos: {
      genero: { masc: 6, neutro: 3 }, altura: { medio: 3, alto: 4 }, biotipo: { atletico: 5, forte: 4 }, cabelo: { careca: 7, curto: 3 }, barba: { cavanhaque: 5 },
      filme: { assassino: 4, sobrevive: 4 }, festa: { rituais: 7 }, arma: { magia: 6 },
      estilo: { fantasia: 5, acao: 3 }, idade: { classico: 5, adulto: 4 }, vibe: { impressionar: 7 },
    },
    itens: [
      { nome: 'Toucado de faraó (nemes)', emoji: '👑', busca: 'toucado faraó' },
      { nome: 'Colar egípcio dourado', emoji: '📿', busca: 'colar egípcio dourado' },
      { nome: 'Túnica branca', emoji: '🤍', busca: 'túnica branca longa' },
      { nome: 'Cajado dourado', emoji: '🪄', busca: 'cajado faraó' },
      { nome: 'Delineador preto', emoji: '✏️', busca: 'delineador preto' },
    ],
    passos: [
      'Túnica branca com um cinto dourado e o colar largo por cima — o ouro é o protagonista.',
      'Toucado na cabeça e delineado egípcio puxado nas duas pontas dos olhos.',
      'Cajado na mão e ordens para os "servos" buscarem bebida. Pirâmides não se constroem sozinhas.',
    ],
  },
  {
    id: 50, nome: 'Cleópatra', emoji: '🐍', categoria: 'Clássicas',
    dificuldade: 'Média', custo: 2,
    descricao: 'Impérios caíram por um olhar seu. Franja impecável, serpentes no braço e a certeza de que todo mundo na festa deve algo a você.',
    imagem: 'https://source.unsplash.com/600x400/?cleopatra,egypt',
    pesos: {
      genero: { fem: 9 }, altura: { medio: 4 }, biotipo: { magro: 4, atletico: 4 }, cabelo: { longo: 6, curto: 4 }, barba: { sem: 4 },
      filme: { assassino: 5, sobrevive: 4 }, festa: { bebida: 5, rituais: 4 }, arma: { sarcasmo: 5, magia: 5 },
      estilo: { fantasia: 4, acao: 3 }, idade: { adulto: 5, classico: 4 }, vibe: { impressionar: 8 },
    },
    itens: [
      { nome: 'Peruca chanel preta com franja', emoji: '💇‍♀️', busca: 'peruca chanel preta franja' },
      { nome: 'Vestido branco ou dourado', emoji: '👗', busca: 'vestido longo dourado' },
      { nome: 'Colar egípcio largo', emoji: '📿', busca: 'colar egípcio dourado' },
      { nome: 'Braceletes de serpente', emoji: '🐍', busca: 'bracelete serpente dourado' },
      { nome: 'Delineador para o olho egípcio', emoji: '✏️', busca: 'delineador preto gel' },
    ],
    passos: [
      'Vestido longo com o colar largo e braceletes de serpente nos dois braços.',
      'Peruca com franja reta e delineado alongado até as têmporas, com sombra azul ou dourada.',
      'Entre na festa como quem entra em Roma: devagar, com séquito imaginário e sem pedir licença.',
    ],
  },
  {
    id: 51, nome: 'Deusa Grega', emoji: '🏛️', categoria: 'Clássicas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Um lençol, uma coroa de louros e pronto: o Olimpo inteiro te deve favores. Elegância divina com orçamento mortal.',
    imagem: 'https://source.unsplash.com/600x400/?greek,goddess,statue',
    pesos: {
      genero: { fem: 7, neutro: 3 }, altura: { alto: 5, medio: 3 }, biotipo: { atletico: 4, magro: 3 }, cabelo: { longo: 7 }, barba: { sem: 3 },
      filme: { sobrevive: 6 }, festa: { bebida: 5 }, arma: { magia: 6, sarcasmo: 3 },
      estilo: { fantasia: 6 }, idade: { jovem: 5, adulto: 4 }, vibe: { impressionar: 6, conforto: 5 },
    },
    itens: [
      { nome: 'Lençol ou tecido branco para a toga (grátis)', emoji: '🛏️', busca: null },
      { nome: 'Coroa de louros dourada', emoji: '🌿', busca: 'tiara louros dourada' },
      { nome: 'Cordão dourado para a cintura', emoji: '➰', busca: 'cordão dourado decorativo' },
      { nome: 'Sandália gladiadora', emoji: '👡', busca: 'sandália gladiadora' },
      { nome: 'Braceletes dourados', emoji: '💫', busca: 'bracelete dourado' },
    ],
    passos: [
      'Dobre o tecido em um ombro, prenda com broche ou alfinete e amarre o cordão dourado na cintura.',
      'Coroa de louros, cabelo solto com ondas e pele iluminada com glitter dourado.',
      'Fale em profecias e abençoe (ou amaldiçoe) as bebidas dos convidados.',
    ],
  },
  {
    id: 52, nome: 'Cavaleiro Medieval', emoji: '⚔️', categoria: 'Clássicas',
    dificuldade: 'Caprichada', custo: 3,
    descricao: 'Honra, armadura e uma espada que você jura que não é de brinquedo. Dragões (e filas de bar) não têm chance.',
    imagem: 'https://source.unsplash.com/600x400/?knight,armor',
    pesos: {
      genero: { masc: 5, neutro: 3 }, altura: { alto: 5, medio: 3 }, biotipo: { forte: 6, atletico: 5 }, cabelo: { curto: 4, longo: 3 }, barba: { cheia: 5, cavanhaque: 3 },
      filme: { sobrevive: 7 }, festa: { bebida: 5 }, arma: { machado: 9 },
      estilo: { fantasia: 6, acao: 6 }, idade: { adulto: 4, teen: 3 }, vibe: { impressionar: 5 },
    },
    itens: [
      { nome: 'Camiseta estampa cota de malha', emoji: '🔗', busca: 'camiseta cota de malha' },
      { nome: 'Elmo medieval', emoji: '⛑️', busca: 'elmo medieval fantasia' },
      { nome: 'Espada de brinquedo', emoji: '⚔️', busca: 'espada medieval brinquedo' },
      { nome: 'Escudo', emoji: '🛡️', busca: 'escudo medieval brinquedo' },
      { nome: 'Tabardo com brasão', emoji: '🏰', busca: 'tabardo medieval' },
    ],
    passos: [
      'Cota de malha por baixo, tabardo com brasão por cima e cinto largo segurando a espada.',
      'Elmo (ou capuz de malha), luvas e botas escuras; se quiser, pinte "ferrugem" nas bordas.',
      'Ajoelhe-se diante da pessoa que trouxe as bebidas e jure lealdade. É o protocolo.',
    ],
  },
  {
    id: 53, nome: 'Bombeiro Herói', emoji: '🧯', categoria: 'Clássicas',
    dificuldade: 'Fácil', custo: 2,
    descricao: 'Suspensório, capacete e a aura de quem salva gatinhos de árvores. Qualquer "pegou fogo" na pista é problema seu.',
    imagem: 'https://source.unsplash.com/600x400/?firefighter,helmet',
    pesos: {
      genero: { masc: 5, fem: 3 }, altura: { medio: 4, alto: 4 }, biotipo: { atletico: 7, forte: 6 }, cabelo: { curto: 6 }, barba: { bigode: 5, sem: 3 },
      filme: { sobrevive: 8 }, festa: { bebida: 6 }, arma: { machado: 8 },
      estilo: { acao: 6 }, idade: { adulto: 6, jovem: 3 }, vibe: { impressionar: 5, conforto: 4 },
    },
    itens: [
      { nome: 'Jaqueta com faixas refletivas', emoji: '🧥', busca: 'jaqueta bombeiro fantasia' },
      { nome: 'Capacete de bombeiro', emoji: '⛑️', busca: 'capacete bombeiro fantasia' },
      { nome: 'Suspensório vermelho', emoji: '🟥', busca: 'suspensório vermelho' },
      { nome: 'Machado de brinquedo', emoji: '🪓', busca: 'machado bombeiro brinquedo' },
      { nome: 'Bota preta (a sua)', emoji: '🥾', busca: null },
    ],
    passos: [
      'Camiseta branca, suspensório, calça escura e a jaqueta com faixas refletivas aberta.',
      'Capacete na cabeça, um pouco de fuligem (sombra cinza) no rosto para o efeito "saí do incêndio".',
      'Machado no ombro e frases prontas: "fique calma, senhora, eu cuido do churrasco".',
    ],
  },
  {
    id: 54, nome: 'Hippie Anos 70', emoji: '☮️', categoria: 'Clássicas',
    dificuldade: 'Fácil', custo: 1,
    descricao: 'Paz, amor e calça boca de sino. Você não chegou atrasado: o tempo é uma construção, meu bem.',
    imagem: 'https://source.unsplash.com/600x400/?hippie,70s',
    pesos: {
      genero: { neutro: 4 }, altura: { medio: 4 }, biotipo: { magro: 4, forte: 3 }, cabelo: { longo: 9, colorido: 4 }, barba: { cheia: 6, sem: 2 }, oculos: { sim: 4 },
      filme: { vitima: 5, sobrevive: 3 }, festa: { bebida: 7, filmes: 3 }, arma: { magia: 5, sarcasmo: 5 },
      estilo: { comedia: 5 }, idade: { classico: 6, adulto: 4 }, vibe: { conforto: 8, divertir: 5 },
    },
    itens: [
      { nome: 'Óculos redondos com lente colorida', emoji: '🕶️', busca: 'óculos redondo lente colorida' },
      { nome: 'Faixa de cabeça / bandana', emoji: '🎀', busca: 'bandana cabeça' },
      { nome: 'Camiseta tie-dye', emoji: '🌈', busca: 'camiseta tie dye' },
      { nome: 'Calça boca de sino', emoji: '👖', busca: 'calça pantalona boca de sino' },
      { nome: 'Colar com símbolo da paz', emoji: '☮️', busca: 'colar símbolo paz' },
    ],
    passos: [
      'Tie-dye, boca de sino e colares empilhados; sandália ou pés descalços (na festa certa).',
      'Faixa na testa, cabelo solto e óculos coloridos; flores de tecido no cabelo dão o toque final.',
      'Faça o sinal da paz em todas as fotos e chame todo mundo de "irmão" — inclusive os inimigos.',
    ],
  },
]);
