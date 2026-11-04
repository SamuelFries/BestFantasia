'use strict';

/* ============================================================
   BestFantasia — temas/carnaval.js
   Tema de Carnaval. Cada tema é um objeto em TEMAS[id] com:

   id, nome, emoji   identificação; o emoji vira o favicon
   corTema           cor da barra do navegador (meta theme-color);
                     as demais cores ficam em style.css, no bloco
                     :root[data-tema="<id>"]
   floaters          5 emojis decorativos do fundo (index.html)
   confete           (opcional) chuva de confete no fundo de todas as
                     páginas: { cores: [...], quantidade } (tema.js)
   textos            textos das telas; `data-texto="chave"` recebe
                     texto puro e `data-html="chave"` recebe HTML
   perguntas         enunciado e opções das perguntas que mudam com
                     a época (só rotulo/emoji: as chaves são fixas)
   rotulosMatch      sobrescreve ROTULOS_MATCH (data.js)
   dicasPele         sobrescreve DICAS_PELE (data.js)
   regras            ajustes globais de pontuação, no formato das
                     `regras` das opções (ver PERGUNTAS_PRATICAS)

   Para ativar um tema, mude TEMA_PADRAO em tema.js. Para ver outro
   tema sem publicar, abra o site com ?tema=<id>.
   ============================================================ */

var TEMAS = typeof TEMAS === 'undefined' ? {} : TEMAS;

