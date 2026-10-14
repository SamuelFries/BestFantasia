'use strict';

/* ============================================================
   BestFantasia — main.js
   Estado da UI, navegação entre telas (SPA) e eventos.
   Depende de data.js (conteúdo) e logic.js (algoritmo),
   carregados antes deste arquivo no index.html.
   ============================================================ */

/* ---------------- Configuração ---------------- */

// A Tela 4 DEVE durar 4 segundos: tempo de exposição do ad nativo.
const DURACAO_LOADING_MS = 4000;

// Duração do fade entre telas (espelhada na animação do style.css).
const DURACAO_FADE_MS = 300;

/* ==============================================================
   MONETIZAÇÃO · AFILIADOS AMAZON
   Troque pelo seu tag do Programa de Associados da Amazon.
   Cada item do guia vira um link de busca com esse tag — os
   botões "Ver na Amazon" da Tela 5 usam rel="sponsored".
   ============================================================== */
const AMAZON_AFFILIATE_TAG = 'SEUTAG-20';

const urlAmazon = (termoBusca) =>
  `https://www.amazon.com.br/s?k=${encodeURIComponent(termoBusca)}&tag=${AMAZON_AFFILIATE_TAG}`;

/* ==============================================================
   MONETIZAÇÃO · BLOCOS DO GOOGLE ADSENSE
   Depois da aprovação, crie um bloco de display para cada posição em
   Anúncios → Por bloco de anúncios e cole o número do bloco
   (data-ad-slot) em `slot`. Posição sem número fica oculta no site.
   Âncora e vinheta não entram aqui: são ligadas no painel, em
   Anúncios automáticos (deixe "anúncios na página" desligado).
   ============================================================== */
const ADSENSE_CLIENT = 'ca-pub-2662281603112502';

const BLOCOS_ADSENSE = {
  // Tela de resultado (celular e PC)
  resultadoAposCartao: { slot: '', formato: 'responsivo' },
  resultadoAposPassos: { slot: '', formato: 'responsivo' },
  resultadoBase:       { slot: '', formato: 'banner' },
  // Laterais fixas, só em telas a partir de 1280×720 (ver style.css)
  lateralEsquerda:     { slot: '', formato: 'vertical' },
  lateralDireita:      { slot: '', formato: 'vertical' },
};

// O banner da base é fixo e pequeno para a página de resultado não
// passar de ~30% de anúncios (limite do Better Ads). A coluna de
// conteúdo tem a mesma largura no celular e no PC.
const ESTILO_POR_FORMATO = {
  vertical: 'display:inline-block;width:160px;height:600px',
  banner: 'display:inline-block;width:320px;height:100px',
};

// Frases que giram abaixo do título durante o loading.
const FRASES_LOADING = [
  'Mexendo o caldeirão… 🫕',
  'Acordando os mortos… ⚰️',
  'Medindo seu guarda-roupa astral… 👗',
  'Negociando com os corvos… 🐦‍⬛',
];

// Barra de progresso fixa no topo, por tela.
const PROGRESSO_POR_TELA = {
  'screen-home': '0%',
  'screen-fisico': '25%',
  'screen-personalidade': '50%',
  'screen-pratica': '75%',
  'screen-loading': '90%',
  'screen-resultado': '100%',
};

// Etapas do quiz, na ordem. O botão de cada uma leva à próxima; o da
// última consulta os espíritos. Pergunta nova numa etapa = só data.js.
const ETAPAS_QUIZ = [
  { tela: 'screen-fisico', container: '#grupos-fisico', perguntas: ETAPAS_FISICO,
    modoLinha: false, botao: '#btn-fisico-continuar', textoPronto: 'Continuar ➡️' },
  { tela: 'screen-personalidade', container: '#perguntas-personalidade', perguntas: PERGUNTAS_PERSONALIDADE,
    modoLinha: true, botao: '#btn-personalidade-continuar', textoPronto: 'Continuar ➡️' },
  { tela: 'screen-pratica', container: '#perguntas-praticas', perguntas: PERGUNTAS_PRATICAS,
    modoLinha: true, botao: '#btn-pratica-continuar', textoPronto: 'Consultar os Espíritos 🔮' },
];

