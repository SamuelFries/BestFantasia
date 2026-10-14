#!/usr/bin/env node
'use strict';

/* ============================================================
   BestFantasia — ferramentas/validar.js
   Confere o banco de fantasias e a heurística. Rode antes de
   commitar qualquer mudança em data.js, data/*.js ou logic.js:

     node ferramentas/validar.js

   Sai com código 1 se houver ERRO. AVISO não bloqueia.
   Carrega os mesmos scripts do index.html, na mesma ordem
   (menos o main.js, que depende do navegador).
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]
  .map((m) => m[1])
  .filter((src) => !/^https?:/.test(src) && src !== 'main.js');

const codigo =
  scripts.map((src) => fs.readFileSync(path.join(RAIZ, src), 'utf8')).join('\n;\n') +
  '\n;globalThis.__api = { FANTASIAS, TODAS_AS_PERGUNTAS, PERGUNTAS_PRATICAS, CATEGORIAS, FICHA_VALORES,' +
  ' ROTULOS_MATCH, OPCOES, avaliar, compararAvaliacoes, recomendarFantasia, montarMotivos,' +
  ' pontosDaResposta, SUAVIZACAO_RANKING };';
const contexto = vm.createContext({ console });
vm.runInContext(codigo, contexto, { filename: 'bestfantasia (data + logic)' });
const api = contexto.__api;

const erros = [];
const avisos = [];
const erro = (msg) => erros.push(msg);
const aviso = (msg) => avisos.push(msg);

/* ---------------- 1. Perguntas ---------------- */

const CAMPOS_DE_REGRA = new Set([...Object.keys(api.FICHA_VALORES), 'par', 'polemica', 'categoria', 'dificuldade', 'custo']);
const CATEGORIAS_PRATICAS = new Set(api.PERGUNTAS_PRATICAS.map((p) => p.categoria));
const perguntasVistas = new Set();

for (const pergunta of api.TODAS_AS_PERGUNTAS) {
  if (perguntasVistas.has(pergunta.categoria)) erro(`pergunta duplicada: ${pergunta.categoria}`);
  perguntasVistas.add(pergunta.categoria);
  const valores = new Set();
  for (const opcao of pergunta.opcoes) {
    if (valores.has(opcao.valor)) erro(`opção duplicada em ${pergunta.categoria}: ${opcao.valor}`);
    valores.add(opcao.valor);
    for (const regra of opcao.regras ?? []) {
      if (!CAMPOS_DE_REGRA.has(regra.campo)) erro(`${pergunta.categoria}=${opcao.valor}: regra lê campo desconhecido "${regra.campo}"`);
      if (pergunta.categoria === 'pele') erro('a pergunta de tom de pele não pode ter regras (decisão ética)');
    }
  }
}

/* ---------------- 2. Fantasias ---------------- */

const DIFICULDADES = ['Fácil', 'Média', 'Caprichada'];
const porId = new Map(api.FANTASIAS.map((f) => [f.id, f]));
const nomes = new Set();

