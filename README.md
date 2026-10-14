# 🎃 BestFantasia

Quiz gamificado de Halloween: o visitante conta como é
(físico), responde 7 perguntas de personalidade e recebe a
**fantasia ideal** com **guia completo de montagem** — itens numerados com links
de compra, passo a passo e alternativas do pódio.

**Stack:** HTML5 + CSS3 + JavaScript vanilla. Zero dependências, zero build.

## Como rodar

Abra o `index.html` no navegador — pronto. Para testar no celular na mesma rede:

```bash
python3 -m http.server 8000
# acesse http://SEU_IP:8000
```

## Arquitetura

| Arquivo               | Responsabilidade                                                        |
|-----------------------|-------------------------------------------------------------------------|
| `index.html`          | Estrutura das 5 telas da SPA e slots de anúncio                         |
| `style.css`           | Tema Halloween (tokens CSS), componentes e animações                    |
| `data.js`             | Configuração do quiz (etapas, perguntas, rótulos) e registro de fantasias |
| `data/*.js`           | 204 fantasias, um arquivo por categoria (ver abaixo)                    |
| `logic.js`            | Algoritmo de recomendação (puro, testável no console)                   |
| `main.js`             | Estado da UI, navegação com fade, renderização e compartilhamento       |

### Banco de fantasias (`data/`)

| Arquivo           | Categoria          | Qtd. |
|-------------------|--------------------|-----:|
| `terror.js`       | Terror             |   31 |
| `classicas.js`    | Clássicas          |   19 |
| `acao.js`         | Ação & Aventura    |   26 |
| `magia.js`        | Fantasia & Magia   |   22 |
| `divertidas.js`   | Divertidas         |   22 |
| `cultura-pop.js`  | Cultura Pop        |   84 |

Cada fantasia tem `pesos` (por atributo do quiz), `itens` (lista de compras com
termo de busca para o link de afiliado), `passos` (montagem em 3 passos),
`dificuldade` e `custo`. Para adicionar uma fantasia, basta incluir um objeto no
arquivo da categoria — a UI e o algoritmo se adaptam sozinhos.

## O quiz

- **Físico:** gênero, tom de pele, altura, biotipo, cabelo, barba e óculos.
- **Personalidade:** faixa etária, o que mais assiste, papel no filme de terror,
  festa ideal, arma, missão no Halloween e esforço na montagem.

> **Tom de pele nunca entra na pontuação.** Fantasia não tem cor — qualquer pessoa
> pode ser qualquer personagem, e o app jamais sugere alterar a cor da pele. A
> escolha serve só para o resumo do perfil e para dicas práticas de
> contraste de tintas e glitters no guia de montagem (`DICAS_PELE` em `data.js`).

## Algoritmo de recomendação

Três camadas somadas por fantasia (ver `logic.js`):

1. **Pesos diretos** — cada escolha do usuário soma os pontos definidos no mapa
   `pesos` da fantasia (`reduce`).
2. **Bônus de afinidade** — o que o usuário mais assiste casando com a categoria
   da fantasia (ex.: séries & cultura pop → Cultura Pop) rende bônus fixo.
3. **Ajuste de esforço** — cruza o esforço que o usuário topa com a
   `dificuldade` da fantasia (quem quer mínimo esforço não recebe fantasia
   "Caprichada").

O ranking usa `sort` com desempate determinístico; o % de match é normalizado
pelo máximo teórico de cada fantasia e remapeado para 35–99%.

## Monetização (placeholders)

- **AdSense:** comentário no `<head>` do `index.html`; banners responsivos nas
  divs `.adsense-slot` (Tela 5) e anúncio nativo em `#native-ad-slot` (Tela 4,
  que dura 4s). Gancho de interstitial comentado em `main.js > iniciarConsulta()`.
- **Afiliados Amazon:** configure `AMAZON_AFFILIATE_TAG` no `main.js`. Cada item
  do guia vira link de busca com `rel="sponsored"`.
- **Imagens:** os placeholders do Unsplash em `data/*.js` devem ser trocados por
  fotos próprias em produção (a UI tem fallback automático se a URL falhar).
