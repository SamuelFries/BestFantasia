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
