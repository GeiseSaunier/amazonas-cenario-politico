/* O Amazonas — CONTEÚDO DO SITE
   Edite aqui os textos, números e fontes. Não é preciso mexer no app.js.
   EVENTOS   = linha do tempo (2019–2022)
   PROPOSTAS = cartões Flávio x Lula
   LUGARES   = pontos do mapa (ll = [longitude, latitude])
   TEMAS     = gráficos da comparação
   PERGUNTAS = jogo Verdade ou mentira (v: true = verdade)
   DUELO     = aba Lula x Flávio
   Ao adicionar ou remover itens, as sementes do jogo se ajustam sozinhas. */
"use strict";
var EVENTOS = [
 { id:"covid1", quando:"Abril e maio de 2020", onde:"Manaus", icone:"⚰️", titulo:"Primeira onda da Covid",
   resumo:"Os hospitais de Manaus lotaram e a cidade precisou abrir valas coletivas nos cemitérios.",
   mais:["No fim de 2020 surgiu em Manaus a variante Gama, mais contagiosa, que ajudou a provocar a segunda onda."] },
 { id:"handroanthus", quando:"Dezembro de 2020", onde:"Divisa com o Pará", icone:"🪵", titulo:"Maior apreensão de madeira ilegal da história",
   resumo:"A Polícia Federal apreendeu uma montanha de madeira na divisa do Amazonas com o Pará.",
   numero:{n:226, sufixo:" mil", txt:"metros cúbicos de madeira, valendo mais de R$ 130 milhões"},
   mais:["O então ministro do Meio Ambiente, Ricardo Salles, disse que a madeira era legal.","O chefe da Polícia Federal no Amazonas, Alexandre Saraiva, denunciou Salles ao Supremo, dizendo que ele atrapalhou a operação.","Saraiva foi tirado do cargo depois da denúncia. A PF disse que a troca já estava decidida antes.","Meses depois, Salles pediu demissão enquanto era investigado no Supremo."] },
 { id:"oxigenio", quando:"14 de janeiro de 2021", onde:"Manaus", icone:"🫁", titulo:"Crise do oxigênio",
   resumo:"O oxigênio acabou em hospitais de Manaus. Pacientes com Covid morreram sem conseguir respirar.",
   numero:{n:2832, txt:"mortes por Covid a mais que o normal em janeiro de 2021"},
   mais:["Famílias levaram cilindros vazios para tentar enchê-los por conta própria e salvar seus parentes.","2.195 dessas mortes foram em Manaus, a única cidade do estado com UTI.","De 11 a 13 de janeiro, o Ministério da Saúde visitou Manaus para lançar um aplicativo e recomendar cloroquina, remédio que não funciona contra a Covid.","A crise foi o ponto de partida da CPI da Covid no Senado. Um ano depois, ninguém tinha sido condenado."] },
 { id:"garimpo21", quando:"Novembro de 2021", onde:"Rio Madeira, em Autazes", icone:"⛏️", titulo:"Invasão de garimpeiros no Rio Madeira",
   resumo:"Depois de um boato de ouro, balsas de garimpo ilegal tomaram o rio, a 113 km de Manaus.",
   numero:{n:300, txt:"balsas, com cerca de 2 mil pessoas"},
   mais:["O mercúrio do garimpo contamina a água e os peixes.","Depois da repercussão, 131 balsas foram queimadas numa operação da PF com Força Nacional, Marinha e Ibama.","Em junho de 2022, as balsas estavam de volta."] },
 { id:"brunodom", quando:"5 de junho de 2022", onde:"Vale do Javari", icone:"🕯️", titulo:"Bruno Pereira e Dom Phillips assassinados",
   resumo:"O indigenista Bruno e o jornalista inglês Dom foram mortos a tiros em Atalaia do Norte.",
   mais:["Segundo a acusação, foram mortos por atrapalhar a pesca ilegal, fazendo educação ambiental com comunidades indígenas.","O suspeito de ser o mandante, conhecido como “Colômbia”, é investigado por tráfico e por chefiar pesca ilegal.","O Vale do Javari tem a maior concentração de povos indígenas isolados do mundo.","Em fevereiro de 2026, a Justiça transferiu o julgamento de Tabatinga para Manaus."] },
 { id:"desmat", quando:"2022", onde:"Sul do Amazonas", icone:"🌳", titulo:"Desmatamento recorde",
   resumo:"O Amazonas virou o segundo estado que mais desmatava na Amazônia, atrás só do Pará.",
   numero:{n:586, txt:"km² derrubados só em Apuí, quase 60 mil campos de futebol"},
   mais:["Entre agosto de 2021 e julho de 2022, o Amazonas teve quase 23% de toda a floresta derrubada na Amazônia.","Apuí foi a cidade que mais desmatou em toda a Amazônia em 2022. Lábrea e Boca do Acre também estão entre as mais atingidas.","Em 2022, só Amazonas e Mato Grosso tiveram aumento do desmatamento. De agosto a dezembro, os alertas bateram recorde."] }
];