// Rótulo amigável do custo (1..3).
const ROTULO_CUSTO = { 1: '$', 2: '$$', 3: '$$$' };

// Selos da ficha exibidos no resultado (ajudam a decidir antes de comprar).
const SELO_ROSTO = {
  livre: '🙂 Nada no rosto',
  leve: '💄 Maquiagem leve',
  pintura: '🎨 Pintura no rosto',
  mascara: '🎭 Usa máscara',
};
const SELO_CALOR = { 1: '🧊 Fresquinha', 3: '🔥 Esquenta' };
const SELO_RECONHECIMENTO = { 1: '🤓 Para quem é fã', 3: '👀 Todo mundo reconhece' };

// Título da seção de pares, conforme com quem a pessoa vai.
const TITULO_PARES = {
  casal: 'Para o seu par 💑',
  grupo: 'Para a sua turma 👯',
};

/* ---------------- Estado global ---------------- */

const state = {
  escolhas: {},    // { genero:'fem', altura:'alto', ... }
  ranking: [],     // ranking completo devolvido por recomendarFantasia()
  exibida: null,   // fantasia atualmente exibida na Tela 5
  telaAtual: 'screen-home',
  trocandoTela: false,
  timers: { loading: null, frases: null, toast: null },
};

/* ---------------- Helpers ---------------- */

const $ = (seletor) => document.querySelector(seletor);

const prefereMenosMovimento = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================================================================
   RENDERIZAÇÃO DOS FORMULÁRIOS (etapas do quiz, a partir de data.js)
   ================================================================ */

/**
 * Gera o HTML de um grupo de opções.
 * @param {object}  grupo     Uma pergunta de data.js.
 * @param {boolean} modoLinha true = lista vertical com letras A/B/C.
 */
function renderizarGrupo(grupo, modoLinha) {
  const botoes = grupo.opcoes
    .map((opcao, i) => {
      const letra = modoLinha
        ? `<span class="letra" aria-hidden="true">${String.fromCharCode(65 + i)}</span>`
        : '';
      return `
        <button type="button"
                class="opcao-btn${modoLinha ? ' opcao-btn--linha' : ''}"
                data-categoria="${grupo.categoria}"
                data-valor="${opcao.valor}"
                aria-pressed="false">
          ${letra}
          <span class="emoji" aria-hidden="true">${opcao.emoji}</span>
          <span class="rotulo">${opcao.rotulo}</span>
        </button>`;
    })
    .join('');

  // 2 opções → lado a lado; 4 → 2x2 (vira 1 linha em telas maiores); 3 → 3 colunas.
  const variante = { 2: ' opcoes-grid--par', 4: ' opcoes-grid--2cols' }[grupo.opcoes.length] ?? '';
  const classeGrid = modoLinha ? 'opcoes-grid opcoes-grid--lista' : `opcoes-grid${variante}`;

  return `
    <div class="grupo">
      <h3>${grupo.titulo}</h3>
      <div class="${classeGrid}" role="group" aria-label="${grupo.titulo}">${botoes}</div>
    </div>`;
}

function renderizarFormularios() {
  for (const etapa of ETAPAS_QUIZ) {
    $(etapa.container).innerHTML = etapa.perguntas.map((g) => renderizarGrupo(g, etapa.modoLinha)).join('');
  }
  atualizarAvatarPreview();
}

/** Resumo do perfil: mostra o emoji escolhido em cada categoria física. */
function atualizarAvatarPreview() {
  $('#avatar-preview').innerHTML = ETAPAS_FISICO.map((grupo) => {
    const escolhida = grupo.opcoes.find((o) => o.valor === state.escolhas[grupo.categoria]);
    return `
      <div class="avatar-slot">
        <span class="emoji" aria-hidden="true">${escolhida ? escolhida.emoji : '❓'}</span>
        <span class="cat">${grupo.rotuloCurto ?? grupo.categoria}</span>
      </div>`;
  }).join('');
}

