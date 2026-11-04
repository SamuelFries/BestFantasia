'use strict';

/* ============================================================
   BestFantasia — temas/halloween.js
   Tema de Halloween: cores (ver style.css), textos das telas,
   enunciados das perguntas de personalidade, rótulos dos motivos
   e dicas de maquiagem. Para ativar, mude TEMA_PADRAO em tema.js.
   O formato do objeto está documentado em temas/carnaval.js.
   ============================================================ */

var TEMAS = typeof TEMAS === 'undefined' ? {} : TEMAS;

TEMAS.halloween = {
  id: 'halloween',
  nome: 'Halloween',
  emoji: '🎃',
  corTema: '#0b0614',
  floaters: ['🦇', '🎃', '👻', '🕷️', '🕸️'],

  textos: {
    badgeHome: '🎃 Especial de Halloween',
    subtituloHome:
      'Os espíritos descobrem a fantasia perfeita para você e entregam o ' +
      '<strong>guia completo de montagem</strong>: itens, passo a passo e onde comprar. ' +
      '<em>Se tiver coragem.</em> 👀',
    botaoComecar: '👻 Descobrir Minha Fantasia',
    notaHome: '⏱️ 2 minutinhos &nbsp;•&nbsp; 🧛 <span id="total-fantasias">300</span> fantasias, de clássicos a cultura pop &nbsp;•&nbsp; 🧵 guia de montagem incluso',
    subtituloPersonalidade: 'Perguntas rápidas. Os espíritos detectam mentiras (e julgam).',
    subtituloPratica: 'Para a fantasia caber na sua festa, no seu rosto e no seu bolso.',
    botaoConsultar: 'Consultar os Espíritos 🔮',
    orbLoading: '🔮',
    tituloLoading: 'Consultando os espíritos…',
    frasesLoading: [
      'Mexendo o caldeirão… 🫕',
      'Acordando os mortos… ⚰️',
      'Medindo seu guarda-roupa astral… 👗',
      'Negociando com os corvos… 🐦‍⬛',
    ],
    badgeResultado: '🔮 Guia da sua fantasia',
    motivoFallback: 'uma conexão espiritual inexplicável ✨',
    rodape: 'Feito com 🧡 e magia negra · Nenhum espírito foi incomodado de verdade.',
    toastCopiado: '🔗 Copiado! Vá assombrar o grupo da família.',
    compartilhar: (f) =>
      `🎃 O BestFantasia revelou: minha fantasia ideal de Halloween é ${f.emoji} ${f.nome} (${f.compatibilidade}% de match)! Descubra a sua + o guia de montagem:`,
  },

  /* Enunciados e opções das perguntas (só o que muda com a época).
     As chaves (categoria/valor) são as mesmas em todos os temas: os
     pesos das fantasias não precisam mudar. */
  perguntas: {
    idade: { titulo: 'Para calibrar o feitiço: sua faixa etária?' },
    filme: {
      titulo: 'No filme de terror, você…',
      opcoes: {
        sobrevive: { rotulo: 'Sobrevive até o fim',   emoji: '🏃‍♀️' },
        vitima:    { rotulo: 'É o primeiro a morrer', emoji: '🪦' },
        assassino: { rotulo: 'É o assassino',         emoji: '🔪' },
      },
    },
    festa: {
      titulo: 'Sua festa ideal de Halloween tem…',
      opcoes: {
        bebida:  { rotulo: 'Muita bebida',       emoji: '🍹' },
        filmes:  { rotulo: 'Maratona de filmes', emoji: '📽️' },
        rituais: { rotulo: 'Rituais duvidosos',  emoji: '🕯️' },
      },
    },
    arma: {
      titulo: 'Escolha uma arma…',
      opcoes: {
        machado:  { rotulo: 'Machado',  emoji: '🪓' },
        magia:    { rotulo: 'Magia',    emoji: '✨' },
        sarcasmo: { rotulo: 'Sarcasmo', emoji: '🗿' },
      },
    },
    vibe: {
      titulo: 'No Halloween, sua missão é…',
      opcoes: {
        assustar:     { rotulo: 'Aterrorizar geral',             emoji: '👹' },
        divertir:     { rotulo: 'Fazer todo mundo rir',          emoji: '🤣' },
        impressionar: { rotulo: 'Vencer o concurso de fantasia', emoji: '🏆' },
        conforto:     { rotulo: 'Ficar no estilo sem sofrer',    emoji: '🛋️' },
      },
    },
  },

  /* "Por que você deu match": sobrescreve ROTULOS_MATCH de data.js. */
  rotulosMatch: {
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
    oculos: {
      sim: 'seus óculos de intelectual perigoso',
      nao: 'sua visão 20/20 de predador',
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
  },

  /* Dicas de contraste de maquiagem por tom de pele (ver DICAS_PELE). */
  dicasPele: {
    clara:
      'Tons neon, roxo e preto contrastam forte em você. Para efeito "pálido" (vampiro, fantasma) use base marfim: branco puro fica chapado e artificial.',
    media:
      'Dourado, cobre e glitter holográfico ficam incríveis. Para efeitos pálidos, misture a tinta branca com um pouco da sua base para não "acinzentar".',
    morena:
      'Tinta branca e cores neon dão contraste máximo: caveira, esqueleto e Catrina ficam espetaculares. Glitter dourado e bronze realçam ainda mais.',
    negra:
      'Branco, prata e neon têm contraste altíssimo em você: maquiagens de caveira, esqueleto e Catrina ficam cinematográficas. Glitter dourado e cobre brilham demais.',
  },

  /* Ajustes globais de pontuação da época (lidos pelo logic.js).
     No Halloween vale tudo: nenhum ajuste. */
  regras: [],
};