var PROPOSTAS = [
 { id:"zfm", lula:"Manter por completo os benefícios da Zona Franca garantidos na Constituição e fortalecer a reindustrialização do país, com empregos mais qualificados e mais produtos feitos aqui, em vez de comprados de fora.", ic:"🏭", titulo:"Zona Franca de Manaus",
   propoe:"Baixar os impostos no país inteiro e acabar com boa parte dos tratamentos especiais.",
   rot:"Por que preocupa",
   verso:"As fábricas ficam em Manaus porque lá pagam menos imposto. Se o país todo pagar menos, Manaus perde a vantagem. Empresas podem ir embora, levando empregos.",
   extra:"Em Manaus, ele disse que a Zona Franca é motivo de orgulho e que vai melhorá-la. Mas também falou em levar a Zona Franca para o Brasil inteiro. Em 2022, o corte nacional do IPI já tinha sido criticado por diminuir essa vantagem." },
 { id:"licenca", lula:"Chegar ao desmatamento zero na Amazônia, com radares, drones e satélites ligados ao combate ao crime ambiental, e incentivar indústrias de remédios, alimentos e cosméticos feitos com a floresta em pé.", ic:"📋", titulo:"Obras e licenças ambientais",
   propoe:"O governo teria um prazo para dizer se uma obra pode ser feita. Se não responder a tempo, a obra fica liberada sozinha.",
   rot:"Por que preocupa",
   verso:"Na Amazônia faltam fiscais. Muitas obras podem ser liberadas sem ninguém analisar direito, e isso pode aumentar o desmatamento." },
 { id:"ti", lula:"Proteger as terras indígenas, demarcar e retirar invasores quando for preciso, criar a Universidade Indígena e manter a saúde indígena com atenção especial.", ic:"🪶", titulo:"Terras indígenas",
   propoe:"Deixar os próprios indígenas decidirem se querem plantar, criar gado ou explorar suas terras.",
   rot:"Por que preocupa",
   verso:"O Amazonas tem muitas terras indígenas. Organizações de direitos humanos temem que isso abra as portas para invasores, garimpo e destruição da floresta." },
 { id:"mineracao", lula:"Tratar o combate à mineração ilegal como prioridade, com investigação do dinheiro de quem financia o crime, e criar uma política para os minerais estratégicos gerarem valor aqui no Brasil.", ic:"⛰️", titulo:"Mineração",
   propoe:"Incentivar o Brasil a produzir seu próprio adubo, usando minerais como o potássio.",
   rot:"Por que preocupa",
   verso:"Esse projeto já tem conflitos com comunidades indígenas da região. Acelerar as autorizações pode piorar essas brigas." },
 { id:"seguranca", lula:"Forças integradas contra o crime organizado na Amazônia como política permanente, Forças Armadas nas fronteiras com patrulha nos rios e no ar, Lei Antifacção e criação do Ministério da Segurança Pública.", ic:"🛡️", titulo:"Segurança e fronteiras",
   propoe:"Colocar Exército, Marinha e Aeronáutica para vigiar as fronteiras.",
   rot:"O que muda aqui",
   verso:"O Amazonas faz fronteira com Colômbia, Peru e Venezuela, por onde passa muita droga. Seria um dos estados mais afetados.",
   extra:"Quem apoia espera menos violência. Quem critica duvida que funcione e acha que vai custar caro." },
 { id:"luz", lula:"Seguir levando energia para quem não tem: o Luz para Todos já reservou R$ 785,9 milhões para atender mais de 75 mil pessoas em 86 municípios do Amazonas.", ic:"💡", titulo:"Conta de luz",
   propoe:"Tirar da conta de luz algumas taxas que hoje todo mundo paga.",
   rot:"Por que preocupa",
   verso:"Parte dessas taxas ajuda a pagar a energia de cidades do interior que dependem de geradores a óleo. O plano não explica como essas cidades ficariam.",
   extra:"Essa dúvida é levantada por esta análise. Não é algo que o plano afirma." },
 { id:"interior", lula:"Mais saúde na Amazônia: casas de gestantes, ambulâncias para bebês, enfermeiras obstétricas e consultas e exames pelo celular. E fibra óptica e 5G no campo, com prioridade para o Norte.", ic:"🚤", titulo:"Interior e ribeirinhos",
   propoe:"Barcos com atendimento de saúde e apoio às mulheres, internet em áreas afastadas e consultas médicas pelo celular.",
   rot:"Por que preocupa",
   verso:"O plano não diz quanto dinheiro seria usado nem quando isso aconteceria." }
];