for (const f of api.FANTASIAS) {
  const quem = `${f.nome ?? '(sem nome)'} (id ${f.id})`;
  if (!Number.isInteger(f.id)) erro(`${quem}: id precisa ser inteiro`);
  if (nomes.has(f.nome)) erro(`${quem}: nome repetido`);
  nomes.add(f.nome);
  for (const campo of ['emoji', 'descricao', 'imagem']) if (typeof f[campo] !== 'string' || !f[campo]) erro(`${quem}: falta ${campo}`);
  if (!api.CATEGORIAS.includes(f.categoria)) erro(`${quem}: categoria inválida "${f.categoria}"`);
  if (!DIFICULDADES.includes(f.dificuldade)) erro(`${quem}: dificuldade inválida "${f.dificuldade}"`);
  if (![1, 2, 3].includes(f.custo)) erro(`${quem}: custo deve ser 1, 2 ou 3`);

  // ficha
  const ficha = f.ficha;
  if (!ficha) {
    erro(`${quem}: falta a ficha`);
  } else {
    for (const [campo, permitidos] of Object.entries(api.FICHA_VALORES)) {
      const valor = ficha[campo];
      if (campo === 'formato') {
        if (!Array.isArray(valor) || !valor.length || valor.some((v) => !permitidos.includes(v))) {
          erro(`${quem}: ficha.formato deve ser lista com ${permitidos.join('/')}`);
        }
      } else if (!permitidos.includes(valor)) {
        erro(`${quem}: ficha.${campo} inválido (${JSON.stringify(valor)}); use ${permitidos.join(' | ')}`);
      }
    }
    for (const campo of Object.keys(ficha)) {
      if (!(campo in api.FICHA_VALORES) && campo !== 'par' && campo !== 'polemica') erro(`${quem}: campo desconhecido na ficha: ${campo}`);
    }
    if ('polemica' in ficha && ficha.polemica !== true) erro(`${quem}: ficha.polemica só aceita true (omita quando não for)`);
    for (const idPar of ficha.par ?? []) {
      const par = porId.get(idPar);
      if (!par) erro(`${quem}: par ${idPar} não existe`);
      else if (idPar === f.id) erro(`${quem}: não pode ser par de si mesma`);
      else if (!(par.ficha?.par ?? []).includes(f.id)) erro(`${quem}: par ${par.nome} (id ${idPar}) não aponta de volta`);
    }
  }

  // pesos
  for (const [categoria, mapa] of Object.entries(f.pesos ?? {})) {
    if (categoria === 'pele') { erro(`${quem}: tom de pele não pode ter peso (decisão ética)`); continue; }
    if (!api.OPCOES[categoria]) { erro(`${quem}: peso em pergunta inexistente "${categoria}"`); continue; }
    if (CATEGORIAS_PRATICAS.has(categoria)) erro(`${quem}: "${categoria}" é prática — use a ficha, não pesos`);
    for (const [valor, pontos] of Object.entries(mapa)) {
      if (!api.OPCOES[categoria][valor]) erro(`${quem}: ${categoria}="${valor}" não é opção do quiz`);
      if (!Number.isFinite(pontos) || pontos < 1 || pontos > 10) erro(`${quem}: ${categoria}.${valor} deve ter de 1 a 10 pontos`);
      if (!api.ROTULOS_MATCH[categoria]?.[valor]) aviso(`${quem}: sem rótulo de motivo para ${categoria}=${valor} em ROTULOS_MATCH`);
    }
  }

  // guia
  if (!Array.isArray(f.itens) || !f.itens.length) erro(`${quem}: falta a lista de itens`);
  for (const item of f.itens ?? []) {
    if (!item.nome || !item.emoji || !(typeof item.busca === 'string' || item.busca === null)) {
      erro(`${quem}: item mal formado ${JSON.stringify(item)}`);
    }
  }
  if (!Array.isArray(f.passos) || f.passos.length !== 3) aviso(`${quem}: o padrão é 3 passos (tem ${f.passos?.length ?? 0})`);
}

/* ---------------- 3. Alcance: toda fantasia precisa poder vencer ---------------- */

function vencedora(escolhas) {
  let melhor = null;
  for (const f of api.FANTASIAS) {
    const a = api.avaliar(f, escolhas);
    if (!melhor || api.compararAvaliacoes(a, melhor) < 0) melhor = a;
  }
  return melhor;
}

/** Tenta as respostas mais favoráveis à fantasia (todas as combinações de empates). */
function testarAlcance(f, limite = 3000) {
  const opcoesPorPergunta = api.TODAS_AS_PERGUNTAS.map((pergunta) => {
    if (pergunta.categoria === 'pele') return ['media'];
    const pontos = pergunta.opcoes.map((o) => [o.valor, api.pontosDaResposta(f, pergunta.categoria, o.valor)]);
    const maximo = Math.max(...pontos.map(([, p]) => p));
    return pontos.filter(([, p]) => p === maximo).map(([v]) => v);
  });
  const total = opcoesPorPergunta.reduce((n, o) => n * o.length, 1);
  const passo = Math.max(1, Math.floor(total / limite));
  let maisPerto = null;
  for (let k = 0; k < total; k += passo) {
    let resto = k;
    const escolhas = {};
    api.TODAS_AS_PERGUNTAS.forEach((pergunta, i) => {
      const lista = opcoesPorPergunta[i];
      escolhas[pergunta.categoria] = lista[resto % lista.length];
      resto = Math.floor(resto / lista.length);
    });
    const venc = vencedora(escolhas);
    if (venc.fantasia.id === f.id) return null;
    const minha = api.avaliar(f, escolhas);
    const distancia = venc.afinidade - minha.afinidade;
    if (!maisPerto || distancia < maisPerto.distancia) maisPerto = { distancia, rival: venc.fantasia };
  }
  return maisPerto;
}

const inalcancaveis = [];
for (const f of api.FANTASIAS) {
  const falha = testarAlcance(f);
  if (falha) inalcancaveis.push({ f, ...falha });
}
for (const { f, rival, distancia } of inalcancaveis) {
  erro(`${f.nome} (id ${f.id}) nunca vence: no perfil ideal perde para ${rival.nome} (id ${rival.id}) por ${(distancia * 100).toFixed(1)} p.p.`);
}

/* ---------------- 4. Distribuição em perfis aleatórios ---------------- */

