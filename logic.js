'use strict';

/* ============================================================
   BestFantasia — logic.js
   Motor de recomendação. Não tem nenhuma tabela própria: tudo o
   que pontua está declarado em data.js e data/*.js.

   Para cada resposta, uma fantasia ganha:
   1. PESOS — `fantasia.pesos[categoria][valor]` (gosto/personalidade)
   2. REGRAS — as `regras` da opção escolhida, que leem a ficha da
      fantasia (rosto, calor, formato...) ou categoria/dificuldade/custo.

   O ranking compara essa soma com o máximo que cada fantasia poderia
   fazer (ver rankearFantasias).

   100% puro (nenhum acesso ao DOM) — dá para testar no console:
   recomendarFantasia({ genero:'fem', arma:'magia', rosto:'livre', ... })

   Depende de: data.js (TODAS_AS_PERGUNTAS, FANTASIAS, ROTULOS_MATCH)
   ============================================================ */

/* ---------- Índice das opções: categoria → valor → opção ---------- */

const OPCOES = Object.fromEntries(
  TODAS_AS_PERGUNTAS.map((pergunta) => [
    pergunta.categoria,
    Object.fromEntries(pergunta.opcoes.map((opcao) => [opcao.valor, opcao])),
  ])
);

/* ---------- Regras ---------- */

/** Valor de um campo da fantasia: primeiro na ficha, depois no topo (custo, categoria...). */
function valorDoCampo(fantasia, campo) {
  return fantasia.ficha?.[campo] ?? fantasia[campo];
}

/**
 * Pontos de uma regra para uma fantasia. Em campos-lista (formato),
 * vale o maior ponto entre os itens; sem correspondência, `senao`.
 */
function pontosDaRegra(regra, fantasia) {
  const valor = valorDoCampo(fantasia, regra.campo);
  const lista = Array.isArray(valor) ? valor : [valor];
  const encontrados = lista.map((v) => regra.pontos[v]).filter((p) => p !== undefined);
  return encontrados.length ? Math.max(...encontrados) : (regra.senao ?? 0);
}

function pontosDasRegras(opcao, fantasia) {
  return (opcao?.regras ?? []).reduce((total, regra) => total + pontosDaRegra(regra, fantasia), 0);
}

/* ---------- Perguntas condicionais (`ocultaSe` em data.js) ---------- */

/** A pergunta some quando todas as respostas de `ocultaSe` batem com as escolhas. */
function estaOculta(pergunta, escolhas) {
  return !!pergunta.ocultaSe &&
    Object.entries(pergunta.ocultaSe).every(([categoria, valor]) => escolhas[categoria] === valor);
}

/** Escolhas + a resposta implícita das perguntas ocultas (ex.: barba "sem" para Feminino). */
function completarEscolhas(escolhas) {
  const completas = { ...escolhas };
  for (const pergunta of TODAS_AS_PERGUNTAS) {
    if (estaOculta(pergunta, escolhas)) completas[pergunta.categoria] = pergunta.respostaOculta;
  }
  return completas;
}

/* ---------- Pontuação ---------- */

/** Pontos de uma fantasia para UMA resposta (pesos + regras da opção). */
function pontosDaResposta(fantasia, categoria, valor) {
  const peso = fantasia.pesos?.[categoria]?.[valor] ?? 0;
  return peso + pontosDasRegras(OPCOES[categoria]?.[valor], fantasia);
}

/**
 * Pontuação total ("match score") de uma fantasia.
 * Regras podem ser negativas, então o piso é 0.
 */
function pontuarFantasia(fantasia, escolhas) {
  let total = 0;
  for (const categoria in escolhas) total += pontosDaResposta(fantasia, categoria, escolhas[categoria]);
  return Math.max(0, total);
}

/**
 * Pontuação máxima teórica da fantasia: em cada pergunta, a opção que
 * mais rende para ela (pesos + regras juntos). Os dados são fixos,
 * então o valor é calculado uma vez por fantasia.
 */
const cacheMaximos = new Map();

function pontuacaoMaxima(fantasia) {
  if (!cacheMaximos.has(fantasia.id)) {
    const maximo = TODAS_AS_PERGUNTAS.reduce((total, pergunta) => {
      const melhor = Math.max(...pergunta.opcoes.map((o) => pontosDaResposta(fantasia, pergunta.categoria, o.valor)));
      return total + Math.max(0, melhor);
    }, 0);
    cacheMaximos.set(fantasia.id, maximo);
  }
  return cacheMaximos.get(fantasia.id);
}

/**
 * Converte a pontuação em percentual de compatibilidade.
 * Remapeia 0–100% para a faixa 35–99%: quiz de entretenimento não
 * "reprova" ninguém, e os espíritos jamais cravam 100% de certeza.
 */