var LUGARES = [
 { id:"manaus", lula:["Zona Franca: manter por completo os benefícios garantidos na Constituição.","Reindustrialização: mais fábricas e empregos qualificados, produzindo aqui o que hoje o Brasil compra de fora."], nome:"Manaus", ic:"🏙️", ll:[-60.02,-3.12], desloc:[-14,-8], rot:[-14,-30,"end"],
   antes:["Janeiro de 2021: o oxigênio acabou nos hospitais e pacientes com Covid morreram sem ar.","2020: hospitais lotados e valas coletivas na primeira onda da Covid."],
   depois:["A Zona Franca bateu recorde em 2025: R$ 227,7 bilhões de faturamento e cerca de 130 mil empregos diretos.","A reforma tributária aprovada no governo Lula manteve os benefícios da Zona Franca, o que ajudou a trazer novas fábricas.","Em 2025, o Amazonas teve a maior queda de mortes violentas do país: 32,5%."],
   proposta:["Zona Franca: baixar impostos no país inteiro. Se todo o Brasil pagar menos, Manaus perde a vantagem que atrai as fábricas."] },
 { id:"autazes", lula:["Combate à mineração ilegal como prioridade, investigando o dinheiro de quem financia o crime."], nome:"Autazes e Rio Madeira", ic:"⛏️", ll:[-59.13,-3.58], desloc:[18,28], curto:"Autazes", rot:[-16,40,"end"],
   antes:["Novembro de 2021: cerca de 300 balsas de garimpo ilegal e 2 mil pessoas invadiram o rio. 131 balsas foram queimadas, mas voltaram em 2022."],
   depois:["2023 e 2024: o governo federal aumentou as operações e destruiu 800 dragas de garimpo ilegal no Rio Madeira."],
   proposta:["Mineração: produzir adubo com potássio. Em Autazes, esse projeto já tem conflito com comunidades indígenas. Acelerar as autorizações pode piorar a briga."] },
 { id:"divisa", nome:"Divisa com o Pará", ic:"🪵", ll:[-57.05,-3.75], curto:"Divisa", rot:[26,46,"end"],
   antes:["Dezembro de 2020: a maior apreensão de madeira ilegal da história, 226 mil metros cúbicos, avaliada em mais de R$ 130 milhões.","O ministro Ricardo Salles disse que a madeira era legal. O chefe da PF no Amazonas o denunciou ao Supremo e depois perdeu o cargo."],
   depois:[], proposta:[] },
 { id:"tefe", lula:["Casas de gestantes, ambulâncias para bebês e enfermeiras obstétricas na Amazônia, além de consultas e exames pelo celular."], nome:"Tefé", ic:"🐬", ll:[-64.71,-3.35], rot:[0,-32,"middle"],
   antes:[],
   depois:[],
   proposta:["Interior e ribeirinhos: barcos de saúde, internet e consultas pelo celular. O plano não diz quanto custa nem quando.","Conta de luz: tirar taxas da conta. Parte delas paga a energia de cidades do interior que usam geradores a óleo. O plano não explica como elas ficariam."] },
 { id:"tabatinga", lula:["Forças Armadas nas fronteiras com patrulha nos rios e no ar, e forças integradas contra o crime organizado na Amazônia."], nome:"Tabatinga e a fronteira", curto:"Tabatinga", ic:"🛡️", ll:[-69.94,-4.2], rot:[0,-32,"middle"],
   antes:[], depois:[],
   proposta:["Segurança: Exército, Marinha e Aeronáutica vigiando as fronteiras. O Amazonas faz fronteira com Colômbia, Peru e Venezuela, rota de muita droga.","Quem apoia espera menos violência. Quem critica duvida que funcione e acha que vai custar caro."] },
 { id:"javari", lula:["Proteger as terras indígenas e retirar invasores quando for preciso."], nome:"Vale do Javari", curto:"Javari", ic:"🪶", ll:[-70.75,-5.35], desloc:[-8,16], rot:[0,46,"middle"],
   antes:["Junho de 2022: o indigenista Bruno Pereira e o jornalista Dom Phillips foram mortos a tiros perto de Atalaia do Norte. Segundo a acusação, por atrapalhar a pesca ilegal.","A região tem a maior concentração de povos indígenas isolados do mundo e virou alvo de tráfico, garimpo, caça, pesca e madeira ilegais."],
   depois:["Fevereiro de 2026: a Justiça transferiu o julgamento de Tabatinga para Manaus."],
   proposta:["Terras indígenas: deixar os indígenas decidirem se querem plantar, criar gado ou explorar suas terras. Organizações de direitos humanos temem que isso abra as portas para invasores e garimpo."] },
 { id:"sul", lula:["Desmatamento zero na Amazônia, com radares, drones e satélites ligados ao combate ao crime ambiental."], nome:"Sul do Amazonas", curto:"Sul", ic:"🌳", ll:[-64.8,-7.26], rot:[0,-32,"middle"],
   antes:["2022: Apuí foi a cidade que mais desmatou em toda a Amazônia, 586 km², quase 60 mil campos de futebol.","De agosto a dezembro de 2022, os alertas de desmatamento bateram recorde, com Lábrea e Apuí no topo."],
   depois:["O desmatamento no Amazonas caiu cerca de 60% de 2022 para 2025, três anos seguidos de queda."],
   proposta:["Licenças ambientais: se o governo não responder a tempo, a obra fica liberada sozinha. Com poucos fiscais, obras podem passar sem análise e aumentar o desmatamento."] },
 { id:"humaita", nome:"Humaitá", ic:"🚨", ll:[-63.02,-7.51], rot:[30,8,"start"],
   antes:[],
   depois:["Agosto de 2024: uma operação federal destruiu 223 balsas de garimpo ilegal na região."],
   proposta:[] }
];

