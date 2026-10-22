'use strict';

/* ============================================================
   BestFantasia — data.js
   Configuração do quiz (etapas, perguntas, rótulos) e o
   registro central de fantasias. As fantasias em si ficam em
   data/*.js (uma categoria por arquivo) e se registram aqui via
   registrarFantasias(). Ordem de carga no index.html:
   data.js → data/*.js → logic.js → main.js
   ============================================================

   COMO A PONTUAÇÃO FUNCIONA (motor em logic.js)
   Cada resposta soma pontos a cada fantasia por dois caminhos:
   1. `pesos` da fantasia — gosto e personalidade, escrito à mão por
      fantasia, só nas perguntas em que ela se destaca.
   2. `regras` da opção — leem a `ficha` (ou os campos `categoria`,
      `dificuldade`, `custo`) de TODAS as fantasias de uma vez.
   Pergunta nova sobre um fato que já está na ficha = só declarar a
   pergunta com `regras` aqui; nenhuma fantasia precisa ser editada.

   Dicionário de categorias (chaves de `pesos` e state.escolhas):

   — Etapa 1 · Físico (pesos) —
   genero:  masc | fem | neutro
   pele:    clara | media | morena | negra  (PROIBIDO em pesos e
            regras — ver nota em DICAS_PELE)
   altura:  baixo | medio | alto
   biotipo: magro | atletico | forte
   cabelo:  curto | longo | colorido | careca
   barba:   sem | bigode | cavanhaque | cheia  (oculta para genero=fem)
   oculos:  sim | nao

   — Etapa 2 · Personalidade (pesos; `estilo` também tem regra) —
   idade:   teen | jovem | adulto | classico
   estilo:  terror | comedia | acao | fantasia | pop
   filme:   sobrevive | vitima | assassino
   festa:   bebida | filmes | rituais
   arma:    machado | magia | sarcasmo
   vibe:    assustar | divertir | impressionar | conforto

   — Etapa 3 · Na prática (só regras, lendo a ficha) —
   companhia: sozinho | casal | grupo
   rosto:     livre | leve | pintura | mascara
   local:     fechada | balada | rua | trabalho
   orcamento: zero | medio | alto
   esforco:   minimo | medio | capricho

   Campos de cada fantasia (ver data/*.js):
   - categoria:   uma de CATEGORIAS
   - dificuldade: 'Fácil' | 'Média' | 'Caprichada'
   - custo:       1..3 ($ a $$$)
   - ficha:       fatos objetivos, TODOS obrigatórios (ver FICHA_VALORES)
   - pesos:       { categoria: { valor: pontos } }, pontos de 1 a 10
   - itens:       lista de compras; `busca` é o termo do link de
                  afiliado Amazon (null = grátis / já tem em casa)
   - passos:      como montar, em 3 passos curtos
   - imagem:      placeholder Unsplash (trocar em produção; a UI
                  tem fallback automático se a URL falhar)

   Antes de commitar mudanças nas fantasias ou perguntas, rode:
     node ferramentas/validar.js
   ============================================================ */

const CATEGORIAS = ['Terror', 'Clássicas', 'Ação & Aventura', 'Fantasia & Magia', 'Divertidas', 'Cultura Pop'];

/* ---------- Ficha: fatos objetivos de cada fantasia ----------
   rosto:          o que vai no rosto — livre (nada), leve (maquiagem
                   simples, bigode postiço), pintura (pintura completa
                   ou prótese), mascara (máscara, capacete, lençol)
   calor:          1 fresca · 2 normal · 3 quente (inflável, pelo,
                   armadura, kigurumi, sobretudo)
   volume:         1 roupa comum · 2 acessórios grandes (asas, capa
                   longa, chapéu enorme) · 3 volumosa (inflável, caixa,
                   armadura, escudo)
   formato:        em que situações ela rende: solo, casal, grupo
   susto:          0 tranquila · 1 assustadora · 2 com sangue ou pesada
   reconhecimento: 1 só os fãs entendem · 2 a maioria · 3 todo mundo
   par:            (opcional) ids das fantasias que combinam com ela;
                   o par deve apontar de volta
   polemica:       (opcional) true para figuras políticas */