let semente = 20261014;
const aleatorio = () => (semente = (semente * 1103515245 + 12345) % 2147483648) / 2147483648;
const SIMULACOES = 20000;
const contagem = new Map();
for (let i = 0; i < SIMULACOES; i++) {
  const escolhas = {};
  for (const pergunta of api.TODAS_AS_PERGUNTAS) {
    escolhas[pergunta.categoria] = pergunta.opcoes[Math.floor(aleatorio() * pergunta.opcoes.length)].valor;
  }
  const nome = vencedora(escolhas).fantasia.nome;
  contagem.set(nome, (contagem.get(nome) ?? 0) + 1);
}
const frequentes = [...contagem.entries()].sort((a, b) => b[1] - a[1]);
const pct = (n) => ((100 * n) / SIMULACOES).toFixed(1) + '%';
if (frequentes[0][1] / SIMULACOES > 0.04) {
  aviso(`${frequentes[0][0]} vence para ${pct(frequentes[0][1])} dos perfis aleatórios (acima de 4%)`);
}

/* ---------------- 5. Casos de referência ---------------- */

const CASOS = [
  ['Walter White (Heisenberg)', { genero: 'masc', pele: 'media', altura: 'medio', biotipo: 'magro', cabelo: 'careca', barba: 'cavanhaque', oculos: 'sim',
    idade: 'classico', estilo: 'pop', filme: 'assassino', festa: 'rituais', arma: 'magia', vibe: 'impressionar',
    companhia: 'casal', rosto: 'livre', local: 'fechada', orcamento: 'medio', esforco: 'minimo' }],
  ['Jim Halpert (Three Hole Punch)', { genero: 'masc', pele: 'clara', altura: 'alto', biotipo: 'magro', cabelo: 'curto', barba: 'sem', oculos: 'nao',
    idade: 'adulto', estilo: 'pop', filme: 'sobrevive', festa: 'filmes', arma: 'sarcasmo', vibe: 'conforto',
    companhia: 'grupo', rosto: 'livre', local: 'trabalho', orcamento: 'zero', esforco: 'minimo' }],
  ['Karl Marx', { genero: 'masc', pele: 'clara', altura: 'medio', biotipo: 'forte', cabelo: 'longo', barba: 'cheia', oculos: 'nao',
    idade: 'classico', estilo: 'pop', filme: 'sobrevive', festa: 'bebida', arma: 'sarcasmo', vibe: 'divertir',
    companhia: 'sozinho', rosto: 'leve', local: 'fechada', orcamento: 'zero', esforco: 'minimo' }],
  ['Sailor Moon', { genero: 'fem', pele: 'media', altura: 'baixo', biotipo: 'magro', cabelo: 'longo', barba: 'sem', oculos: 'nao',
    idade: 'teen', estilo: 'pop', filme: 'sobrevive', festa: 'filmes', arma: 'magia', vibe: 'impressionar',
    companhia: 'grupo', rosto: 'livre', local: 'rua', orcamento: 'medio', esforco: 'minimo' }],
  ['Pennywise', { genero: 'neutro', pele: 'negra', altura: 'alto', biotipo: 'magro', cabelo: 'colorido', barba: 'sem', oculos: 'nao',
    idade: 'jovem', estilo: 'terror', filme: 'assassino', festa: 'rituais', arma: 'magia', vibe: 'assustar',
    companhia: 'sozinho', rosto: 'pintura', local: 'fechada', orcamento: 'alto', esforco: 'capricho' }],
];
for (const [esperado, escolhas] of CASOS) {
  const obtido = vencedora(escolhas).fantasia.nome;
  if (obtido !== esperado) erro(`caso de referência: esperava ${esperado}, saiu ${obtido}`);
  for (const pele of ['clara', 'media', 'morena', 'negra']) {
    if (vencedora({ ...escolhas, pele }).fantasia.nome !== obtido) erro(`tom de pele mudou o resultado do caso ${esperado}`);
  }
}

/* ---------------- Relatório ---------------- */

const porCategoria = api.CATEGORIAS.map((c) => `${c}: ${api.FANTASIAS.filter((f) => f.categoria === c).length}`).join(' · ');
console.log(`Fantasias: ${api.FANTASIAS.length} (${porCategoria})`);
console.log(`Perguntas: ${api.TODAS_AS_PERGUNTAS.length} · suavização do ranking: ${api.SUAVIZACAO_RANKING}`);
console.log(`Alcance: ${api.FANTASIAS.length - inalcancaveis.length}/${api.FANTASIAS.length} fantasias conseguem vencer`);
console.log(`Distribuição (${SIMULACOES} perfis aleatórios): ${contagem.size} fantasias diferentes venceram`);
console.log(`  mais frequentes: ${frequentes.slice(0, 5).map(([n, c]) => `${n} ${pct(c)}`).join(' | ')}`);
console.log(`Casos de referência: ${CASOS.length}`);
if (avisos.length) console.log(`\nAVISOS (${avisos.length}):\n  - ${avisos.join('\n  - ')}`);
if (erros.length) {
  console.log(`\nERROS (${erros.length}):\n  - ${erros.join('\n  - ')}`);
  process.exit(1);
}
console.log('\nTudo certo ✓');