/* ================================================================
   SELEÇÃO DE OPÇÕES (delegação: 1 listener por tela)
   ================================================================ */

function aoSelecionarOpcao(evento) {
  const botao = evento.target.closest('.opcao-btn');
  if (!botao) return;

  const { categoria, valor } = botao.dataset;
  state.escolhas[categoria] = valor;

  // Visual: apenas uma opção ativa por categoria.
  botao.closest('[role="group"]').querySelectorAll('.opcao-btn').forEach((b) => {
    const ativa = b === botao;
    b.classList.toggle('selecionada', ativa);
    b.setAttribute('aria-pressed', String(ativa));
  });

  atualizarAvatarPreview();
  atualizarBotoesDeAvanco();
  rolarParaProximoPasso(botao);
}

/** UX: após escolher, rola suavemente até a próxima pergunta vazia. */
function rolarParaProximoPasso(botao) {
  const comportamento = prefereMenosMovimento() ? 'auto' : 'smooth';
  const grupoAtual = botao.closest('.grupo');
  const proximoVazio = [...grupoAtual.parentElement.querySelectorAll('.grupo')].find(
    (g) => !g.querySelector('.opcao-btn.selecionada')
  );

  if (proximoVazio && proximoVazio !== grupoAtual) {
    proximoVazio.scrollIntoView({ behavior: comportamento, block: 'center' });
  } else if (!proximoVazio) {
    // Tudo respondido: mostra o botão de avanço da tela.
    botao.closest('.screen').querySelector('.btn-primary')
      ?.scrollIntoView({ behavior: comportamento, block: 'center' });
  }
}

function contarEscolhas(grupos) {
  return grupos.filter((g) => state.escolhas[g.categoria]).length;
}

/** Habilita o botão de avanço de cada etapa apenas com ela completa. */
function atualizarBotoesDeAvanco() {
  for (const etapa of ETAPAS_QUIZ) {
    const feitas = contarEscolhas(etapa.perguntas);
    const total = etapa.perguntas.length;
    const botao = $(etapa.botao);
    botao.disabled = feitas < total;
    botao.textContent = botao.disabled ? `Responda tudo (${feitas}/${total})` : etapa.textoPronto;
  }
}

function avancarDaEtapa(indice) {
  const proxima = ETAPAS_QUIZ[indice + 1];
  if (proxima) mostrarTela(proxima.tela);
  else iniciarConsulta();
}

/* ================================================================
   NAVEGAÇÃO ENTRE TELAS (fade out → fade in, sem alert/reload)
   ================================================================ */

function mostrarTela(idNova) {
  if (state.trocandoTela || idNova === state.telaAtual) return;
  state.trocandoTela = true;

  const telaAtual = document.getElementById(state.telaAtual);
  const telaNova = document.getElementById(idNova);

  telaAtual.classList.add('saindo');
  window.setTimeout(() => {
    telaAtual.classList.remove('active', 'saindo');
    telaNova.classList.add('active');
    state.telaAtual = idNova;
    state.trocandoTela = false;
    window.scrollTo(0, 0);
    $('#progress-bar').style.width = PROGRESSO_POR_TELA[idNova] ?? '0%';
    ativarAnuncios(telaNova);
  }, DURACAO_FADE_MS);
}

/**
 * Cria e ativa os blocos de anúncio dentro de `container`, uma única vez.
 *
 * O <ins> só é criado quando a posição já está visível: o AdSense não
 * preenche bloco com largura zero, e adsbygoogle.push({}) sempre preenche
 * o PRIMEIRO <ins> pendente da página — se existisse um <ins> pendente em
 * outra tela escondida, ele seria escolhido no lugar deste.
 */
