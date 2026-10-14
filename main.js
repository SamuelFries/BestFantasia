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
  'screen-fisico': '30%',
  'screen-personalidade': '60%',
  'screen-loading': '85%',
  'screen-resultado': '100%',
};

// Rótulo amigável do custo (1..3).
const ROTULO_CUSTO = { 1: '$', 2: '$$', 3: '$$$' };

/* ---------------- Estado global ---------------- */

const state = {
  escolhas: {},    // { genero:'fem', altura:'alto', ... }
  ranking: [],     // top 3 devolvido por recomendarFantasia()
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
   RENDERIZAÇÃO DOS FORMULÁRIOS (Telas 2 e 3, a partir de data.js)
   ================================================================ */

/**
 * Gera o HTML de um grupo de opções.
 * @param {object}  grupo     Item de ETAPAS_FISICO ou PERGUNTAS_PERSONALIDADE.
 * @param {boolean} modoLinha true = lista vertical com letras A/B/C (Tela 3).
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
  $('#grupos-fisico').innerHTML = ETAPAS_FISICO.map((g) => renderizarGrupo(g, false)).join('');
  $('#perguntas-personalidade').innerHTML = PERGUNTAS_PERSONALIDADE.map((g) => renderizarGrupo(g, true)).join('');
  atualizarAvatarPreview();
}

/** Prévia "estilo Mii": mostra o emoji escolhido em cada categoria física. */
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

/** Habilita os botões de avanço apenas com a etapa completa. */
function atualizarBotoesDeAvanco() {
  const feitasFisico = contarEscolhas(ETAPAS_FISICO);
  const btnFisico = $('#btn-fisico-continuar');
  btnFisico.disabled = feitasFisico < ETAPAS_FISICO.length;
  btnFisico.textContent = btnFisico.disabled
    ? `Continuar (${feitasFisico}/${ETAPAS_FISICO.length}) ➡️`
    : 'Continuar ➡️';

  const feitasPersona = contarEscolhas(PERGUNTAS_PERSONALIDADE);
  const btnPersona = $('#btn-personalidade-continuar');
  btnPersona.disabled = feitasPersona < PERGUNTAS_PERSONALIDADE.length;
  btnPersona.textContent = btnPersona.disabled
    ? `Responda tudo (${feitasPersona}/${PERGUNTAS_PERSONALIDADE.length}) 🔮`
    : 'Consultar os Espíritos 🔮';
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
  }, DURACAO_FADE_MS);
}

/* ================================================================
   TELA 4 — LOADING (4s) + GANCHO DE MONETIZAÇÃO
   ================================================================ */

function iniciarConsulta() {
  mostrarTela('screen-loading');

  // Gira as frases místicas enquanto os espíritos "trabalham".
  let indiceFrase = 0;
  state.timers.frases = window.setInterval(() => {
    indiceFrase = (indiceFrase + 1) % FRASES_LOADING.length;
    $('#frase-loading').textContent = FRASES_LOADING[indiceFrase];
  }, 1100);

  // O cálculo é instantâneo; os 4s são encenação (e monetização).
  state.ranking = recomendarFantasia(state.escolhas);

  /* ==============================================================
     MONETIZAÇÃO · ANÚNCIO EM VÍDEO / INTERSTITIAL DE BAIXA FRICÇÃO
     Dispare AQUI o script do anúncio (ex.: interstitial do AdSense
     ou SDK parceiro), ANTES de liberar a Tela 5. Padrão sugerido:
       1. exiba o anúncio assim que esta tela abrir;
       2. troque o setTimeout abaixo por "aguarde o timer de 4s E o
          callback de fechamento do anúncio" (ex.: Promise.all) para
          o resultado nunca aparecer por baixo do anúncio aberto.
     O slot nativo estático fica em #native-ad-slot, no index.html.
     ============================================================== */
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

  // Selos: categoria, dificuldade de montagem e custo estimado.
  $('#resultado-meta').innerHTML = `
    <span class="badge-mini badge-mini--cat">${fantasia.categoria}</span>
    <span class="badge-mini">🧵 Montagem: ${fantasia.dificuldade}</span>
    <span class="badge-mini">💰 Custo: ${ROTULO_CUSTO[fantasia.custo] ?? '$'}</span>`;

  // Chips com os motivos (fallback místico se nada pontuou).
  const chips = motivos.length ? motivos : ['uma conexão espiritual inexplicável ✨'];
  $('#resultado-motivos').innerHTML = chips
    .map((motivo) => `<span class="chip">✔ ${motivo}</span>`)
    .join('');

  renderizarGuia(fantasia);
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
function renderizarAlternativas(fantasiaExibida) {
  const outras = state.ranking.filter((f) => f.id !== fantasiaExibida.id);
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
  $('#btn-start').addEventListener('click', () => mostrarTela('screen-fisico'));
  $('#btn-fisico-continuar').addEventListener('click', () => mostrarTela('screen-personalidade'));
  $('#btn-personalidade-continuar').addEventListener('click', iniciarConsulta);
  $('#btn-restart').addEventListener('click', reiniciar);

  // Botões "voltar" (atributo data-voltar="id-da-tela")
  document.querySelectorAll('[data-voltar]').forEach((botao) => {
    botao.addEventListener('click', () => mostrarTela(botao.dataset.voltar));
  });

  // Seleção de opções: delegação, um listener por formulário.
  $('#grupos-fisico').addEventListener('click', aoSelecionarOpcao);
  $('#perguntas-personalidade').addEventListener('click', aoSelecionarOpcao);

  // Pódio clicável e compartilhamento.
  $('#resultado-alternativas').addEventListener('click', aoClicarAlternativa);
  $('#btn-share-copy').addEventListener('click', copiarLink);

  console.log('%c🎃 BestFantasia', 'color:#ff7a18;font-size:16px;font-weight:bold');
}

document.addEventListener('DOMContentLoaded', init);
