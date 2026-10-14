'use strict';

/* ============================================================
   BestFantasia — data.js
   Configuração do quiz (etapas, perguntas, rótulos) e o
   registro central de fantasias. As fantasias em si ficam em
   data/*.js (uma categoria por arquivo) e se registram aqui via
   registrarFantasias(). Ordem de carga no index.html:
   data.js → data/*.js → logic.js → main.js
   ============================================================

   Dicionário de categorias (chaves de `pesos` e state.escolhas):

   — Tela 2 · Físico —
   genero:  masc | fem | neutro
   altura:  baixo | medio | alto
   biotipo: magro | atletico | forte
   cabelo:  curto | longo | colorido | careca
   pele:    clara | media | morena | negra  (NÃO entra em pesos —
            ver nota em DICAS_PELE)
   barba:   sem | bigode | cavanhaque | cheia
   oculos:  sim | nao

   — Tela 3 · Personalidade —
   idade:   teen | jovem | adulto | classico
   estilo:  terror | comedia | acao | fantasia | pop
   filme:   sobrevive | vitima | assassino
   festa:   bebida | filmes | rituais
   arma:    machado | magia | sarcasmo
   vibe:    assustar | divertir | impressionar | conforto
   esforco: capricho | medio | minimo  (não entra em `pesos`:
            vira ajuste contra `dificuldade` — ver logic.js)

   Campos de cada fantasia (ver data/*.js):
   - categoria:   'Terror' | 'Clássicas' | 'Ação & Aventura' |
                  'Fantasia & Magia' | 'Divertidas' | 'Cultura Pop'
   - dificuldade: 'Fácil' | 'Média' | 'Caprichada'
   - custo:       1..3 ($ a $$$)
   - itens:       lista de compras; `busca` é o termo do link de
                  afiliado Amazon (null = grátis / já tem em casa)
   - passos:      como montar, em 3 passos curtos
   - imagem:      placeholder Unsplash (trocar em produção; a UI
                  tem fallback automático se a URL falhar)
   ============================================================ */

/* ---------- Tela 2 · Físico ---------- */
const ETAPAS_FISICO = [
  {
    categoria: 'genero',
    titulo: 'Gênero',
    rotuloCurto: 'Gênero',
    opcoes: [
      { valor: 'masc',   rotulo: 'Masculino', emoji: '🧔' },
      { valor: 'fem',    rotulo: 'Feminino',  emoji: '👩' },
      { valor: 'neutro', rotulo: 'Neutro',    emoji: '🧑‍🎤' },
    ],
  },
  {
    categoria: 'pele',
    titulo: 'Tom de pele',
    rotuloCurto: 'Pele',
    opcoes: [
      { valor: 'clara',  rotulo: 'Clara',  emoji: '👋🏻' },
      { valor: 'media',  rotulo: 'Média',  emoji: '👋🏼' },
      { valor: 'morena', rotulo: 'Morena', emoji: '👋🏽' },
      { valor: 'negra',  rotulo: 'Negra',  emoji: '👋🏿' },
    ],
  },
  {
    categoria: 'altura',
    titulo: 'Altura',
    rotuloCurto: 'Altura',
    opcoes: [
      { valor: 'baixo', rotulo: 'Baixo', emoji: '🍄' },
      { valor: 'medio', rotulo: 'Médio', emoji: '🧍' },
      { valor: 'alto',  rotulo: 'Alto',  emoji: '🦒' },
    ],
  },
  {
    categoria: 'biotipo',
    titulo: 'Biotipo',
    rotuloCurto: 'Corpo',
    opcoes: [
      { valor: 'magro',    rotulo: 'Magro',       emoji: '🦴' },
      { valor: 'atletico', rotulo: 'Atlético',    emoji: '🏃' },
      { valor: 'forte',    rotulo: 'Forte/Cheio', emoji: '🐻' },
    ],
  },
  {
    categoria: 'cabelo',
    titulo: 'Estilo de cabelo',
    rotuloCurto: 'Cabelo',
    opcoes: [
      { valor: 'curto',    rotulo: 'Curto',    emoji: '💇' },
      { valor: 'longo',    rotulo: 'Longo',    emoji: '🦁' },
      { valor: 'colorido', rotulo: 'Colorido', emoji: '🌈' },
      { valor: 'careca',   rotulo: 'Careca',   emoji: '🥚' },
    ],
  },
  {
    categoria: 'barba',
    titulo: 'Barba',
    rotuloCurto: 'Barba',
    opcoes: [
      { valor: 'sem',        rotulo: 'Sem barba',   emoji: '🪒' },
      { valor: 'bigode',     rotulo: 'Bigode',      emoji: '🥸' },
      { valor: 'cavanhaque', rotulo: 'Cavanhaque',  emoji: '🐐' },
      { valor: 'cheia',      rotulo: 'Barba cheia', emoji: '🧔' },
    ],
  },
  {
    categoria: 'oculos',
    titulo: 'Óculos',
    rotuloCurto: 'Óculos',
    opcoes: [
      { valor: 'nao', rotulo: 'Sem óculos', emoji: '👀' },
      { valor: 'sim', rotulo: 'Uso óculos', emoji: '👓' },
    ],
  },
];

