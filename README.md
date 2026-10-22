# 🎃 BestFantasia

Quiz gamificado de fantasias: o visitante responde até 19 perguntas rápidas em 3
etapas (físico, personalidade e "na prática") e recebe a **fantasia ideal** com
**guia completo de montagem**: itens numerados com links de compra, passo a
passo, fantasias que fazem par com ela e alternativas do pódio.

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
| `style.css`             | Tema (tokens CSS), componentes e animações                               |
| `data.js`               | Perguntas, regras de pontuação, ficha, rótulos e registro de fantasias   |
| `data/*.js`             | 272 fantasias, um arquivo por categoria (ver abaixo)                     |
| `logic.js`              | Motor de recomendação genérico (puro, testável no console)               |
| `main.js`               | Estado da UI, navegação, renderização, anúncios e compartilhamento       |
| `ferramentas/validar.js`| Validação do banco e da heurística (rode antes de commitar)              |

### Banco de fantasias (`data/`)

| Arquivo           | Categoria          | Qtd. |
|-------------------|--------------------|-----:|
| `terror.js`       | Terror             |   39 |
| `classicas.js`    | Clássicas          |   33 |
| `acao.js`         | Ação & Aventura    |   34 |
| `magia.js`        | Fantasia & Magia   |   29 |
| `divertidas.js`   | Divertidas         |   31 |
| `cultura-pop.js`  | Cultura Pop        |  106 |

## O quiz

1. **Físico:** gênero, tom de pele, altura, biotipo, cabelo, barba e óculos.
   A barba some para quem escolhe Feminino e conta como "sem barba".
2. **Personalidade:** faixa etária, o que mais assiste, papel no filme de
   terror, festa ideal, arma e missão no Halloween.
3. **Na prática:** com quem vai (sozinho, par ou turma), o que topa no rosto,
   se quer uma fantasia provocante (some para menores de 18 e conta como
   "não"), onde vai usar (festa fechada, balada, bloco de rua, escola/trabalho), quanto
   quer gastar e quanto esforço topa.

> **Tom de pele nunca entra na pontuação.** Fantasia não tem cor — qualquer pessoa
> pode ser qualquer personagem, e o app jamais sugere alterar a cor da pele. A
> escolha serve só para o resumo do perfil e para dicas práticas de
> contraste de tintas e glitters no guia de montagem (`DICAS_PELE` em `data.js`).
> O validador falha se alguém tentar usar o tom de pele na pontuação.

## Como a recomendação funciona

Cada resposta soma pontos a cada fantasia por dois caminhos (motor em `logic.js`):

1. **Pesos** (`fantasia.pesos`) — gosto e personalidade, escritos à mão em cada
   fantasia, só nas perguntas em que ela se destaca.
2. **Regras** (`regras` nas opções das perguntas, em `data.js`) — leem a
   **ficha** de todas as fantasias de uma vez. Ex.: "Bloco de rua, no calor"
   dá +6 a fantasias de `calor: 1` e −9 às de `calor: 3`.

A **ficha** guarda fatos objetivos de cada fantasia: `rosto`, `calor`,
`volume`, `formato` (solo/casal/grupo), `susto`, `reconhecimento`, `ousadia`
(0 discreta, 1 charmosa, 2 provocante) e, quando
houver, `par` (fantasias que combinam com ela) e `polemica` (figuras políticas,
evitadas para escola/trabalho).

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

Depois, rode o validador.

### O validador

`node ferramentas/validar.js` confere, em cerca de 30 segundos:

- estrutura de perguntas e fantasias, ficha e pares recíprocos;
- **alcance**: toda fantasia precisa conseguir vencer com algum conjunto de respostas;
- **distribuição** em 20 mil perfis aleatórios (avisa se uma fantasia vence demais);
- **casos de referência** (ex.: careca + cavanhaque + óculos + cultura pop → Walter White);
- que o tom de pele não muda nenhum resultado.

Ele termina com código 1 se encontrar erro.

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
  | `lateralEsquerda` / `lateralDireita` | laterais fixas, só em telas ≥1280×720 | 160×600 |

  No painel, em Anúncios automáticos: ligue a **âncora**, deixe **anúncios na
  página** desligado. Sem anúncios na home, nas perguntas (cliques acidentais)
  e na tela de carregamento (política do AdSense).
- **Afiliados Amazon:** configure `AMAZON_AFFILIATE_TAG` no `main.js`. Cada item
  do guia vira link de busca com `rel="sponsored"`.
- **Imagens:** os placeholders do Unsplash em `data/*.js` devem ser trocados por
  fotos próprias em produção (a UI tem fallback automático se a URL falhar).
