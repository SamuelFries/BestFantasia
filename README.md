# 🎭 BestFantasia

Quiz gamificado de fantasias: o visitante responde até 19 perguntas rápidas em 3
etapas (físico, personalidade e "na prática") e recebe a **fantasia ideal** com
**guia completo de montagem**: itens numerados com links de compra, passo a
passo, fantasias que fazem par com ela e alternativas do pódio.

O site muda de roupa conforme a época: hoje está no tema **Carnaval**; o tema
**Halloween** fica guardado em `temas/halloween.js` e volta com a troca de uma
constante (ver [Temas](#temas)).

**Stack:** HTML5 + CSS3 + JavaScript vanilla. Zero dependências, zero build.

## Como rodar

Abra o `index.html` no navegador — pronto. Para testar no celular na mesma rede:

```bash
python3 -m http.server 8000
# acesse http://SEU_IP:8000
```

## Arquitetura

| Arquivo                 | Responsabilidade                                                         |
|-------------------------|--------------------------------------------------------------------------|
| `index.html`            | Estrutura das telas da SPA e posições de anúncio                         |
| `style.css`             | Tokens CSS (com um bloco de cores por tema), componentes e animações     |
| `tema.js`               | Escolhe o tema da época (`TEMA_PADRAO`) e marca o `<html>`               |
| `temas/*.js`            | Um arquivo por tema: textos, perguntas, rótulos, dicas e ajustes         |
| `data.js`               | Perguntas, regras de pontuação, ficha, rótulos e registro de fantasias   |
| `data/*.js`             | 300 fantasias, um arquivo por categoria (ver abaixo)                     |
| `logic.js`              | Motor de recomendação genérico (puro, testável no console)               |
| `main.js`               | Estado da UI, navegação, renderização, anúncios e compartilhamento       |
| `fantasias/`            | **Gerado.** Uma página estática por fantasia + catálogo (`index.html`)  |
| `sitemap.xml`           | **Gerado** junto com `fantasias/`                                       |
| `ferramentas/gerar-paginas.js` | Gera `fantasias/` e `sitemap.xml` a partir de `data/*.js`         |
| `ferramentas/validar.js`| Validação do banco e da heurística (rode antes de commitar)              |

### Páginas estáticas dos guias

O quiz é uma SPA: sem JavaScript, o Google vê só a home. Por isso cada fantasia
também tem uma página estática em `fantasias/<slug>.html`, com ficha, itens,
passo a passo, dicas práticas tiradas da ficha e links para pares e fantasias
da mesma categoria. O catálogo fica em `fantasias/` e o resultado do quiz linka
para a página do guia.

Depois de mudar qualquer fantasia, rode `node ferramentas/gerar-paginas.js` e
faça commit do que mudar. O validador falha se as páginas estiverem
desatualizadas. O slug vem do nome (`slugFantasia` em `data.js`), então
renomear uma fantasia muda o endereço dela.

### Banco de fantasias (`data/`)

| Arquivo           | Categoria          | Qtd. |
|-------------------|--------------------|-----:|
| `terror.js`       | Terror             |   43 |
| `classicas.js`    | Clássicas          |   41 |
| `acao.js`         | Ação & Aventura    |   37 |
| `magia.js`        | Fantasia & Magia   |   30 |
| `divertidas.js`   | Divertidas         |   37 |
| `cultura-pop.js`  | Cultura Pop        |  112 |

## O quiz

1. **Físico:** gênero, tom de pele, altura, biotipo, cabelo, barba e óculos.
   A barba some para quem escolhe Feminino e conta como "sem barba".
2. **Personalidade:** faixa etária, o que mais assiste, e quatro perguntas de
   traço de personalidade cujo enunciado muda com o tema (no Halloween: papel
   no filme de terror, festa ideal, arma e missão; no Carnaval: papel no bloco,
   Carnaval ideal, arma no bloco e missão na folia).
3. **Na prática:** com quem vai (sozinho, par ou turma), o que topa no rosto,
   se quer uma fantasia provocante (some para menores de 18 e conta como
   "não"), onde vai usar (festa fechada, balada, bloco de rua, escola/trabalho), quanto
   quer gastar e quanto esforço topa.

> **Tom de pele nunca entra na pontuação.** Fantasia não tem cor — qualquer pessoa
> pode ser qualquer personagem, e o app jamais sugere alterar a cor da pele. A
> escolha serve só para o resumo do perfil e para dicas práticas de
> contraste de tintas e glitters no guia de montagem (`DICAS_PELE` em `data.js`).
> O validador falha se alguém tentar usar o tom de pele na pontuação.

## Temas

Tudo o que é "de época" vive num único objeto por tema, em `temas/<id>.js`
(`temas/halloween.js` e `temas/carnaval.js`): textos das telas, emojis
flutuantes, enunciado e opções das perguntas de personalidade, rótulos dos
motivos do match, dicas de maquiagem e ajustes de pontuação. As cores e a fonte
de título de cada tema ficam em `style.css`, no bloco `:root[data-tema="<id>"]`.

As **chaves** das perguntas e dos pesos nunca mudam (`filme: sobrevive`,
`arma: magia`…): cada tema só reescreve o enunciado. Assim as 300 fantasias e
seus pesos valem para qualquer época sem edição.

### Trocar a temporada (Halloween ⇄ Carnaval)

1. Em `tema.js`, mude `TEMA_PADRAO` (`'carnaval'` ou `'halloween'`).
2. Em `index.html`, atualize as duas linhas de Open Graph (`og:title` e
   `og:description`): os previews de WhatsApp e Twitter leem o HTML e não rodam
   JavaScript. O comentário ao lado guarda o texto de cada tema.
3. Rode `node ferramentas/validar.js` (ele usa o tema padrão) e abra o site.

Para espiar outro tema sem publicar, abra o site com `?tema=halloween` na URL.
O validador aceita o mesmo por variável de ambiente:
`TEMA=halloween node ferramentas/validar.js`.

### Criar um tema novo

1. Copie `temas/carnaval.js` para `temas/<id>.js` e preencha o objeto (o
   formato está comentado no topo do arquivo).
2. Em `style.css`, crie o bloco `:root[data-tema="<id>"]` com as cores e a
   fonte de título; se a fonte for nova, inclua-a no link do Google Fonts das 4
   páginas HTML.
3. Inclua o `<script src="temas/<id>.js">` no `<head>` das 4 páginas, antes de
   `tema.js`.

## Como a recomendação funciona

Cada resposta soma pontos a cada fantasia por dois caminhos (motor em `logic.js`):

1. **Pesos** (`fantasia.pesos`) — gosto e personalidade, escritos à mão em cada
   fantasia, só nas perguntas em que ela se destaca.
2. **Regras** (`regras` nas opções das perguntas, em `data.js`) — leem a
   **ficha** de todas as fantasias de uma vez. Ex.: "Bloco de rua, no calor"
   dá +6 a fantasias de `calor: 1` e −9 às de `calor: 3`.

O tema da época pode ainda dar um empurrão fixo pela ficha (`regras` em
`temas/<id>.js`): no Carnaval, fantasia fresca (`calor: 1`) ganha +2 e fantasia
pesada (`susto: 2`) perde 3. Esse ajuste entra na pontuação, mas não no máximo
teórico, e é pequeno de propósito para toda fantasia continuar alcançável.

A **ficha** guarda fatos objetivos de cada fantasia: `rosto`, `calor`,
`volume`, `formato` (solo/casal/grupo), `susto`, `reconhecimento`, `ousadia`
(0 discreta, 1 charmosa, 2 provocante) e, quando
houver, `par` (fantasias que combinam com ela), `polemica` (figuras políticas,
evitadas para escola/trabalho) e `publico` (gênero de uma fantasia provocante).

Quem responde **"provocante: sim"** recebe fantasia provocante (ousadia 2) do
próprio gênero; o validador falha se isso cair abaixo de 95%.

O ranking compara a pontuação de cada fantasia com o máximo que ela poderia
fazer (com uma suavização que impede fantasias com poucos pesos de vencer fácil
demais). Assim toda fantasia tem chance real de sair. O desempate é
determinístico: mesmas respostas, mesma fantasia.

### Adicionar uma fantasia

1. Inclua o objeto no arquivo da categoria em `data/`, com **ficha completa**
   (todos os campos de `FICHA_VALORES` em `data.js`), `pesos`, `itens` e 3 `passos`.
2. Se ela tiver `par`, adicione o id dela no `par` da outra fantasia também.
3. Rode `node ferramentas/validar.js` e corrija o que ele apontar.

### Adicionar uma pergunta

- **Sobre um fato que já está na ficha** (ex.: "quer ser reconhecido de
  cara?" usando `reconhecimento`): declare a pergunta em `data.js` com
  `regras` nas opções. Nenhuma fantasia precisa ser editada.
- **Sobre gosto ou personalidade:** declare a pergunta e adicione `pesos` nas
  fantasias que se destacam nela, com rótulos em `ROTULOS_MATCH`.
- Se o enunciado depender da época, deixe a versão neutra em `data.js` e
  sobrescreva em `perguntas` de cada tema (`temas/*.js`).

Depois, rode o validador.

### O validador

`node ferramentas/validar.js` confere, em cerca de 30 segundos:

- estrutura de perguntas e fantasias, ficha e pares recíprocos;
- **alcance**: toda fantasia precisa conseguir vencer com algum conjunto de respostas;
- **distribuição** em 20 mil perfis aleatórios (avisa se uma fantasia vence demais);
- **casos de referência** (ex.: careca + cavanhaque + óculos + cultura pop → Walter White);
- que o tom de pele não muda nenhum resultado.

Ele termina com código 1 se encontrar erro. Roda no tema padrão; para conferir
os outros, `TEMA=halloween node ferramentas/validar.js`.

## Monetização

- **AdSense** (`ca-pub-2662281603112502`, script no `<head>` e `ads.txt` na raiz).
  As posições são as divs com `data-anuncio`, ocultas enquanto vazias. Depois da
  aprovação, crie um bloco de display por posição no painel e cole o número
  dele em `BLOCOS_ADSENSE`, no `main.js`:

  | Posição | Onde | Formato |
  |---|---|---|
  | `resultadoAposCartao` | logo depois do cartão do resultado | responsivo |
  | `resultadoAposPassos` | depois de "Como montar" | responsivo |
  | `resultadoBase` | base do resultado | 320×100 fixo |
  | `lateralEsquerda` / `lateralDireita` | laterais fixas, só na tela de resultado e em telas ≥1280×720 | 160×600 |

  As páginas de guia (`fantasias/*.html`) usam os blocos `resultadoAposCartao`
  (depois dos itens) e `resultadoAposPassos` (depois das dicas).

  **Sem anúncios na home, nas perguntas e na tela de carregamento.** São telas
  de navegação, sem conteúdo do site, e o AdSense já reprovou o site por isso
  ("anúncios em telas sem conteúdo do editor"). Os laterais só aparecem no
  resultado (`body[data-tela]` no CSS). Pelo mesmo motivo, deixe os **anúncios
  automáticos desligados** (âncora e vinheta inclusive): numa SPA eles
  continuam na tela durante o quiz e o carregamento.

  Bloco sem anúncio (`data-ad-status="unfilled"`) some da página com o rótulo,
  em vez de virar um retângulo branco.
- **Afiliados Amazon:** configure `AMAZON_AFFILIATE_TAG` no `main.js`. Cada item
  do guia vira link de busca com `rel="sponsored"`.
- **Imagens:** os placeholders do Unsplash em `data/*.js` devem ser trocados por
  fotos próprias em produção (a UI tem fallback automático se a URL falhar).