/* ---------- Tela 3 · Personalidade (7 perguntas) ---------- */
const PERGUNTAS_PERSONALIDADE = [
  {
    categoria: 'idade',
    titulo: 'Para calibrar o feitiço: sua faixa etária?',
    opcoes: [
      { valor: 'teen',     rotulo: 'Menos de 18', emoji: '🐣' },
      { valor: 'jovem',    rotulo: '18 a 25',     emoji: '🎉' },
      { valor: 'adulto',   rotulo: '26 a 39',     emoji: '💼' },
      { valor: 'classico', rotulo: '40 ou mais',  emoji: '🍷' },
    ],
  },
  {
    categoria: 'estilo',
    titulo: 'O que você mais assiste?',
    opcoes: [
      { valor: 'terror',   rotulo: 'Terror, claro',        emoji: '😱' },
      { valor: 'comedia',  rotulo: 'Comédia',              emoji: '😂' },
      { valor: 'acao',     rotulo: 'Ação & aventura',      emoji: '💥' },
      { valor: 'fantasia', rotulo: 'Fantasia & ficção',    emoji: '🐉' },
      { valor: 'pop',      rotulo: 'Séries & cultura pop', emoji: '📺' },
    ],
  },
  {
    categoria: 'filme',
    titulo: 'No filme de terror, você…',
    opcoes: [
      { valor: 'sobrevive', rotulo: 'Sobrevive até o fim',   emoji: '🏃‍♀️' },
      { valor: 'vitima',    rotulo: 'É o primeiro a morrer', emoji: '🪦' },
      { valor: 'assassino', rotulo: 'É o assassino',         emoji: '🔪' },
    ],
  },
  {
    categoria: 'festa',
    titulo: 'Sua festa ideal de Halloween tem…',
    opcoes: [
      { valor: 'bebida',  rotulo: 'Muita bebida',       emoji: '🍹' },
      { valor: 'filmes',  rotulo: 'Maratona de filmes', emoji: '📽️' },
      { valor: 'rituais', rotulo: 'Rituais duvidosos',  emoji: '🕯️' },
    ],
  },
  {
    categoria: 'arma',
    titulo: 'Escolha uma arma…',
    opcoes: [
      { valor: 'machado',  rotulo: 'Machado',  emoji: '🪓' },
      { valor: 'magia',    rotulo: 'Magia',    emoji: '✨' },
      { valor: 'sarcasmo', rotulo: 'Sarcasmo', emoji: '🗿' },
    ],
  },
  {
    categoria: 'vibe',
    titulo: 'No Halloween, sua missão é…',
    opcoes: [
      { valor: 'assustar',     rotulo: 'Aterrorizar geral',             emoji: '👹' },
      { valor: 'divertir',     rotulo: 'Fazer todo mundo rir',          emoji: '🤣' },
      { valor: 'impressionar', rotulo: 'Vencer o concurso de fantasia', emoji: '🏆' },
      { valor: 'conforto',     rotulo: 'Ficar no estilo sem sofrer',    emoji: '🛋️' },
    ],
  },
  {
    categoria: 'esforco',
    titulo: 'Quanto esforço você topa na montagem?',
    opcoes: [
      { valor: 'capricho', rotulo: 'Produção completa, sem limites', emoji: '🎬' },
      { valor: 'medio',    rotulo: 'Um meio-termo esperto',          emoji: '⚖️' },
      { valor: 'minimo',   rotulo: 'Mínimo esforço, máximo efeito',  emoji: '🦥' },
    ],
  },
];

