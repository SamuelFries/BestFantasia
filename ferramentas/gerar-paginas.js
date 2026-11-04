#!/usr/bin/env node
'use strict';

/* ============================================================
   BestFantasia — ferramentas/gerar-paginas.js
   Gera uma página estática por fantasia (fantasias/<slug>.html),
   o catálogo (fantasias/index.html) e o sitemap.xml.

     node ferramentas/gerar-paginas.js

   Por quê: o quiz é uma SPA e o conteúdo dos guias só existe
   depois do JavaScript. Robôs (Google, revisão do AdSense) veem
   uma home quase vazia. As páginas estáticas expõem os 289 guias
   de montagem como conteúdo de verdade, com endereço próprio.

   Rode sempre que mudar data/*.js e faça commit do resultado.
   O validador avisa se as páginas estiverem desatualizadas.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.join(__dirname, '..');
const DOMINIO = 'https://bestfantasia.com.br';
const PASTA = path.join(RAIZ, 'fantasias');

/* ---------- Carrega os mesmos dados do site ---------- */

const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]
  .map((m) => m[1])
  .filter((src) => !/^https?:/.test(src) && src !== 'main.js');
const contexto = vm.createContext({ console });
vm.runInContext(
  scripts.map((src) => fs.readFileSync(path.join(RAIZ, src), 'utf8')).join('\n;\n') +
    '\n;globalThis.__api = { FANTASIAS, CATEGORIAS, slugFantasia };',
  contexto
);
const { FANTASIAS, CATEGORIAS, slugFantasia } = contexto.__api;