var TEMAS = [
 { id:"desmat", ic:"🌳", nome:"Desmatamento", unid:"Floresta derrubada no Amazonas, em km² por ano",
   dados:[["2020",1512,"a"],["2021",2306,"a"],["2022",2594,"a"],["2023",1610,"m"],["2024",1223,"b"],["2025*",1016,"b"]],
   casas:0, fonte:"Fonte: Inpe/Prodes. O ano vai de agosto a julho. *2025: estimativa.",
   lados:{a:"Subiu: de 1.512 km² (2020) para 2.594 km² (2022)", b:"Caiu: de 1.610 km² (2023) para cerca de 1.016 km² (2025)"},
   mostra:"Subiu até 2022 e depois caiu três anos seguidos. De 2022 para 2025, a área derrubada caiu cerca de 60%. Em 2025, a queda aconteceu em 8 dos 9 estados da Amazônia.",
   justa:"" },
 { id:"zfm", ic:"🏭", nome:"Zona Franca", unid:"Faturamento do Polo Industrial de Manaus, em bilhões de reais",
   dados:[["2021",158.6,"a"],["2022",174.0,"a"],["2023",175.8,"b"],["2024",205.1,"b"],["2025",227.7,"b"]],
   casas:1, prefixo:"R$ ", fonte:"Fonte: Suframa. Valores sem descontar a inflação. 2022: aproximado.",
   lados:{a:"Faturamento crescendo; briga sobre o corte do IPI em 2022", b:"Benefícios mantidos na reforma tributária; recordes de faturamento"},
   mostra:"O faturamento cresceu nos dois governos. 2025 foi o maior da história, o quarto recorde seguido. O polo emprega cerca de 130 mil pessoas. A Suframa diz que a reforma tributária, que manteve os benefícios, ajudou a trazer novas fábricas.",
   justa:"" },
 { id:"violencia", ic:"🚓", nome:"Violência", unid:"Mortes violentas no Amazonas, a cada 100 mil habitantes",
   dados:[["2023",33.2,"b"],["2024",27.4,"b"],["2025",18.5,"b"]],
   casas:1, fonte:"Fonte: Anuário Brasileiro de Segurança Pública. 2025: calculado pela queda de 32,5%.",
   mostra:"Durante o governo Lula, as mortes violentas caíram de 33,2 para 27,4 por 100 mil habitantes de 2023 para 2024. Em 2025, o Amazonas teve a maior queda do país: 32,5%.",
   justa:"" },
 { id:"garimpo", ic:"⛏️", nome:"Garimpo", unid:"Garimpo ilegal nos rios do Amazonas",
   numeros:{a:{n:131, txt:"balsas queimadas em novembro de 2021, depois da invasão de cerca de 300 balsas no Rio Madeira"}, b:{n:1222, txt:"dragas destruídas em 2023 e 2024, sendo 800 no Rio Madeira"}},
   fonte:"Fontes: Ibama, Greenpeace, Amazônia Real, Mongabay e ClimaInfo.",
   mostra:"No governo Lula, as operações contra o garimpo ilegal aumentaram muito: foram mais de mil dragas destruídas em dois anos.",
   justa:"" },
 { id:"saude", ic:"🏥", nome:"Saúde", unid:"Crises de saúde no Amazonas",
   texto:{a:"Crise do oxigênio em janeiro de 2021: pacientes morreram sem ar em Manaus. Foi o ponto de partida da CPI da Covid.", b:"Sem crise comparável no período."},
   fonte:"Fontes: Fiocruz, Poder360, CNN Brasil e outras.",
   mostra:"A falta de oxigênio em Manaus foi uma das piores tragédias do período Bolsonaro no estado. No governo Lula não houve crise parecida.",
   justa:"" }
];