function calcularCompatibilidade(fantasia, pontuacao) {
  const maximo = pontuacaoMaxima(fantasia);
  const bruto = maximo > 0 ? (pontuacao / maximo) * 100 : 0;
  return Math.round(35 + bruto * 0.64);
}

/* ---------- Ranking ---------- */

/**
 * Ordenar pela pontuação bruta favorece fantasias com muitos pesos altos
 * (em teste, 50 de 252 nunca venciam). Por isso o ranking usa a fração do
 * máximo de cada fantasia. A suavização soma ao denominador para que
 * fantasias com poucos pesos não cheguem a 100% fácil demais. Ajustada
 * com `node ferramentas/validar.js` (alcance e concentração dos resultados).
 */
const SUAVIZACAO_RANKING = 45;

/** Avaliação crua de uma fantasia (usada pelo ranking e pelo validador). */
function avaliar(fantasia, escolhas) {
  const pontuacao = pontuarFantasia(fantasia, escolhas);
  return { fantasia, pontuacao, afinidade: pontuacao / (pontuacaoMaxima(fantasia) + SUAVIZACAO_RANKING) };
}

/**
 * Melhor primeiro. Desempate pela pontuação bruta e depois por id, para o
 * resultado ser determinístico — mesmas respostas, mesma fantasia (bom
 * para comparar com amigos).
 */
function compararAvaliacoes(a, b) {
  return b.afinidade - a.afinidade || b.pontuacao - a.pontuacao || a.fantasia.id - b.fantasia.id;
}

/** Percorre TODAS as fantasias e devolve o ranking completo, melhor primeiro. */
function rankearFantasias(escolhas, fantasias = FANTASIAS) {
  return fantasias
    .map((fantasia) => avaliar(fantasia, escolhas))
    .sort(compararAvaliacoes)
    .map(({ fantasia, pontuacao, afinidade }) => ({
      ...fantasia,
      pontuacao,
      afinidade,
      compatibilidade: calcularCompatibilidade(fantasia, pontuacao),
    }));
}

/**
 * O % exibido não usa a suavização do ranking, então uma vice poderia
 * mostrar % maior que a campeã e parecer bug. Garante pódio estritamente
 * decrescente e o resto do ranking (pares sugeridos) abaixo do pódio.
 */
function ajustarPercentuaisParaExibicao(ranking) {
  const TAMANHO_PODIO = 3;
  ranking.forEach((item, i) => {
    if (i === 0) return;
    const referencia = ranking[Math.min(i, TAMANHO_PODIO) - 1].compatibilidade;
    item.compatibilidade = Math.max(35, Math.min(item.compatibilidade, referencia - 2));
  });
  return ranking;
}

/* ---------- Motivos do match ---------- */

/**
 * Por que a fantasia combinou: até 2 motivos de gosto/personalidade
 * (pesos, com rótulo de ROTULOS_MATCH) e 1 motivo prático (o `motivo`
 * da opção cujas regras renderam 3+ pontos). Sem motivo prático, os 3
 * vêm dos pesos.
 */
function montarMotivos(fantasia, escolhas, limite = 3) {
  const ordenar = (lista) => lista.filter((m) => m.pontos > 0).sort((a, b) => b.pontos - a.pontos);

  const deGosto = ordenar(
    Object.entries(escolhas).map(([categoria, valor]) => ({
      pontos: fantasia.pesos?.[categoria]?.[valor] ?? 0,
      rotulo: ROTULOS_MATCH?.[categoria]?.[valor],
    }))
  ).filter((m) => m.rotulo);

  const praticos = ordenar(
    Object.entries(escolhas).map(([categoria, valor]) => {
      const opcao = OPCOES[categoria]?.[valor];
      const pontos = pontosDasRegras(opcao, fantasia);
      return { pontos: opcao?.motivo && pontos >= 3 ? pontos : 0, rotulo: opcao?.motivo };
    })
  );

  const escolhidos = [...deGosto.slice(0, praticos.length ? limite - 1 : limite), ...praticos.slice(0, 1)];
  return escolhidos.map((m) => m.rotulo);
}

/* ---------- API principal ---------- */

/**
 * Consumida pelo main.js: o ranking completo, com compatibilidade
 * ajustada para exibição. Posição 0 é a vencedora; 1 e 2 alimentam
 * "quase viraram você"; o resto serve para achar os pares sugeridos.
 */
function recomendarFantasia(escolhas) {
  return ajustarPercentuaisParaExibicao(rankearFantasias(completarEscolhas(escolhas)));
}
