'use strict';

/* ============================================================
   BestFantasia — tema.js
   Escolhe a temporada do site. Carregado no <head> de todas as
   páginas, depois de temas/*.js, para a cor de fundo e a fonte
   certas entrarem antes do primeiro desenho da tela.

   PARA TROCAR A TEMPORADA: mude TEMA_PADRAO abaixo e atualize as
   duas linhas de Open Graph (og:title/og:description) no index.html
   (os previews do WhatsApp leem o HTML, não rodam JavaScript).
   Para espiar outro tema sem publicar: ?tema=halloween na URL.
   ============================================================ */

const TEMA_PADRAO = 'carnaval';

const TEMA_ATIVO = (() => {
  // Validador (ferramentas/validar.js): TEMA=halloween node …
  const forcado = globalThis.TEMA_FORCADO;
  if (typeof forcado === 'string' && TEMAS[forcado]) return forcado;
  // Navegador: ?tema=<id> para pré-visualizar.
  if (typeof location !== 'undefined') {
    const daUrl = new URLSearchParams(location.search).get('tema');
    if (daUrl && TEMAS[daUrl]) return daUrl;
  }
  return TEMA_PADRAO;
})();

const TEMA = TEMAS[TEMA_ATIVO];

if (typeof document !== 'undefined') {
  // style.css lê este atributo para aplicar as cores e a fonte do tema.
  document.documentElement.dataset.tema = TEMA.id;

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${TEMA.emoji}</text></svg>`;
    favicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  const corTema = document.querySelector('meta[name="theme-color"]');
  if (corTema) corTema.content = TEMA.corTema;
}

/* ---------- Efeito de fundo do tema (ex.: confete no Carnaval) ----------
   Roda em todas as páginas (tema.js está no <head> de todas). Cada
   pedaço é um <i> com posição, tamanho, cor e ritmo próprios; a queda
   é animação CSS (.confete em style.css). Delay negativo faz a chuva
   já começar espalhada pela tela. Quem desativa animações no sistema
   não recebe confete. */
function soltarConfete() {
  const confete = TEMA.confete;
  if (!confete || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const camada = document.createElement('div');
  camada.className = 'confete';
  camada.setAttribute('aria-hidden', 'true');

  const pedacos = [];
  for (let i = 0; i < (confete.quantidade ?? 60); i++) {
    const cor = confete.cores[i % confete.cores.length];
    const largura = 6 + Math.random() * 6;
    const altura = largura * (0.6 + Math.random() * 1.2);
    const duracao = 7 + Math.random() * 7;
    const atraso = -Math.random() * duracao;
    const redondo = i % 3 === 0 ? 'border-radius:50%;' : '';
    pedacos.push(
      `<i style="left:${(Math.random() * 100).toFixed(1)}%;width:${largura.toFixed(1)}px;height:${altura.toFixed(1)}px;` +
        `background:${cor};animation-duration:${duracao.toFixed(1)}s;animation-delay:${atraso.toFixed(1)}s;${redondo}"></i>`
    );
  }
  camada.innerHTML = pedacos.join('');
  document.body.prepend(camada);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', soltarConfete);
}