var PERGUNTAS = [
 { f:"Em janeiro de 2021, faltou oxigênio nos hospitais de Manaus.", v:true, e:"Verdade. No dia 14 de janeiro de 2021, o oxigênio acabou e pacientes com Covid morreram sem conseguir respirar." },
 { f:"A cloroquina funciona contra a Covid.", v:false, e:"Mentira. A cloroquina não funciona contra a Covid. Mesmo assim, o Ministério da Saúde foi a Manaus recomendar o remédio dias antes da crise do oxigênio." },
 { f:"Apuí foi a cidade que mais desmatou em toda a Amazônia em 2022.", v:true, e:"Verdade. Foram 586 km² derrubados, quase 60 mil campos de futebol." },
 { f:"O desmatamento no Amazonas aumentou de 2022 para 2025.", v:false, e:"Mentira. Caiu cerca de 60%: de 2.594 km² em 2022 para cerca de 1.016 km² em 2025." },
 { f:"Em 2025, a Zona Franca de Manaus teve o maior faturamento da sua história.", v:true, e:"Verdade. Foram R$ 227,7 bilhões, o quarto recorde seguido, com cerca de 130 mil empregos diretos." },
 { f:"Em 7 anos no Senado, Flávio Bolsonaro transformou em lei vários projetos próprios.", v:false, e:"Mentira. Ele apresentou 62 projetos como autor principal. Só 2 passaram no Senado, e nenhum virou lei." },
 { f:"O plano de Flávio diz quanto dinheiro vai gastar com os barcos de saúde para ribeirinhos.", v:false, e:"Mentira. O plano não diz quanto dinheiro seria usado nem quando isso aconteceria." },
 { f:"A reforma tributária aprovada no governo Lula acabou com os benefícios da Zona Franca.", v:false, e:"Mentira. A reforma manteve os benefícios da Zona Franca, e isso ajudou a trazer novas fábricas para Manaus." },
 { f:"Em 2023 e 2024, mais de mil dragas de garimpo ilegal foram destruídas no Amazonas.", v:true, e:"Verdade. Segundo o Ibama, foram 1.222 dragas destruídas, 800 delas no Rio Madeira." },
 { f:"Em 2025, o Amazonas teve a maior queda de mortes violentas do Brasil.", v:true, e:"Verdade. A queda foi de 32,5%, a maior do país." }
];