const FICHA_VALORES = {
  rosto: ['livre', 'leve', 'pintura', 'mascara'],
  calor: [1, 2, 3],
  volume: [1, 2, 3],
  formato: ['solo', 'casal', 'grupo'],
  susto: [0, 1, 2],
  reconhecimento: [1, 2, 3],
};

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
    // Feminino: a pergunta some e conta como "Sem barba", para a
    // pontuação ficar igual à de quem respondia "sem".
    ocultaSe: { genero: 'fem' },
    respostaOculta: 'sem',
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
    // Regra: bônus para as fantasias da categoria que combina com o gosto.
    opcoes: [
      { valor: 'terror',   rotulo: 'Terror, claro',        emoji: '😱',
        regras: [{ campo: 'categoria', pontos: { 'Terror': 7 } }] },
      { valor: 'comedia',  rotulo: 'Comédia',              emoji: '😂',
        regras: [{ campo: 'categoria', pontos: { 'Divertidas': 7 } }] },
      { valor: 'acao',     rotulo: 'Ação & aventura',      emoji: '💥',
        regras: [{ campo: 'categoria', pontos: { 'Ação & Aventura': 7 } }] },
      { valor: 'fantasia', rotulo: 'Fantasia & ficção',    emoji: '🐉',
        regras: [{ campo: 'categoria', pontos: { 'Fantasia & Magia': 7 } }] },
      { valor: 'pop',      rotulo: 'Séries & cultura pop', emoji: '📺',
        regras: [{ campo: 'categoria', pontos: { 'Cultura Pop': 7 } }] },
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
];

/* ---------- Etapa 3 · Na prática ----------
   Só `regras` (nenhuma fantasia tem pesos aqui). Cada regra lê um
   campo da ficha — ou `categoria`/`dificuldade`/`custo` — e soma
   `pontos[valor]`; sem correspondência, soma `senao` (padrão 0).
   Em campos-lista (formato), vale o maior ponto entre os itens.
   `motivo` aparece em "Por que você deu match" quando a opção rende
   3 pontos ou mais para a fantasia exibida. */