function ativarAnuncios(container) {
  container.querySelectorAll('[data-anuncio]:not([data-ativo])').forEach((posicao) => {
    const bloco = BLOCOS_ADSENSE[posicao.dataset.anuncio];
    if (!bloco?.slot) return;

    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.dataset.adClient = ADSENSE_CLIENT;
    ins.dataset.adSlot = bloco.slot;
    const estiloFixo = ESTILO_POR_FORMATO[bloco.formato];
    if (estiloFixo) {
      ins.style.cssText = estiloFixo;
    } else {
      ins.style.display = 'block';
      ins.dataset.adFormat = 'auto';
      ins.dataset.fullWidthResponsive = 'true';
    }
    posicao.appendChild(ins);

    // Posição escondida (ex.: lateral no celular): desfaz e tenta de novo depois.
    if (ins.offsetWidth === 0) {
      ins.remove();
      return;
    }

    posicao.dataset.ativo = 'true';
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (erro) {
      console.warn('[BestFantasia] anúncio não carregou:', erro);
    }
  });
}

/* ================================================================
   TELA 4 — LOADING (4s)
   ================================================================ */

function iniciarConsulta() {
  mostrarTela('screen-loading');

  // Gira as frases místicas enquanto os espíritos "trabalham".
  let indiceFrase = 0;
  state.timers.frases = window.setInterval(() => {
    indiceFrase = (indiceFrase + 1) % FRASES_LOADING.length;
    $('#frase-loading').textContent = FRASES_LOADING[indiceFrase];
  }, 1100);

  // O cálculo é instantâneo; os 4s são encenação.
  // Sem anúncio nesta tela: as políticas do AdSense proíbem anúncios em
  // telas sem conteúdo do site (carregamento, transição, alerta).
  state.ranking = recomendarFantasia(state.escolhas);

  state.timers.loading = window.setTimeout(
    () => exibirResultado(state.ranking[0]),
    DURACAO_LOADING_MS
  );
}

/* ================================================================
   TELA 5 — RESULTADO + GUIA DE MONTAGEM
   ================================================================ */

/**
 * Renderiza a Tela 5 para uma fantasia do pódio (a vencedora ou,
 * via clique em "quase viraram você", uma das vices).
 */
function exibirResultado(fantasia) {
  window.clearInterval(state.timers.frases);
  state.exibida = fantasia;

  const motivos = montarMotivos(fantasia, state.escolhas);

  $('#resultado-emoji').textContent = fantasia.emoji;
  $('#resultado-nome').textContent = fantasia.nome;
  $('#resultado-match').textContent = `⚡ ${fantasia.compatibilidade}% de match`;
  $('#resultado-descricao').textContent = fantasia.descricao;

  // Selos: categoria, montagem, custo e os fatos da ficha que ajudam a decidir.
  const ficha = fantasia.ficha ?? {};
  const selos = [
    SELO_ROSTO[ficha.rosto],
    SELO_CALOR[ficha.calor],
    SELO_RECONHECIMENTO[ficha.reconhecimento],
  ].filter(Boolean);
  $('#resultado-meta').innerHTML = `
    <span class="badge-mini badge-mini--cat">${fantasia.categoria}</span>
    <span class="badge-mini">🧵 Montagem: ${fantasia.dificuldade}</span>
    <span class="badge-mini">💰 Custo: ${ROTULO_CUSTO[fantasia.custo] ?? '$'}</span>
    ${selos.map((selo) => `<span class="badge-mini">${selo}</span>`).join('')}`;

  // Chips com os motivos (fallback místico se nada pontuou).
  const chips = motivos.length ? motivos : ['uma conexão espiritual inexplicável ✨'];
  $('#resultado-motivos').innerHTML = chips
    .map((motivo) => `<span class="chip">✔ ${motivo}</span>`)
    .join('');

  renderizarGuia(fantasia);
  renderizarPares(fantasia);
  renderizarAlternativas(fantasia);

  // Foto ilustrativa: se o placeholder do Unsplash falhar,
  // a imagem some e o emoji segura o visual (nada de ícone quebrado).
  const img = $('#resultado-imagem');
  img.classList.add('hidden');
  img.onload = () => img.classList.remove('hidden');
  img.onerror = () => img.classList.add('hidden');
  img.alt = `Inspiração de fantasia: ${fantasia.nome}`;
  img.src = fantasia.imagem;

  atualizarLinksDeCompartilhamento();

  if (state.telaAtual !== 'screen-resultado') {
    mostrarTela('screen-resultado');
  } else {
    // Troca via "quase viraram você": já estamos na tela, só sobe.
    window.scrollTo({ top: 0, behavior: prefereMenosMovimento() ? 'auto' : 'smooth' });
  }
}