/* ---------- Rótulos amigáveis dos "motivos do match" ---------- */
const ROTULOS_MATCH = {
  genero: {
    masc:   'sua energia clássica de monstro',
    fem:    'sua presença enfeitiçante',
    neutro: 'sua vibe de outro plano',
  },
  altura: {
    baixo: 'seu tamanho compacto (ideal para emboscadas)',
    medio: 'sua altura estrategicamente mediana',
    alto:  'sua presença imponente',
  },
  biotipo: {
    magro:    'sua silhueta esguia',
    atletico: 'seu cardio de sobrevivente',
    forte:    'sua força de arrancar portas',
  },
  cabelo: {
    curto:    'seu cabelo prático de fuga rápida',
    longo:    'seus cabelos dramáticos ao vento',
    colorido: 'seu cabelo em pleno surto criativo',
    careca:   'sua cabeça aerodinâmica',
  },
  barba: {
    sem:        'seu rosto lisinho de protagonista',
    bigode:     'seu bigode de respeito',
    cavanhaque: 'seu cavanhaque estratégico',
    cheia:      'sua barba de lenda',
  },
  oculos: {
    sim: 'seus óculos de intelectual perigoso',
    nao: 'sua visão 20/20 de predador',
  },
  idade: {
    teen:     'sua energia jovem e caótica',
    jovem:    'seu pique de festa infinita',
    adulto:   'seu equilíbrio entre o caos e o boleto',
    classico: 'seu status de lenda clássica',
  },
  estilo: {
    terror:   'seu coração que bate por terror',
    comedia:  'seu dom natural de fazer rir',
    acao:     'sua sede de aventura',
    fantasia: 'sua alma de outro reino',
    pop:      'seu repertório infinito de cultura pop',
  },
  filme: {
    sobrevive: 'seu instinto de sobrevivente',
    vitima:    'seu talento nato para o azar',
    assassino: 'sua energia de vilão de franquia',
  },
  festa: {
    bebida:  'seu espírito 100% festeiro',
    filmes:  'sua alma cinéfila',
    rituais: 'seu gosto refinado pelo oculto',
  },
  arma: {
    machado:  'sua diplomacia à base de machado',
    magia:    'sua afinidade mística',
    sarcasmo: 'sua língua mais afiada que foice',
  },
  vibe: {
    assustar:     'sua missão sagrada de aterrorizar',
    divertir:     'sua missão sagrada de fazer rir',
    impressionar: 'sua fome de troféu',
    conforto:     'sua sabedoria suprema do conforto',
  },
};

/* ---------- Dicas de maquiagem por tom de pele ----------
   REGRA DE OURO: o tom de pele NUNCA entra na pontuação. Fantasia
   não tem cor — qualquer pessoa pode ser qualquer personagem, e
   jamais sugerimos alterar a cor da pele. A escolha serve só para
   o resumo do perfil e para estas dicas práticas de
   contraste de tintas, glitters e efeitos no guia de montagem. */
const DICAS_PELE = {
  clara:
    'Tons neon, roxo e preto contrastam forte em você. Para efeito "pálido" (vampiro, fantasma) use base marfim: branco puro fica chapado e artificial.',
  media:
    'Dourado, cobre e glitter holográfico ficam incríveis. Para efeitos pálidos, misture a tinta branca com um pouco da sua base para não "acinzentar".',
  morena:
    'Tinta branca e cores neon dão contraste máximo: caveira, esqueleto e Catrina ficam espetaculares. Glitter dourado e bronze realçam ainda mais.',
  negra:
    'Branco, prata e neon têm contraste altíssimo em você: maquiagens de caveira, esqueleto e Catrina ficam cinematográficas. Glitter dourado e cobre brilham demais.',
};

/* ---------- Registro central de fantasias ----------
   Cada arquivo em data/ chama registrarFantasias([...]) para
   adicionar sua categoria. logic.js e main.js só enxergam FANTASIAS. */
const FANTASIAS = [];

function registrarFantasias(lista) {
  lista.forEach((fantasia) => {
    if (FANTASIAS.some((f) => f.id === fantasia.id)) {
      console.warn(`[BestFantasia] id duplicado ignorado: ${fantasia.id} (${fantasia.nome})`);
      return;
    }
    FANTASIAS.push(fantasia);
  });
}