// Tag de afiliado e blocos de anúncio: a fonte da verdade é o main.js.
const mainJs = fs.readFileSync(path.join(RAIZ, 'main.js'), 'utf8');
const TAG_AMAZON = mainJs.match(/AMAZON_AFFILIATE_TAG = '([^']+)'/)[1];
const ADSENSE_CLIENT = mainJs.match(/ADSENSE_CLIENT = '([^']+)'/)[1];
const SLOT_APOS_ITENS = mainJs.match(/resultadoAposCartao:\s*\{ slot: '(\d+)'/)[1];
const SLOT_APOS_PASSOS = mainJs.match(/resultadoAposPassos:\s*\{ slot: '(\d+)'/)[1];

/* ---------- Helpers ---------- */

const esc = (texto) =>
  String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const urlAmazon = (busca) =>
  `https://www.amazon.com.br/s?k=${encodeURIComponent(busca)}&amp;tag=${encodeURIComponent(TAG_AMAZON)}`;

const slugCategoria = (categoria) =>
  categoria.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const porId = new Map(FANTASIAS.map((f) => [f.id, f]));
const ordenadas = [...FANTASIAS].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

/* ---------- Textos da ficha ---------- */

const ROTULO_CUSTO = { 1: 'Baixo ($)', 2: 'Médio ($$)', 3: 'Alto ($$$)' };
const ROTULO_ROSTO = {
  livre: 'Nada no rosto',
  leve: 'Maquiagem leve ou acessório simples',
  pintura: 'Pintura completa ou prótese',
  mascara: 'Máscara, capacete ou rosto coberto',
};
const ROTULO_CALOR = { 1: 'Fresca', 2: 'Normal', 3: 'Quente' };
const ROTULO_VOLUME = { 1: 'Roupa comum', 2: 'Acessórios grandes', 3: 'Volumosa' };
const ROTULO_FORMATO = { solo: 'sozinho', casal: 'em casal', grupo: 'em grupo' };
const ROTULO_RECONHECIMENTO = { 1: 'Só os fãs entendem', 2: 'A maioria reconhece', 3: 'Todo mundo reconhece' };

/** Dicas práticas a partir dos fatos da ficha. */
function dicasPraticas(f) {
  const { ficha } = f;
  const dicas = [];
  if (ficha.calor === 3) dicas.push('É uma fantasia quente. Para festa ao ar livre ou bloco de rua, leve água, use tecido leve por baixo e planeje onde guardar a parte mais pesada.');
  if (ficha.calor === 1) dicas.push('É fresca, então aguenta bem calor, bloco de rua e festa ao ar livre.');
  if (ficha.volume === 3) dicas.push('Ocupa bastante espaço. Em balada ou show lotado, ela atrapalha; prefira festa com mais espaço e veja se passa pela porta do carro.');
  if (ficha.volume === 2) dicas.push('Os acessórios grandes chamam atenção, mas pense onde deixá-los quando for dançar ou sentar.');
  if (ficha.rosto === 'pintura') dicas.push('Reserve de 30 a 60 minutos para a pintura do rosto. Teste a tinta num pedaço da pele no dia anterior e tenha demaquilante à mão.');
  if (ficha.rosto === 'mascara') dicas.push('Com o rosto coberto, comer e beber fica difícil. Escolha uma máscara que dê para levantar ou tirar rápido.');
  if (ficha.rosto === 'livre') dicas.push('Não precisa de nada no rosto, então dá para montar em poucos minutos e tirar fotos sem retoque.');
  if (ficha.susto === 2) dicas.push('Tem sangue ou visual pesado. Evite em escola, trabalho ou festa com crianças.');
  if (ficha.polemica) dicas.push('É uma figura política. Leve no bom humor e evite em ambientes de trabalho ou escola.');
  if (ficha.ousadia === 2) dicas.push('É uma versão provocante. Confira o clima e o código de vestimenta da festa antes.');
  if (f.dificuldade === 'Fácil' && f.custo === 1) dicas.push('Boa opção de última hora: fácil de montar e com custo baixo, muitas vezes com peças que você já tem.');
  if (f.dificuldade === 'Caprichada') dicas.push('É uma produção caprichada. Comece a juntar as peças com pelo menos uma semana de antecedência.');
  if (ficha.reconhecimento === 1) dicas.push('Quem é fã reconhece na hora, mas prepare uma resposta curta para quem perguntar "você é quem?".');
  return dicas;
}

/* ---------- Layout comum ---------- */

function pagina({ titulo, descricao, canonico, corpo, profundidade = 1, comAnuncios = false }) {
  const raiz = '../'.repeat(profundidade);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0b0a1f">
  <title>${esc(titulo)}</title>
  <meta name="description" content="${esc(descricao)}">
  <link rel="canonical" href="${canonico}">
  <meta property="og:title" content="${esc(titulo)}">
  <meta property="og:description" content="${esc(descricao)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonico}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎭</text></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Lilita+One&family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${raiz}style.css">
  <script src="${raiz}temas/halloween.js"></script>
  <script src="${raiz}temas/carnaval.js"></script>
  <script src="${raiz}tema.js"></script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}"
     crossorigin="anonymous"></script>
</head>
<body>
  <main id="app" class="app-largo">
${corpo}
  </main>
  <footer class="rodape">
    <nav class="rodape-links" aria-label="Institucional">
      <a href="${raiz}index.html">Fazer o teste</a>
      <a href="${raiz}fantasias/">Todas as fantasias</a>
      <a href="${raiz}sobre.html">Sobre</a>
      <a href="${raiz}privacidade.html">Política de Privacidade</a>
      <a href="${raiz}contato.html">Contato</a>
    </nav>
  </footer>${comAnuncios ? `
  <script>
    document.querySelectorAll('ins.adsbygoogle').forEach(function () {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  </script>` : ''}
</body>
</html>
`;
}

const blocoAnuncio = (slot) =>
  `    <div class="adsense-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="${ADSENSE_CLIENT}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins></div>`;

const linkFantasia = (f, prefixo = '') =>
  `<a class="alternativa" href="${prefixo}${slugFantasia(f)}.html"><span>${f.emoji} ${esc(f.nome)}</span><span class="alternativa-acao">ver guia →</span></a>`;

/* ---------- Página de cada fantasia ---------- */

function paginaFantasia(f) {
  const { ficha } = f;
  const slug = slugFantasia(f);
  const pares = (ficha.par ?? []).map((id) => porId.get(id)).filter(Boolean);
  const mesmaCategoria = FANTASIAS.filter((o) => o.categoria === f.categoria && o.id !== f.id);
  // Vizinhas determinísticas na categoria (evita que as primeiras levem todos os links).
  const indice = FANTASIAS.filter((o) => o.categoria === f.categoria).findIndex((o) => o.id === f.id);
  const vizinhas = Array.from({ length: Math.min(6, mesmaCategoria.length) }, (_, i) =>
    mesmaCategoria[(indice + i) % mesmaCategoria.length]);
  const dicas = dicasPraticas(f);
  const compraveis = f.itens.filter((i) => i.busca).length;

  const itens = f.itens.map((item, i) => `
        <li class="item-compra">
          <span class="item-num" aria-hidden="true">${i + 1}</span>
          <span class="item-nome">${item.emoji} ${esc(item.nome)}</span>
          ${item.busca
            ? `<a class="btn-amazon" href="${urlAmazon(item.busca)}" target="_blank" rel="noopener noreferrer sponsored">Ver na Amazon</a>`
            : '<span class="tag-gratis">✓ Você já tem</span>'}
        </li>`).join('');

  const ficheiro = [
    ['Categoria', `<a href="./#${slugCategoria(f.categoria)}">${esc(f.categoria)}</a>`],
    ['Montagem', esc(f.dificuldade)],
    ['Custo', ROTULO_CUSTO[f.custo]],
    ['Rosto', ROTULO_ROSTO[ficha.rosto]],
    ['Clima', ROTULO_CALOR[ficha.calor]],
    ['Tamanho', ROTULO_VOLUME[ficha.volume]],
    ['Rende', ficha.formato.map((x) => ROTULO_FORMATO[x]).join(', ')],
    ['Reconhecimento', ROTULO_RECONHECIMENTO[ficha.reconhecimento]],
  ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n          ');

  const corpo = `    <article class="pagina-texto pagina-guia">
      <nav class="migalhas" aria-label="Você está em"><a href="../index.html">Início</a> › <a href="./">Fantasias</a> › <a href="./#${slugCategoria(f.categoria)}">${esc(f.categoria)}</a></nav>
      <div class="guia-cabecalho">
        <span class="resultado-emoji" aria-hidden="true">${f.emoji}</span>
        <h1 class="font-display">Fantasia de ${esc(f.nome)}</h1>
        <p class="guia-lead">${esc(f.descricao)}</p>
      </div>

      <section class="guia" aria-labelledby="ficha-titulo">
        <h2 id="ficha-titulo" class="guia-titulo">📋 Ficha da fantasia</h2>
        <dl class="ficha-lista">
          ${ficheiro}
        </dl>
      </section>

      <section class="guia" aria-labelledby="itens-titulo">
        <h2 id="itens-titulo" class="guia-titulo">🧵 O que você precisa (${f.itens.length} itens)</h2>
        <p>${compraveis < f.itens.length
          ? `${f.itens.length - compraveis} ${f.itens.length - compraveis === 1 ? 'item você' : 'itens você'} provavelmente já tem em casa; o resto dá para achar em loja de fantasia, armarinho ou online.`
          : 'Todos os itens são fáceis de achar em loja de fantasia, armarinho ou online.'}</p>
        <ol class="itens-lista">${itens}
        </ol>
        <p class="nota-afiliado">Os botões levam a buscas na Amazon. Podemos ganhar comissão por compras qualificadas, sem custo extra para você.</p>
      </section>

${blocoAnuncio(SLOT_APOS_ITENS)}

      <section class="guia" aria-labelledby="passos-titulo">
        <h2 id="passos-titulo" class="guia-titulo">🪄 Como montar, passo a passo</h2>
        <ol class="passos-lista">
          ${f.passos.map((p) => `<li>${esc(p)}</li>`).join('\n          ')}
        </ol>
      </section>
${dicas.length ? `
      <section class="guia" aria-labelledby="dicas-titulo">
        <h2 id="dicas-titulo" class="guia-titulo">💡 Dicas práticas</h2>
        <ul class="dicas-lista">
          ${dicas.map((d) => `<li>${esc(d)}</li>`).join('\n          ')}
        </ul>
      </section>
` : ''}
      <section class="guia guia-cta">
        <h2 class="guia-titulo">🎯 Será que é a sua fantasia?</h2>
        <p>Responda o teste do BestFantasia em 2 minutos: ele cruza seu estilo, sua personalidade e o tipo de festa com ${FANTASIAS.length} fantasias e mostra a que mais combina com você.</p>
        <a class="btn-primary" href="../index.html">Fazer o teste</a>
      </section>
${pares.length ? `
      <section aria-labelledby="pares-titulo" class="alternativas-wrap">
        <h2 id="pares-titulo" class="motivos-titulo">Vai acompanhado? Combina com 👯</h2>
        <div class="alternativas">${pares.map((p) => linkFantasia(p)).join('')}</div>
      </section>
` : ''}
${blocoAnuncio(SLOT_APOS_PASSOS)}

      <section aria-labelledby="mais-titulo" class="alternativas-wrap">
        <h2 id="mais-titulo" class="motivos-titulo">Mais fantasias de ${esc(f.categoria)}</h2>
        <div class="alternativas">${vizinhas.map((v) => linkFantasia(v)).join('')}</div>
      </section>
    </article>`;

  return pagina({
    titulo: `Fantasia de ${f.nome}: como montar, itens e passo a passo · BestFantasia`,
    descricao: `Como montar a fantasia de ${f.nome}: ${f.itens.length} itens, passo a passo, custo ${ROTULO_CUSTO[f.custo].toLowerCase()} e montagem ${f.dificuldade.toLowerCase()}. ${f.descricao}`.slice(0, 300),
    canonico: `${DOMINIO}/fantasias/${slug}.html`,
    corpo,
    comAnuncios: true,
  });
}

/* ---------- Catálogo ---------- */

const INTRO_CATEGORIA = {
  'Terror': 'Vampiros, zumbis, assassinos de filme e monstros clássicos. Para quem quer dar susto de verdade.',
  'Clássicas': 'Fantasias atemporais que todo mundo reconhece: piratas, palhaços, figuras históricas e personagens de sempre.',
  'Ação & Aventura': 'Heróis, guerreiros, exploradores e agentes secretos. Para quem quer chegar fazendo cena.',
  'Fantasia & Magia': 'Bruxas, fadas, elfos, deuses e criaturas encantadas. Mundo mágico, do medieval ao mitológico.',
  'Divertidas': 'Infláveis, trocadilhos e fantasias de esforço mínimo e risada máxima.',
  'Cultura Pop': 'Personagens de séries, filmes, games, desenhos e memes, de Breaking Bad a Barbie.',
};

function paginaCatalogo() {
  const secoes = CATEGORIAS.map((categoria) => {
    const lista = ordenadas.filter((f) => f.categoria === categoria);
    return `
      <section id="${slugCategoria(categoria)}" class="catalogo-secao" aria-labelledby="t-${slugCategoria(categoria)}">
        <h2 id="t-${slugCategoria(categoria)}">${esc(categoria)} <span class="catalogo-qtd">${lista.length}</span></h2>
        <p>${esc(INTRO_CATEGORIA[categoria] ?? '')}</p>
        <ul class="catalogo-lista">
          ${lista.map((f) => `<li><a href="${slugFantasia(f)}.html">${f.emoji} ${esc(f.nome)}</a> <span class="catalogo-meta">${esc(f.dificuldade)} · ${'$'.repeat(f.custo)}</span></li>`).join('\n          ')}
        </ul>
      </section>`;
  }).join('\n');

  const corpo = `    <article class="pagina-texto">
      <nav class="migalhas" aria-label="Você está em"><a href="../index.html">Início</a> › Fantasias</nav>
      <h1 class="font-display">Todas as fantasias</h1>
      <p>${FANTASIAS.length} guias de montagem, cada um com a lista de itens, o passo a passo, o custo, o nível de dificuldade e dicas para o tipo de festa. Escolha uma categoria ou, se não souber por onde começar, <a href="../index.html">faça o teste</a> e descubra a que mais combina com você.</p>
      <nav class="catalogo-indice" aria-label="Categorias">
        ${CATEGORIAS.map((c) => `<a href="#${slugCategoria(c)}">${esc(c)}</a>`).join('\n        ')}
      </nav>
${secoes}
    </article>`;

  return pagina({
    titulo: `${FANTASIAS.length} ideias de fantasia com guia de montagem · BestFantasia`,
    descricao: `${FANTASIAS.length} ideias de fantasia para Carnaval, Halloween e festas à fantasia, cada uma com lista de itens, passo a passo, custo e dificuldade.`,
    canonico: `${DOMINIO}/fantasias/`,
    corpo,
  });
}

/* ---------- Sitemap ---------- */

function sitemap() {
  const url = (loc, freq, prio) => `  <url><loc>${loc}</loc><changefreq>${freq}</changefreq><priority>${prio}</priority></url>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Gerado por ferramentas/gerar-paginas.js: não edite à mão. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  url(`${DOMINIO}/`, 'weekly', '1.0'),
  url(`${DOMINIO}/fantasias/`, 'weekly', '0.9'),
  ...ordenadas.map((f) => url(`${DOMINIO}/fantasias/${slugFantasia(f)}.html`, 'monthly', '0.7')),
  url(`${DOMINIO}/sobre.html`, 'monthly', '0.5'),
  url(`${DOMINIO}/privacidade.html`, 'yearly', '0.3'),
  url(`${DOMINIO}/contato.html`, 'yearly', '0.3'),
].join('\n')}
</urlset>
`;
}

/* ---------- Escrita ---------- */

function gerar() {
  const arquivos = new Map();
  const slugs = new Map();
  for (const f of FANTASIAS) {
    const slug = slugFantasia(f);
    if (slugs.has(slug)) throw new Error(`slug repetido "${slug}": ${f.nome} e ${slugs.get(slug)}`);
    slugs.set(slug, f.nome);
    arquivos.set(path.join(PASTA, `${slug}.html`), paginaFantasia(f));
  }
  arquivos.set(path.join(PASTA, 'index.html'), paginaCatalogo());
  arquivos.set(path.join(RAIZ, 'sitemap.xml'), sitemap());
  return arquivos;
}

module.exports = { gerar, PASTA };

if (require.main === module) {
  const arquivos = gerar();
  fs.rmSync(PASTA, { recursive: true, force: true }); // remove páginas de fantasias apagadas
  fs.mkdirSync(PASTA, { recursive: true });
  for (const [arquivo, conteudo] of arquivos) fs.writeFileSync(arquivo, conteudo);
  console.log(`${arquivos.size - 2} páginas de fantasia + catálogo + sitemap.xml gerados.`);
}
