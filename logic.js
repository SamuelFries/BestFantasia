'use strict';

/* ============================================================
   MinhaFantasia — logic.js
   Algoritmo de recomendação em 3 camadas:

   1. PESOS DIRETOS — soma dos pontos de cada escolha do usuário
      no mapa `pesos` da fantasia (reduce).
   2. BÔNUS DE AFINIDADE — se o gênero de filme favorito do
      usuário "casa" com a categoria da fantasia (ex.: comédia →
      fantasias Divertidas), ela ganha um bônus fixo.
   3. AJUSTE DE ESFORÇO — cruza o esforço que o usuário topa ter
      com a `dificuldade` da fantasia: quem quer o mínimo não
      recebe uma fantasia "Caprichada", e vice-versa.

   100% puro (nenhum acesso ao DOM) — dá para testar no console:
   recomendarFantasia({ genero:'fem', arma:'magia', esforco:'minimo', ... })

   Depende de: data.js (FANTASIAS, ROTULOS_MATCH)
   ============================================================ */

/* ---------- Constantes da heurística ---------- */

// Pontos ganhos quando o filme favorito combina com a categoria.
const BONUS_AFINIDADE = 7;

// Gênero de filme favorito → categoria de fantasia beneficiada.
// ('Clássicas' não entra: elas pontuam direto nos pesos de `estilo`.)
const MAPA_ESTILO_CATEGORIA = {
  terror: 'Terror',
  comedia: 'Divertidas',
  acao: 'Ação & Aventura',
  fantasia: 'Fantasia & Magia',
};

// Esforço do usuário × dificuldade da fantasia → ajuste de pontos.
const AJUSTE_ESFORCO = {
  capricho: { 'Fácil': -2, 'Média': 3, 'Caprichada': 8 },
  medio:    { 'Fácil': 3,  'Média': 6, 'Caprichada': 1 },
  minimo:   { 'Fácil': 8,  'Média': 0, 'Caprichada': -8 },
};

/* ---------- Camada 1: pesos diretos ---------- */

/**
 * Soma os pontos que uma fantasia ganha com as escolhas feitas.
 * Categorias sem peso na fantasia (ou sem resposta) valem 0.
 */
function pontuarPesos(fantasia, escolhas) {
  return Object.entries(escolhas).reduce((total, [categoria, valor]) => {
    const pontos = fantasia.pesos?.[categoria]?.[valor] ?? 0;
    return total + pontos;
  }, 0);
}

/* ---------- Camada 2: bônus de afinidade ---------- */

function bonusAfinidade(fantasia, escolhas) {
  return MAPA_ESTILO_CATEGORIA[escolhas.estilo] === fantasia.categoria
    ? BONUS_AFINIDADE
    : 0;
}

/* ---------- Camada 3: ajuste de esforço ---------- */

function ajusteEsforco(fantasia, escolhas) {
  return AJUSTE_ESFORCO[escolhas.esforco]?.[fantasia.dificuldade] ?? 0;
}

/* ---------- Pontuação e normalização ---------- */

/**
 * Pontuação total ("match score") de uma fantasia.
 * O ajuste de esforço pode ser negativo, então o piso é 0.
 */
function pontuarFantasia(fantasia, escolhas) {
  const total =
    pontuarPesos(fantasia, escolhas) +
    bonusAfinidade(fantasia, escolhas) +
    ajusteEsforco(fantasia, escolhas);
  return Math.max(0, total);
}

/**
 * Pontuação máxima teórica da fantasia: melhor escolha possível em
 * cada categoria de peso + bônus de afinidade (quando a categoria é
 * elegível) + melhor ajuste de esforço para a dificuldade dela.
 * Serve para normalizar o "% de match".
 */
function pontuacaoMaxima(fantasia) {
  const maxPesos = Object.values(fantasia.pesos).reduce(
    (total, pesosDaCategoria) => total + Math.max(...Object.values(pesosDaCategoria)),
    0
  );
  const maxBonus = Object.values(MAPA_ESTILO_CATEGORIA).includes(fantasia.categoria)
    ? BONUS_AFINIDADE
    : 0;
  const maxEsforco = Math.max(
    ...Object.values(AJUSTE_ESFORCO).map((porDificuldade) => porDificuldade[fantasia.dificuldade] ?? 0)
  );
  return maxPesos + maxBonus + maxEsforco;
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
 * Percorre TODAS as fantasias, calcula o match score de cada uma e
 * devolve o ranking ordenado (maior pontuação primeiro).
 * Desempate por id para o resultado ser estável/determinístico —
 * mesmas respostas, mesma fantasia (bom para comparar com amigos).
 */
function rankearFantasias(escolhas, fantasias = FANTASIAS) {
  return fantasias
    .map((fantasia) => {
      const pontuacao = pontuarFantasia(fantasia, escolhas);
      return {
        ...fantasia,
        pontuacao,
        compatibilidade: calcularCompatibilidade(fantasia, pontuacao),
      };
    })
    .sort((a, b) => b.pontuacao - a.pontuacao || a.id - b.id);
}

/**
 * O ranking ordena pela pontuação BRUTA, mas o % exibido é
 * normalizado pelo máximo de cada fantasia — então uma vice poderia
 * mostrar % maior que a campeã e parecer bug. Este ajuste garante
 * percentuais estritamente decrescentes na exibição.
 */
function ajustarPercentuaisParaExibicao(ranking) {
  ranking.forEach((item, i) => {
    if (i === 0) return;
    const teto = ranking[i - 1].compatibilidade - 2;
    item.compatibilidade = Math.max(35, Math.min(item.compatibilidade, teto));
  });
  return ranking;
}

/* ---------- Motivos do match ---------- */

/**
 * As características do usuário que mais pontuaram para a fantasia,
 * já com rótulo amigável para exibir na UI.
 */
function montarMotivos(fantasia, escolhas, limite = 3) {
  return Object.entries(escolhas)
    .map(([categoria, valor]) => ({
      pontos: fantasia.pesos?.[categoria]?.[valor] ?? 0,
      rotulo: ROTULOS_MATCH?.[categoria]?.[valor] ?? valor,
    }))
    .filter((item) => item.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limite)
    .map((item) => item.rotulo);
}

/* ---------- API principal ---------- */

/**
 * Consumida pelo main.js: devolve o pódio (top 3) já com
 * compatibilidade ajustada. A posição 0 é a vencedora; as demais
 * alimentam a seção "quase viraram você" (e são clicáveis).
 */
function recomendarFantasia(escolhas) {
  return ajustarPercentuaisParaExibicao(rankearFantasias(escolhas)).slice(0, 3);
}