/** Lista de compras numerada + botões de afiliado (estilo costume guide). */
function renderizarGuia(fantasia) {
  $('#resultado-itens').innerHTML = fantasia.itens
    .map((item, i) => {
      const acao = item.busca
        ? `<a class="btn-amazon" href="${urlAmazon(item.busca)}" target="_blank"
              rel="noopener noreferrer sponsored">Ver na Amazon</a>`
        : '<span class="tag-gratis">✓ Você já tem</span>';
      return `
        <li class="item-compra">
          <span class="item-num" aria-hidden="true">${i + 1}</span>
          <span class="item-nome">${item.emoji} ${item.nome}</span>
          ${acao}
        </li>`;
    })
    .join('');

  $('#resultado-passos').innerHTML = fantasia.passos
    .map((passo) => `<li>${passo}</li>`)
    .join('');

  // Dica de maquiagem pelo tom de pele — só contraste de tintas e
  // glitters; o tom nunca influencia QUAL fantasia sai (ver data.js).
  const dica = DICAS_PELE[state.escolhas.pele];
  const elDica = $('#resultado-dica-pele');
  elDica.textContent = dica ? `💄 Dica para o seu tom de pele: ${dica}` : '';
  elDica.classList.toggle('hidden', !dica);
}

/** As outras fantasias do pódio, clicáveis para ver o guia delas. */
/** O resto do pódio (top 3), clicável para ver o guia de cada uma. */
function renderizarAlternativas(fantasiaExibida) {
  const outras = state.ranking.slice(0, 3).filter((f) => f.id !== fantasiaExibida.id);
  $('#resultado-alternativas').innerHTML = outras
    .map(
      (alt) => `
      <button type="button" class="alternativa" data-id="${alt.id}">
        <span>${alt.emoji} ${alt.nome}</span>
        <span class="alternativa-acao">
          <span class="alternativa-match">${alt.compatibilidade}%</span> ver guia →
        </span>
      </button>`
    )
    .join('');
}

/**
 * Fantasias que fazem par com a exibida (ficha.par), para quem vai em
 * casal ou em grupo. A seção some quando a fantasia não tem par.
 */
function renderizarPares(fantasia) {
  const pares = (fantasia.ficha?.par ?? [])
    .map((id) => state.ranking.find((f) => f.id === id))
    .filter(Boolean);
  $('#pares-wrap').classList.toggle('hidden', !pares.length);
  $('#pares-titulo').textContent = TITULO_PARES[state.escolhas.companhia] ?? 'Vai acompanhado? Combina com 👯';
  $('#resultado-pares').innerHTML = pares
    .map(
      (par) => `
      <button type="button" class="alternativa" data-id="${par.id}">
        <span>${par.emoji} ${par.nome}</span>
        <span class="alternativa-acao">ver guia →</span>
      </button>`
    )
    .join('');
}

function aoClicarAlternativa(evento) {
  const botao = evento.target.closest('.alternativa');
  if (!botao) return;
  const fantasia = state.ranking.find((f) => f.id === Number(botao.dataset.id));
  if (fantasia) exibirResultado(fantasia);
}

/* ================================================================
   COMPARTILHAMENTO (links reais <a>, sem pop-up bloqueável)
   ================================================================ */

function textoDeCompartilhamento() {
  const f = state.exibida;
  return `🎃 O BestFantasia revelou: minha fantasia ideal de Halloween é ${f.emoji} ${f.nome} (${f.compatibilidade}% de match)! Descubra a sua + o guia de montagem:`;
}