var DUELO = [
 { id:"trabalho", ic:"📑", nome:"Trabalho", titulo:"Quem trabalhou de verdade?",
   f:{ num:"0", txt:"projetos próprios que viraram lei em 7 anos de Senado",
       itens:["Desde 2019, apresentou 62 projetos como autor principal.","Só 2 passaram no Senado. Nenhum virou lei.","Um deles inclui uma entidade do Rio de Janeiro entre as que recebem dinheiro de loteria."],
       fonte:"Fonte: levantamento do UOL com dados do Senado (maio de 2026) e Folha de S.Paulo. A assessoria de Flávio diz que ele participou de mais de 100 projetos como coautor." },
   l:{ num:"R$ 7 bi", txt:"em investimentos anunciados para o Amazonas em maio de 2026",
       itens:["Luz para Todos: R$ 785,9 milhões para levar energia a mais de 75 mil pessoas em 86 municípios.","BR-319: R$ 381 milhões em obras e três pontes de concreto.","Porto Manaus Moderna: R$ 876 milhões para modernizar o terminal.","Fundo Amazônia: voltou a funcionar em 2023, depois de 4 anos parado.","Zona Franca: a reforma tributária manteve os benefícios."],
       fonte:"Fonte: Palácio do Planalto, Agência Gov e Rádio Gov (maio de 2026)." } },
 { id:"ligacoes", ic:"🚔", nome:"Ligações perigosas", titulo:"Com quem Flávio andou?",
   f:{ num:"R$ 2,3 mi", txt:"que o Ministério Público do Rio disse terem sido lavados",
       itens:["2005: como deputado no Rio, deu a Medalha Tiradentes, a maior honraria da Assembleia, a Adriano da Nóbrega, ex-PM apontado como chefe de milícia. Adriano estava preso na época.","O gabinete de Flávio empregou a mãe e a mulher de Adriano.","O Ministério Público acusou Flávio de “rachadinha”: ficar com parte do salário dos assessores.","A denúncia foi arquivada porque o STJ anulou as provas, e não porque o caso foi julgado."],
       fonte:"Fontes: Folha de S.Paulo, Congresso em Foco e Gazeta SP. Flávio diz que a primeira prisão de Adriano foi injusta, porque ele foi absolvido depois." } },
 { id:"eua", ic:"🇧🇷", nome:"Brasil ou EUA?", titulo:"Quem ficou do lado do Brasil?",
   f:{ num:"50%", txt:"de tarifa dos EUA contra produtos brasileiros em 2025",
       itens:["Julho de 2025: Donald Trump anunciou tarifa de 50% sobre produtos do Brasil, citando o julgamento de Jair Bolsonaro.","Junho de 2026: Eduardo Bolsonaro, irmão de Flávio, foi condenado pelo STF a 4 anos e 2 meses de prisão por pedir sanções dos EUA para influenciar o julgamento do pai.","Maio de 2026: Flávio foi à Casa Branca se encontrar com Trump."],
       fonte:"Fontes: CNN Brasil, Gazeta do Povo e decisão do STF. Flávio afirma que pediu a Trump para não taxar o Brasil." },
   l:{ num:"0%", txt:"de tarifa extra depois da negociação do governo Lula",
       itens:["O governo Lula defendeu as empresas e os empregos brasileiros e negociou com os EUA.","No fim de 2025, os EUA retiraram as tarifas extras e as sanções contra o ministro Alexandre de Moraes."],
       fonte:"Fontes: imprensa nacional e internacional (fim de 2025)." } },
 { id:"frases", ic:"💬", nome:"Frases", titulo:"O que eles disseram",
   frases:[
     { quem:"Flávio Bolsonaro", ano:"2016", txt:"você prefere investir na Parada Gay ou na compra de remédio", ctx:"Ao prometer cortar o apoio da prefeitura do Rio à Parada LGBT, quando era candidato a prefeito.", fonte:"Jornal Extra" },
     { quem:"Jair Bolsonaro", ano:"2011", txt:"seria incapaz de amar um filho homossexual", ctx:"Em entrevista à revista Playboy.", fonte:"Playboy, citado pela imprensa" },
     { quem:"Jair Bolsonaro", ano:"2016", txt:"Não empregaria [homens e mulheres] com o mesmo salário", ctx:"Sobre mulheres, em entrevista à RedeTV.", fonte:"Folha de S.Paulo e Estado de Minas" },
     { quem:"Jair Bolsonaro", ano:"2019", txt:"O Brasil não pode ser um país de turismo gay", ctx:"Já como presidente, falando com jornalistas.", fonte:"Terra" },
     { quem:"Jair Bolsonaro", ano:"2018", txt:"ativismo ambiental xiita", ctx:"Na campanha, prometendo acabar com o que chamou assim, ao atacar direitos indígenas e ambientais.", fonte:"CartaCapital" }
   ] }
];

