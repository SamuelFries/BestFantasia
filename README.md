# 🎃 MinhaFantasia

Quiz gamificado de Halloween, estilo criação de avatar do Nintendo Wii: o visitante
monta um "boneco" (físico), responde 7 perguntas de personalidade e recebe a
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

| Arquivo      | Responsabilidade                                                            |
|--------------|-----------------------------------------------------------------------------|
| `index.html` | Estrutura das 5 telas da SPA e slots de anúncio                             |
| `style.css`  | Tema Halloween (tokens CSS), componentes e animações                        |
| `data.js`    | 38 fantasias (pesos, itens de compra, passos de montagem) + perguntas do quiz |
| `logic.js`   | Algoritmo de recomendação (puro, testável no console)                       |
| `main.js`    | Estado da UI, navegação com fade, renderização e compartilhamento           |

## Algoritmo de recomendação

Três camadas somadas por fantasia (ver `logic.js`):

1. **Pesos diretos** — cada escolha do usuário soma os pontos definidos no mapa
   `pesos` da fantasia (`reduce`).
2. **Bônus de afinidade** — gênero de filme favorito casando com a categoria da
   fantasia (ex.: comédia → Divertidas) rende bônus fixo.
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
- **Imagens:** os placeholders do Unsplash em `data.js` devem ser trocados por
  fotos próprias em produção (a UI tem fallback automático se a URL falhar).