function atualizarLinksDeCompartilhamento() {
  const texto = textoDeCompartilhamento();
  const urlDoSite = window.location.href;

  $('#btn-share-wa').href = `https://wa.me/?text=${encodeURIComponent(`${texto} ${urlDoSite}`)}`;

  const urlTwitter = new URL('https://twitter.com/intent/tweet');
  urlTwitter.searchParams.set('text', texto);
  urlTwitter.searchParams.set('url', urlDoSite);
  $('#btn-share-tw').href = urlTwitter.toString();
}

/** Fallback de cópia para navegadores sem navigator.clipboard. */
function copiarTextoLegado(texto) {
  const area = document.createElement('textarea');
  area.value = texto;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let copiou = false;
  try {
    copiou = document.execCommand('copy');
  } catch {
    copiou = false;
  }
  area.remove();
  return copiou;
}

async function copiarLink() {
  const texto = `${textoDeCompartilhamento()} ${window.location.href}`;
  try {
    await navigator.clipboard.writeText(texto);
    mostrarToast('🔗 Copiado! Vá assombrar o grupo da família.');
  } catch {
    mostrarToast(
      copiarTextoLegado(texto)
        ? '🔗 Copiado! Vá assombrar o grupo da família.'
        : '😿 Não consegui copiar — segure e copie o link da barra.'
    );
  }
}

/* ---------------- Toast (substitui alert()) ---------------- */

function mostrarToast(mensagem) {
  const toast = $('#toast');
  toast.textContent = mensagem;
  toast.classList.add('visivel');
  window.clearTimeout(state.timers.toast);
  state.timers.toast = window.setTimeout(() => toast.classList.remove('visivel'), 2600);
}

/* ---------------- Reinício ---------------- */

function reiniciar() {
  state.escolhas = {};
  state.ranking = [];
  state.exibida = null;
  window.clearTimeout(state.timers.loading);
  window.clearInterval(state.timers.frases);
  renderizarFormularios(); // zera as seleções visuais
  atualizarBotoesDeAvanco();
  mostrarTela('screen-home');
}

/* ================================================================
   BOOTSTRAP
   ================================================================ */

function init() {
  renderizarFormularios();
  atualizarBotoesDeAvanco();

  // Contador real de fantasias na home.
  const total = $('#total-fantasias');
  if (total) total.textContent = FANTASIAS.length;

  // Navegação principal
  $('#btn-start').addEventListener('click', () => mostrarTela(ETAPAS_QUIZ[0].tela));
  $('#btn-restart').addEventListener('click', reiniciar);

  // Botões "voltar" (atributo data-voltar="id-da-tela")
  document.querySelectorAll('[data-voltar]').forEach((botao) => {
    botao.addEventListener('click', () => mostrarTela(botao.dataset.voltar));
  });

  // Etapas do quiz: seleção por delegação (1 listener por etapa) e avanço.
  ETAPAS_QUIZ.forEach((etapa, indice) => {
    $(etapa.container).addEventListener('click', aoSelecionarOpcao);
    $(etapa.botao).addEventListener('click', () => avancarDaEtapa(indice));
  });

  // Pódio e pares clicáveis; compartilhamento.
  $('#resultado-alternativas').addEventListener('click', aoClicarAlternativa);
  $('#resultado-pares').addEventListener('click', aoClicarAlternativa);
  $('#btn-share-copy').addEventListener('click', copiarLink);

  // Laterais fixas (só aparecem em telas largas): ativa já na entrada e,
  // se a janela começar estreita, quando ela for alargada.
  const laterais = $('#anuncios-laterais');
  ativarAnuncios(laterais);
  window.addEventListener('resize', () => ativarAnuncios(laterais), { passive: true });

  console.log('%c🎃 BestFantasia', 'color:#ff7a18;font-size:16px;font-weight:bold');
}

document.addEventListener('DOMContentLoaded', init);