const PERGUNTAS_PRATICAS = [
  {
    categoria: 'companhia',
    titulo: 'Vai fantasiado com quem?',
    opcoes: [
      { valor: 'sozinho', rotulo: 'Sozinho, brilhando solo', emoji: '🧍',
        regras: [{ campo: 'formato', pontos: { solo: 4 }, senao: -6 }],
        motivo: 'brilha sozinha, sem depender de par' },
      { valor: 'casal', rotulo: 'Com meu par', emoji: '💑',
        regras: [{ campo: 'formato', pontos: { casal: 8 } }],
        motivo: 'rende fantasia de casal' },
      { valor: 'grupo', rotulo: 'Com a turma toda', emoji: '👯',
        regras: [{ campo: 'formato', pontos: { grupo: 8 } }],
        motivo: 'rende fantasia de grupo' },
    ],
  },
  {
    categoria: 'rosto',
    titulo: 'E no rosto, o que você topa?',
    opcoes: [
      { valor: 'livre', rotulo: 'Nada no rosto', emoji: '🙂',
        regras: [{ campo: 'rosto', pontos: { livre: 6, leve: 2, pintura: -10, mascara: -3 } }],
        motivo: 'não precisa de nada no rosto' },
      { valor: 'leve', rotulo: 'Só uma maquiagem leve', emoji: '💄',
        regras: [{ campo: 'rosto', pontos: { livre: 2, leve: 6, pintura: -5, mascara: 0 } }],
        motivo: 'só pede uma maquiagem leve' },
      { valor: 'pintura', rotulo: 'Pintura completa, pode vir', emoji: '🎨',
        regras: [{ campo: 'rosto', pontos: { pintura: 7, leve: 4, mascara: 3, livre: 2 } }],
        motivo: 'tem a pintura de rosto que você topou' },
      { valor: 'mascara', rotulo: 'Prefiro máscara ou capacete', emoji: '🎭',
        regras: [{ campo: 'rosto', pontos: { mascara: 8, livre: 1, leve: 0, pintura: -3 } }],
        motivo: 'esconde o rosto, do jeito que você queria' },
    ],
  },
  {
    categoria: 'local',
    titulo: 'Onde você vai usar?',
    opcoes: [
      { valor: 'fechada', rotulo: 'Festa fechada ou em casa', emoji: '🏠', regras: [] },
      { valor: 'balada', rotulo: 'Balada ou show lotado', emoji: '🪩',
        regras: [
          { campo: 'volume', pontos: { 1: 3, 2: 0, 3: -7 } },
          { campo: 'calor', pontos: { 3: -3 } },
        ],
        motivo: 'é prática para a pista lotada' },
      { valor: 'rua', rotulo: 'Bloco de rua, no calor', emoji: '☀️',
        regras: [
          { campo: 'calor', pontos: { 1: 6, 2: 0, 3: -9 } },
          { campo: 'volume', pontos: { 3: -5 } },
        ],
        motivo: 'é fresca para aguentar o calor' },
      { valor: 'trabalho', rotulo: 'Escola ou trabalho', emoji: '💼',
        regras: [
          { campo: 'susto', pontos: { 0: 3, 1: 0, 2: -12 } },
          { campo: 'polemica', pontos: { true: -10 } },
          { campo: 'volume', pontos: { 3: -3 } },
        ],
        motivo: 'é tranquila para escola ou trabalho' },
    ],
  },
  {
    categoria: 'orcamento',
    titulo: 'Quanto quer gastar?',
    opcoes: [
      { valor: 'zero', rotulo: 'Quase nada, uso o que tenho', emoji: '🪙',
        regras: [{ campo: 'custo', pontos: { 1: 7, 2: 0, 3: -7 } }],
        motivo: 'dá para montar gastando quase nada' },
      { valor: 'medio', rotulo: 'Até uns R$ 100', emoji: '💵',
        regras: [{ campo: 'custo', pontos: { 1: 3, 2: 5, 3: -3 } }],
        motivo: 'cabe no seu orçamento' },
      { valor: 'alto', rotulo: 'O que precisar', emoji: '💳',
        regras: [{ campo: 'custo', pontos: { 1: 0, 2: 3, 3: 6 } }],
        motivo: 'vale o investimento que você topou' },
    ],
  },
  {
    categoria: 'esforco',
    titulo: 'Quanto esforço você topa na montagem?',
    opcoes: [
      { valor: 'minimo', rotulo: 'Mínimo esforço, máximo efeito', emoji: '🦥',
        regras: [{ campo: 'dificuldade', pontos: { 'Fácil': 8, 'Média': 0, 'Caprichada': -8 } }],
        motivo: 'monta rápido, sem dor de cabeça' },
      { valor: 'medio', rotulo: 'Um meio-termo esperto', emoji: '⚖️',
        regras: [{ campo: 'dificuldade', pontos: { 'Fácil': 3, 'Média': 6, 'Caprichada': 1 } }],
        motivo: 'tem o meio-termo de esforço que você queria' },
      { valor: 'capricho', rotulo: 'Produção completa, sem limites', emoji: '🎬',
        regras: [{ campo: 'dificuldade', pontos: { 'Fácil': -2, 'Média': 3, 'Caprichada': 8 } }],
        motivo: 'é uma produção à altura do seu capricho' },
    ],
  },
];

/* Todas as perguntas, na ordem do quiz (usado por logic.js e pelo validador). */
const TODAS_AS_PERGUNTAS = [...ETAPAS_FISICO, ...PERGUNTAS_PERSONALIDADE, ...PERGUNTAS_PRATICAS];

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
