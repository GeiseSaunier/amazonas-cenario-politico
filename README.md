# O Amazonas — site interativo

Site estático: não precisa de banco de dados, servidor de aplicação nem instalação. Funciona em qualquer hospedagem que sirva arquivos (Netlify, Vercel, GitHub Pages, Apache, Nginx, hospedagem compartilhada).

## Estrutura

```
index.html      → estrutura da página (seções, títulos, textos fixos, barra de navegação)
css/style.css   → aparência (cores, fontes, tamanhos, animações, modo escuro, celular)
js/dados.js     → TODO O CONTEÚDO: linha do tempo, mapa, propostas, gráficos, jogo, Lula x Flávio
js/app.js       → funcionamento (mapa, cartões, gráficos, jogo, áudio, sementes)
```

A ordem dos scripts importa: `dados.js` precisa vir antes de `app.js` no `index.html`.

## Onde mexer

| Quero mudar… | Arquivo |
|---|---|
| Um texto, número ou fonte de um acontecimento, proposta, gráfico ou pergunta | `js/dados.js` |
| Títulos das seções, abertura, conclusão, lista de fontes | `index.html` |
| Cores, fontes, tamanhos | `css/style.css` (variáveis no início do arquivo, em `:root`) |
| Velocidade da voz do botão "Ouvir" | `js/app.js`, procure `u.rate` |

Em `js/dados.js`, cada bloco é uma lista:

- `EVENTOS`: cartões da linha do tempo de 2019 a 2022
- `PROPOSTAS`: cartões que viram (proposta de Flávio, risco e o campo `lula`)
- `LUGARES`: pontos do mapa. `ll` é [longitude, latitude]; `curto` é o nome no mapa
- `TEMAS`: gráficos da comparação. A cor de cada barra: `"a"` Bolsonaro, `"m"` misto, `"b"` Lula
- `PERGUNTAS`: jogo Verdade ou mentira (`v: true` = verdade)
- `DUELO`: aba Lula x Flávio

As sementes do jogo se ajustam sozinhas quando você adiciona ou remove itens.

## Publicar

- **Netlify:** arraste o zip (ou a pasta) em Deploys.
- **Outro servidor:** envie a pasta inteira, mantendo `css/` e `js/` ao lado do `index.html`.

## Dependências externas

Só as fontes do Google Fonts (Baloo 2 e Atkinson Hyperlegible). Sem internet, o site usa fontes do próprio aparelho.