TEMAS.carnaval = {
  id: 'carnaval',
  nome: 'Carnaval',
  emoji: '🎭',
  corTema: '#0b0a1f',
  floaters: ['🎭', '🎉', '🥁', '🎊', '🪇'],
  confete: {
    cores: ['#ff2d95', '#ffd23f', '#2cf0a0', '#3fd3ff', '#ff7a3d', '#b983ff'],
    quantidade: 80,
  },

  textos: {
    badgeHome: '🎭 Especial de Carnaval',
    subtituloHome:
      'A bateria descobre a fantasia perfeita para você e entrega o ' +
      '<strong>guia completo de montagem</strong>: itens, passo a passo e onde comprar. ' +
      '<em>Se tiver samba no pé.</em> 💃',
    botaoComecar: '🎉 Descobrir Minha Fantasia',
    notaHome: '⏱️ 2 minutinhos &nbsp;•&nbsp; 🎭 <span id="total-fantasias">300</span> fantasias, de clássicos a cultura pop &nbsp;•&nbsp; 🧵 guia de montagem incluso',
    subtituloPersonalidade: 'Perguntas rápidas. A bateria detecta mentiras (e julga).',
    subtituloPratica: 'Para a fantasia caber no seu bloco, no seu rosto e no seu bolso.',
    botaoConsultar: 'Chamar a Bateria 🥁',
    orbLoading: '🥁',
    tituloLoading: 'Esquentando a bateria…',
    frasesLoading: [
      'Afinando o surdo… 🥁',
      'Contando o glitter… ✨',
      'Medindo seu guarda-roupa de bloco… 👗',
      'Negociando com o trio elétrico… 🚚',
    ],
    badgeResultado: '🎊 Guia da sua fantasia',
    motivoFallback: 'uma química de bloco inexplicável ✨',
    rodape: 'Feito com 💚 e muito glitter · Nenhum confete foi desperdiçado de verdade.',
    toastCopiado: '🔗 Copiado! Vá convocar o grupo do bloco.',
    compartilhar: (f) =>
      `🎭 O BestFantasia revelou: minha fantasia ideal de Carnaval é ${f.emoji} ${f.nome} (${f.compatibilidade}% de match)! Descubra a sua + o guia de montagem:`,
  },

  /* As chaves (sobrevive/vitima/assassino…) são as mesmas do Halloween
     para os pesos das 289 fantasias continuarem valendo: cada opção
     aqui é a versão carnavalesca do mesmo traço de personalidade. */
  perguntas: {
    idade: { titulo: 'Para calibrar o samba no pé: sua faixa etária?' },
    filme: {
      titulo: 'No bloco, você é quem…',
      opcoes: {
        sobrevive: { rotulo: 'Aguenta até o último bloco',     emoji: '🏃‍♀️' },
        vitima:    { rotulo: 'Se perde da turma na primeira hora', emoji: '🫠' },
        assassino: { rotulo: 'Comanda o trio e manda em todo mundo', emoji: '📣' },
      },
    },
    festa: {
      titulo: 'Seu Carnaval ideal tem…',
      opcoes: {
        bebida:  { rotulo: 'Muita bebida',               emoji: '🍹' },
        filmes:  { rotulo: 'Maratona de desfiles na TV', emoji: '📺' },
        rituais: { rotulo: 'Baile de máscaras e mistério', emoji: '🎭' },
      },
    },
    arma: {
      titulo: 'Sua arma no bloco…',
      opcoes: {
        machado:  { rotulo: 'Força bruta',       emoji: '💪' },
        magia:    { rotulo: 'Magia e glitter',   emoji: '✨' },
        sarcasmo: { rotulo: 'Sarcasmo',          emoji: '🗿' },
      },
    },
    vibe: {
      titulo: 'No Carnaval, sua missão é…',
      opcoes: {
        assustar:     { rotulo: 'Chocar geral',                   emoji: '😈' },
        divertir:     { rotulo: 'Fazer todo mundo rir',           emoji: '🤣' },
        impressionar: { rotulo: 'Vencer o concurso de fantasia',  emoji: '🏆' },
        conforto:     { rotulo: 'Curtir no estilo sem sofrer',    emoji: '🛋️' },
      },
    },
  },

  rotulosMatch: {
    genero: {
      masc:   'sua energia de rei do bloco',
      fem:    'sua presença de rainha de bateria',
      neutro: 'sua vibe de outro planeta',
    },
    altura: {
      baixo: 'seu tamanho compacto (ideal para furar bloco)',
      medio: 'sua altura estrategicamente mediana',
      alto:  'sua presença imponente no alto do trio',
    },
    biotipo: {
      magro:    'sua silhueta esguia',
      atletico: 'seu cardio de quem fecha o bloco',
      forte:    'sua força de abrir caminho na multidão',
    },
    cabelo: {
      curto:    'seu cabelo prático para o calor',
      longo:    'seus cabelos dramáticos ao vento',
      colorido: 'seu cabelo em pleno surto criativo',
      careca:   'sua cabeça pronta para o glitter',
    },
    oculos: {
      sim: 'seus óculos de intelectual folião',
      nao: 'sua visão 20/20 para achar a turma no bloco',
    },
    filme: {
      sobrevive: 'seu fôlego de quem fecha o bloco',
      vitima:    'seu talento nato para se perder da turma',
      assassino: 'sua energia de quem comanda o trio',
    },
    festa: {
      bebida:  'seu espírito 100% festeiro',
      filmes:  'sua alma de jurado de desfile',
      rituais: 'seu gosto refinado pelo mistério',
    },
    arma: {
      machado:  'sua diplomacia à base de músculo',
      magia:    'sua afinidade com glitter e magia',
      sarcasmo: 'sua língua mais afiada que confete',
    },
    vibe: {
      assustar:     'sua missão sagrada de chocar',
      divertir:     'sua missão sagrada de fazer rir',
      impressionar: 'sua fome de troféu',
      conforto:     'sua sabedoria suprema do conforto',
    },
  },

  dicasPele: {
    clara:
      'Rosa neon, azul e roxo contrastam forte em você. Glitter prata e holográfico brilham sem "apagar" a pele; para pintura corporal, prefira cores saturadas ao branco puro.',
    media:
      'Dourado, cobre e glitter holográfico ficam incríveis. Rosa-choque e turquesa dão o contraste de bloco; misture o glitter com um pouco de base para fixar no calor.',
    morena:
      'Neon, branco e prata dão contraste máximo, e glitter dourado e bronze realçam ainda mais. Pinturas e máscaras em cores vibrantes ficam espetaculares.',
    negra:
      'Branco, prata, neon e dourado têm contraste altíssimo em você: glitter e pinturas em cores vivas ficam cinematográficas. Tons metálicos brilham demais.',
  },

  /* Carnaval é calor e rua: fantasia fresca ganha um empurrão e a
     pesada (sangue, gore) perde um pouco. Valores pequenos de propósito:
     toda fantasia continua podendo vencer. Penalizar fantasia quente
     (calor 3) já deixava a Guerreira Viking sem chance, por isso só há
     bônus para a fresca. O validador confere o alcance no tema padrão. */
  regras: [
    { campo: 'calor', pontos: { 1: 2 } },
    { campo: 'susto', pontos: { 2: -3 } },
  ],
};
