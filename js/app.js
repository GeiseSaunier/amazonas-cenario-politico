/* O Amazonas — funcionamento do site (mapa, linha do tempo, cartões, gráficos, jogo, áudio e sementes).
   Depende de js/dados.js, que precisa ser carregado antes. */
(function(){
"use strict";
var $ = function(s, el){ return (el||document).querySelector(s); };
var $$ = function(s, el){ return Array.prototype.slice.call((el||document).querySelectorAll(s)); };
var reduzir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function fmt(n, casas){ return Number(n).toLocaleString("pt-BR", {minimumFractionDigits:casas||0, maximumFractionDigits:casas||0}); }
function el(tag, attrs, html){ var e=document.createElement(tag); if(attrs){ for(var k in attrs){ if(k==="class") e.className=attrs[k]; else e.setAttribute(k, attrs[k]); } } if(html!=null) e.innerHTML=html; return e; }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

/* ================= SEMENTES (pontuação) ================= */
var TOTAL = EVENTOS.length + LUGARES.length + PROPOSTAS.length + TEMAS.length + DUELO.length;
var CHAVE = "amazonas-sementes-v1";
var achados = {}; var quizFeito = false; var melhor = 0;
try{ var salvo = JSON.parse(localStorage.getItem(CHAVE) || "null"); if(salvo){ (salvo.a||[]).forEach(function(k){ achados[k]=1; }); quizFeito=!!salvo.q; melhor=salvo.m||0; } }catch(e){}
function salvar(){ try{ localStorage.setItem(CHAVE, JSON.stringify({a:Object.keys(achados), q:quizFeito, m:melhor})); }catch(e){} }
function qtd(){ return Object.keys(achados).length; }
function ganhar(chave, texto){
  if(achados[chave]) return false;
  achados[chave]=1; salvar(); atualizarPilula(true);
  var n=qtd();
  if(n===TOTAL) avisar("🌳 Você descobriu tudo! Agora jogue para dar frutos");
  else avisar("+1 🌱 " + texto);
  return true;
}
function atualizarPilula(pular){
  var n=qtd();
  $("#contador").textContent = n + " de " + TOTAL;
  $("#barrinha").style.width = (n/TOTAL*100) + "%";
  if(pular){ var p=$("#pilula"); p.classList.remove("pulo"); void p.offsetWidth; p.classList.add("pulo"); }
  desenharArvores();
}
var timerAviso;
function avisar(t){ var a=$("#aviso"); a.textContent=t; a.classList.add("mostra"); clearTimeout(timerAviso); timerAviso=setTimeout(function(){ a.classList.remove("mostra"); }, 2200); }

/* ================= ÁRVORE ================= */
function estagio(n){
  if(quizFeito && n>=TOTAL) return "🌳 Sumaúma com frutos: árvore completa!";
  if(n>=TOTAL) return "🌳 Árvore grande";
  if(n>=20) return "🌳 Árvore crescendo";
  if(n>=12) return "🌿 Arvoreta";
  if(n>=5) return "🌱 Broto";
  return "🌰 Semente";
}
var FOLHAS = (function(){ var r=[]; for(var i=0;i<TOTAL;i++){ var t=Math.sqrt((i+0.5)/TOTAL), a=i*2.39996; r.push([100+72*t*Math.cos(a), 78+54*t*Math.sin(a), (a*57.3)%180]); } return r; })();
var CORES = ["#1E6B47","#2F8A5D","#3FA06C","#25784F","#4BB37A"];
function svgArvore(){
  var n=qtd(), s=0.42+0.58*(n/TOTAL);
  var h='<svg class="arvore" viewBox="0 0 200 220" role="img" aria-label="Árvore com '+n+' de '+TOTAL+' folhas">';
  h+='<ellipse cx="100" cy="206" rx="70" ry="10" fill="#8C6A43" opacity=".35"/>';
  h+='<g class="tronco-g" style="transform-origin:100px 206px;transform:scale('+s.toFixed(3)+')">';
  h+='<path d="M92 206 C94 170 92 140 96 112 L104 112 C108 140 106 170 108 206 Z" fill="#7A5230"/>';
  h+='<path d="M98 140 C88 128 78 120 66 116" stroke="#7A5230" stroke-width="6" fill="none" stroke-linecap="round"/>';
  h+='<path d="M102 132 C112 120 124 112 138 110" stroke="#7A5230" stroke-width="6" fill="none" stroke-linecap="round"/>';
  FOLHAS.forEach(function(f,i){
    h+='<g transform="rotate('+f[2].toFixed(0)+' '+f[0].toFixed(1)+' '+f[1].toFixed(1)+')"><ellipse class="folha'+(i<n?'':' apagada')+'" cx="'+f[0].toFixed(1)+'" cy="'+f[1].toFixed(1)+'" rx="13" ry="8" fill="'+CORES[i%CORES.length]+'"/></g>';
  });
  if(quizFeito && n>=12){ [[70,70],[120,60],[96,98],[140,88],[58,96],[110,40]].forEach(function(p){ h+='<circle class="fruta" cx="'+p[0]+'" cy="'+p[1]+'" r="5"/><circle class="fruta" cx="'+(p[0]+6)+'" cy="'+(p[1]+3)+'" r="5"/>'; }); }
  h+='</g></svg>';
  return h;
}
function desenharArvores(){
  $("#arvore-gaveta").innerHTML = svgArvore();
  var n=qtd();
  $("#estagio").textContent = estagio(n);
  $("#falta").textContent = n>=TOTAL ? (quizFeito ? "Você explorou tudo e terminou o jogo. Parabéns!" : "Você descobriu tudo. Termine o jogo para a árvore dar frutos.") : "Faltam " + (TOTAL-n) + " sementes para a árvore ficar completa.";
  var af=$("#arvore-final"); if(af) af.innerHTML=svgArvore();
}
function abrirGaveta(){ $("#gaveta").classList.add("aberta"); $("#gaveta-fundo").classList.add("aberta"); $("#fechar").focus(); }
function fecharGaveta(){ $("#gaveta").classList.remove("aberta"); $("#gaveta-fundo").classList.remove("aberta"); $("#pilula").focus(); }
$("#pilula").addEventListener("click", abrirGaveta);
$("#fechar").addEventListener("click", fecharGaveta);
$("#gaveta-fundo").addEventListener("click", fecharGaveta);
document.addEventListener("keydown", function(e){ if(e.key==="Escape" && $("#gaveta").classList.contains("aberta")) fecharGaveta(); });
$("#recomecar").addEventListener("click", function(){
  if(!confirm("Apagar suas sementes e começar de novo?")) return;
  achados={}; quizFeito=false; melhor=0; salvar(); atualizarPilula(false);
  $$(".ponto").forEach(function(p){ p.classList.add("novo"); var v=$(".visto-g",p); if(v) v.style.display="none"; });
  $$(".cartao").forEach(function(c){ c.classList.remove("visto"); });
  $$(".chip .ok").forEach(function(o){ o.textContent=""; });
  fecharGaveta();
});

/* ================= LETRA GRANDE ================= */
(function(){
  var b=$("#letra"), on=false;
  try{ on = localStorage.getItem("amazonas-letra")==="1"; }catch(e){}
  function aplicar(){ document.documentElement.classList.toggle("letra-grande", on); b.setAttribute("aria-pressed", on?"true":"false"); b.textContent = on ? "A−" : "A+"; b.setAttribute("aria-label", on ? "Diminuir o tamanho da letra" : "Aumentar o tamanho da letra"); }
  aplicar();
  b.addEventListener("click", function(){ on=!on; try{ localStorage.setItem("amazonas-letra", on?"1":"0"); }catch(e){} aplicar(); });
})();

/* ================= OUVIR (leitura em voz alta) ================= */
var temVoz = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
if(!temVoz) document.documentElement.classList.add("sem-voz");
var botaoFalando = null, vozPt = null;
function acharVoz(){ if(!temVoz) return; var vs=speechSynthesis.getVoices()||[];
  var br=vs.filter(function(v){ return /pt[-_]BR/i.test(v.lang); });
  var boa=br.find(function(v){ return /natural|online|neural|google|premium|enhanced|aprimorad|luciana|francisca|thalita/i.test(v.name); });
  if(boa){ vozPt=boa; return; } vozPt = vs.find(function(v){ return /pt[-_]BR/i.test(v.lang); }) || vs.find(function(v){ return /^pt/i.test(v.lang); }) || null; }
if(temVoz){ acharVoz(); speechSynthesis.onvoiceschanged = acharVoz; }
function marcar(btn, on){ if(!btn) return; btn.setAttribute("aria-pressed", on?"true":"false"); btn.innerHTML = on ? "⏹ Parar" : "🔊 Ouvir"; }
function falar(texto, btn){
  if(!temVoz) return;
  if(botaoFalando===btn && speechSynthesis.speaking){ speechSynthesis.cancel(); marcar(btn,false); botaoFalando=null; return; }
  speechSynthesis.cancel(); marcar(botaoFalando,false);
  var u=new SpeechSynthesisUtterance(texto); u.lang="pt-BR"; if(vozPt) u.voice=vozPt; u.rate=1.18; u.pitch=1.05;
  u.onend = u.onerror = function(){ if(botaoFalando===btn){ marcar(btn,false); botaoFalando=null; } };
  botaoFalando=btn; marcar(btn,true); speechSynthesis.speak(u);
}
function botaoOuvir(texto){ return '<button class="ouvir" type="button" aria-pressed="false" data-falar="'+esc(texto)+'">🔊 Ouvir</button>'; }
document.addEventListener("click", function(e){ var b=e.target.closest(".ouvir"); if(b){ e.stopPropagation(); falar(b.getAttribute("data-falar"), b); } });

/* ================= MAPA ================= */
var B={o:-74.3, n:2.6}, K=50;
function P(ll){ return [ (ll[0]-B.o)*K, (B.n-ll[1])*K ]; }
function caminho(pts, fechar){ return "M" + pts.map(function(p){ var q=P(p); return q[0].toFixed(1)+" "+q[1].toFixed(1); }).join(" L") + (fechar?" Z":""); }
function suave(pts){
  var q=pts.map(P), d="M"+q[0][0].toFixed(1)+" "+q[0][1].toFixed(1);
  for(var i=0;i<q.length-1;i++){
    var p0=q[i-1]||q[i], p1=q[i], p2=q[i+1], p3=q[i+2]||p2;
    var c1=[p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6], c2=[p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6];
    d+=" C"+c1[0].toFixed(1)+" "+c1[1].toFixed(1)+" "+c2[0].toFixed(1)+" "+c2[1].toFixed(1)+" "+p2[0].toFixed(1)+" "+p2[1].toFixed(1);
  }
  return d;
}
var CONTORNO = [[-69.95,-4.23],[-69.45,-1.6],[-69.4,-1.1],[-69.7,-0.6],[-70.05,0.55],[-69.2,1.0],[-68.2,1.75],[-67.2,1.95],[-66.85,1.25],[-66.3,0.75],[-65.5,0.9],[-65.0,1.3],[-64.3,1.5],[-63.9,1.9],[-63.4,2.15],[-63.5,1.5],[-63.0,0.9],[-62.2,0.4],[-62.0,-0.3],[-61.5,-0.9],[-61.0,-1.3],[-60.3,-1.1],[-59.7,-1.3],[-59.3,-0.6],[-59.0,0.3],[-58.9,1.1],[-58.4,0.9],[-58.4,-0.6],[-58.0,-1.5],[-57.3,-2.0],[-56.8,-2.3],[-56.4,-2.9],[-56.5,-3.6],[-56.9,-4.6],[-57.6,-5.8],[-58.2,-7.1],[-58.4,-7.6],[-59.2,-8.0],[-60.4,-8.4],[-61.5,-8.8],[-62.3,-8.1],[-63.5,-7.95],[-64.5,-8.6],[-65.4,-9.4],[-66.0,-9.8],[-66.8,-9.85],[-70.5,-8.5],[-72.2,-7.9],[-73.8,-7.35],[-73.7,-6.5],[-73.2,-6.0],[-72.9,-5.2],[-72.3,-4.9],[-71.5,-4.4],[-70.6,-4.2]];
var RIOS = [
  { pts:[[-69.95,-4.25],[-68.8,-3.4],[-67.9,-3.0],[-66.5,-2.9],[-65.5,-3.2],[-64.7,-3.3],[-63.4,-3.6],[-62.1,-3.5],[-60.9,-3.3],[-60.0,-3.15],[-59.0,-3.2],[-58.2,-3.0],[-57.2,-2.6],[-56.2,-2.4]], w:9 },
  { pts:[[-67.3,1.1],[-67.05,-0.1],[-66.0,-0.4],[-64.8,-0.5],[-63.5,-0.8],[-62.5,-1.6],[-61.3,-2.4],[-60.6,-2.9],[-60.0,-3.12]], w:7 },
  { pts:[[-63.9,-8.4],[-63.0,-7.5],[-62.0,-6.4],[-61.2,-5.8],[-60.3,-4.9],[-59.4,-4.0],[-58.9,-3.5],[-58.6,-3.25]], w:6 },
  { pts:[[-67.4,-8.75],[-66.4,-8.2],[-64.8,-7.26],[-64.4,-6.4],[-63.6,-5.4],[-62.6,-4.6],[-61.5,-3.6]], w:4.5 },
  { pts:[[-72.6,-7.6],[-71.0,-7.0],[-69.87,-6.66],[-68.4,-5.9],[-66.9,-4.88],[-66.3,-3.6],[-65.9,-2.95]], w:4 },
  { pts:[[-73.6,-6.8],[-72.8,-5.6],[-71.5,-4.6],[-70.0,-4.25]], w:3.5 }
];
var mapaPequeno=null, lugarAberto=null;
function montarMapa(){
  var peq = window.innerWidth < 640;
  if(peq===mapaPequeno) return; mapaPequeno=peq;
  var S = peq ? 1.75 : 1.15;
  var svg=$("#mapa-svg"), h="";
  h+='<rect class="vizinho" x="0" y="0" width="940" height="640" rx="18"/>';
  if(!peq) [["Colômbia",-71.6,0.4],["Venezuela",-65.2,2.15],["Roraima",-60.6,1.0],["Pará",-56.05,-5.3],["Peru",-73.3,-3.8],["Acre",-70.2,-9.4],["Rondônia",-62.9,-9.5],["Mato Grosso",-58.7,-9.3]].forEach(function(v){ var p=P([v[1],v[2]]); h+='<text class="nome-pais" x="'+p[0].toFixed(0)+'" y="'+p[1].toFixed(0)+'" text-anchor="middle">'+v[0]+'</text>'; });
  h+='<path class="estado" d="'+caminho(CONTORNO,true)+'"/>';
  var zc=P([-63.65,-8.0]);
  h+='<ellipse class="zona-sul" cx="'+zc[0].toFixed(0)+'" cy="'+zc[1].toFixed(0)+'" rx="230" ry="58" transform="rotate(-11 '+zc[0].toFixed(0)+' '+zc[1].toFixed(0)+')"/>';
  RIOS.forEach(function(r){ var d=suave(r.pts); h+='<path class="rio" d="'+d+'" stroke-width="'+r.w+'"/>'; if(r.w>=6) h+='<path class="rio-corre" d="'+d+'" stroke-width="'+(r.w*0.35).toFixed(1)+'"/>'; });
  if(!peq) [["Rio Negro",-64.6,-0.15,-4],["Solimões",-67.3,-2.55,4],["Rio Madeira",-61.3,-5.3,52],["Purus",-63.8,-5.0,55]].forEach(function(t){ var p=P([t[1],t[2]]); h+='<text class="nome-rio" x="'+p[0].toFixed(0)+'" y="'+p[1].toFixed(0)+'" transform="rotate('+t[3]+' '+p[0].toFixed(0)+' '+p[1].toFixed(0)+')">'+t[0]+'</text>'; });
  [["Boca do Acre",-67.4,-8.75],["Apuí",-59.9,-7.2],["Lábrea",-64.8,-7.26,1]].forEach(function(c){ var p=P([c[1],c[2]]); h+='<circle cx="'+p[0].toFixed(0)+'" cy="'+p[1].toFixed(0)+'" r="'+(5*S)+'" fill="var(--urucum)"/>'; if(!c[3] && !peq) h+='<text class="cidade-pequena" x="'+(p[0]+9).toFixed(0)+'" y="'+(p[1]+5).toFixed(0)+'">'+c[0]+'</text>'; });
  LUGARES.forEach(function(L){
    var p=P(L.ll); if(peq && L.desloc){ p=[p[0]+L.desloc[0], p[1]+L.desloc[1]]; } var x=p[0].toFixed(1), y=p[1].toFixed(1);
    var cores=[]; if(L.antes.length) cores.push("var(--acai)"); if(L.depois.length) cores.push("var(--rio)"); if(L.proposta.length) cores.push("var(--jambu)"); if(L.lula && L.lula.length) cores.push("var(--leaf)");
    var marcas=""; cores.forEach(function(c,i){ var dx=(i-(cores.length-1)/2)*13*S; marcas+='<circle cx="'+(p[0]+dx).toFixed(1)+'" cy="'+(p[1]+27*S).toFixed(1)+'" r="'+(5.5*S).toFixed(1)+'" fill="'+c+'" stroke="var(--surface)" stroke-width="2"/>'; });
    var nome = L.curto || L.nome;
    var rx = L.rot[0]*S, ry = L.rot[1]*S;
    h+='<g class="ponto'+(achados["lugar:"+L.id]?'':' novo')+'" data-id="'+L.id+'" tabindex="0" role="button" aria-label="'+esc(L.nome)+'">'+
       '<circle cx="'+x+'" cy="'+y+'" r="'+(40*S).toFixed(0)+'" fill="transparent"/>'+
       '<circle class="halo" cx="'+x+'" cy="'+y+'" r="'+(22*S).toFixed(1)+'"/>'+
       '<circle class="bola" cx="'+x+'" cy="'+y+'" r="'+(21*S).toFixed(1)+'"/>'+
       '<text class="emoji" x="'+x+'" y="'+(p[1]+1).toFixed(1)+'" style="font-size:'+(24*S).toFixed(0)+'px">'+L.ic+'</text>'+ marcas +
       '<text class="rotulo" x="'+(p[0]+rx).toFixed(1)+'" y="'+(p[1]+ry).toFixed(1)+'" text-anchor="'+L.rot[2]+'" style="font-size:'+(20*S).toFixed(0)+'px">'+esc(nome)+'</text>'+
       '<g class="visto-g" style="display:'+(achados["lugar:"+L.id]?'inline':'none')+'"><circle class="visto" cx="'+(p[0]+17*S).toFixed(1)+'" cy="'+(p[1]-17*S).toFixed(1)+'" r="'+(9*S).toFixed(1)+'"/><text class="visto-txt" x="'+(p[0]+17*S).toFixed(1)+'" y="'+(p[1]-16*S).toFixed(1)+'" style="font-size:'+(14*S).toFixed(0)+'px">✓</text></g>'+
       '</g>';
  });
  svg.innerHTML=h;
  $$(".ponto", svg).forEach(function(g){
    g.addEventListener("click", function(){ abrirLugar(g.getAttribute("data-id"), false); });
    g.addEventListener("keydown", function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); abrirLugar(g.getAttribute("data-id"), false); } });
    if(g.getAttribute("data-id")===lugarAberto) g.classList.add("escolhido");
  });
}
function montarChips(){
  var chips=$("#chips-lugares");
  LUGARES.forEach(function(L){
    var b=el("button",{"class":"chip","type":"button","aria-pressed":"false","data-id":L.id}, '<span aria-hidden="true">'+L.ic+'</span>'+esc(L.nome)+'<span class="ok" aria-hidden="true">'+(achados["lugar:"+L.id]?"✓":"")+'</span>');
    b.addEventListener("click", function(){ abrirLugar(L.id, true); });
    chips.appendChild(b);
  });
}
function bloco(classe, titulo, itens){
  if(!itens.length) return "";
  var falar=titulo+". "+itens.join(" ");
  return '<div class="bloco '+classe+'"><h4><span>'+titulo+'</span>'+botaoOuvir(falar)+'</h4><ul>'+itens.map(function(t){ return "<li>"+esc(t)+"</li>"; }).join("")+'</ul></div>';
}
function abrirLugar(id, rolar){
  var L=LUGARES.filter(function(l){ return l.id===id; })[0]; if(!L) return;
  lugarAberto=id;
  var pn=$("#painel");
  pn.className="painel";
  pn.innerHTML='<h3><span aria-hidden="true">'+L.ic+'</span>'+esc(L.nome)+'</h3>'+
    bloco("antes","Antes (2019 a 2022)",L.antes)+bloco("depois","Depois (2023 a 2026)",L.depois)+bloco("proposta","Proposta de Flávio",L.proposta)+bloco("lula","Proposta de Lula",L.lula||[]);
  void pn.offsetWidth; pn.classList.add("entrou");
  $$(".ponto").forEach(function(g){ g.classList.toggle("escolhido", g.getAttribute("data-id")===id); });
  $$("#chips-lugares .chip").forEach(function(c){ c.setAttribute("aria-pressed", c.getAttribute("data-id")===id ? "true":"false"); });
  if(ganhar("lugar:"+id, "Você visitou: "+L.nome)){
    var g=$('.ponto[data-id="'+id+'"]'); if(g){ g.classList.remove("novo"); $(".visto-g",g).style.display="inline"; }
    var c=$('#chips-lugares .chip[data-id="'+id+'"] .ok'); if(c) c.textContent="✓";
  }
  if(rolar || window.innerWidth<=860){ pn.scrollIntoView({behavior: reduzir?"auto":"smooth", block:"nearest"}); }
}

/* ================= LINHA DO TEMPO ================= */
function contar(elm, alvo, sufixo){
  if(elm.getAttribute("data-feito")) return; elm.setAttribute("data-feito","1");
  if(reduzir){ elm.textContent=fmt(alvo)+(sufixo||""); return; }
  var t0=null, dur=1300;
  function passo(t){ if(!t0) t0=t; var k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3); elm.textContent=fmt(Math.round(alvo*e))+(sufixo||""); if(k<1) requestAnimationFrame(passo); }
  requestAnimationFrame(passo);
}
function montarLinha(){
  var tr=$("#trilho"), pts=$("#pontinhos");
  EVENTOS.forEach(function(E,i){
    var falarTxt=E.quando+". "+E.titulo+". "+E.resumo+(E.numero?" "+fmt(E.numero.n)+(E.numero.sufixo||"")+" "+E.numero.txt+".":"")+" "+E.mais.join(" ");
    var c=el("article",{"class":"evento","data-i":i,"aria-label":(i+1)+" de "+EVENTOS.length+": "+E.titulo});
    c.innerHTML='<div class="topo-ev"><div class="icone" aria-hidden="true">'+E.icone+'</div><div><div class="quando">'+E.quando+'</div><div class="onde">📍 '+esc(E.onde)+'</div></div></div>'+
      '<h3>'+esc(E.titulo)+'</h3><p>'+esc(E.resumo)+'</p>'+
      (E.numero?'<div class="numero"><b data-n="'+E.numero.n+'" data-suf="'+(E.numero.sufixo||"")+'">0</b><span>'+esc(E.numero.txt)+'</span></div>':'')+
      '<div class="mais"><details><summary>Saber mais</summary><ul>'+E.mais.map(function(t){ return "<li>"+esc(t)+"</li>"; }).join("")+'</ul></details>'+
      '<div style="margin-top:.5rem">'+botaoOuvir(falarTxt)+'</div></div>';
    tr.appendChild(c);
    var d=el("button",{"type":"button","aria-label":"Ir para "+E.titulo}); d.addEventListener("click", function(){ irPara(i); }); pts.appendChild(d);
  });
  var atual=0;
  function irPara(i){ var c=tr.children[i]; if(!c) return; tr.scrollTo({left: c.offsetLeft - (tr.clientWidth - c.clientWidth)/2, behavior: reduzir?"auto":"smooth"}); }
  function marcarAtual(i){
    atual=i; $$("button",pts).forEach(function(b,j){ b.classList.toggle("atual", j===i); if(achados["evento:"+EVENTOS[j].id]) b.classList.add("visto"); });
    $("#volta").disabled = i===0; $("#vai").disabled = i===EVENTOS.length-1;
    var c=tr.children[i], b=$(".numero b", c); if(b) contar(b, +b.getAttribute("data-n"), b.getAttribute("data-suf"));
  }
  $("#volta").addEventListener("click", function(){ irPara(Math.max(0, atual-1)); });
  $("#vai").addEventListener("click", function(){ irPara(Math.min(EVENTOS.length-1, atual+1)); });
  tr.addEventListener("keydown", function(e){ if(e.key==="ArrowRight"){ e.preventDefault(); irPara(Math.min(EVENTOS.length-1, atual+1)); } if(e.key==="ArrowLeft"){ e.preventDefault(); irPara(Math.max(0, atual-1)); } });
  var secVisivel=false;
  new IntersectionObserver(function(es){ secVisivel = es[0].isIntersecting; if(secVisivel) ganharAtual(); }, {threshold:.35}).observe($("#passado"));
  function ganharAtual(){ var E=EVENTOS[atual]; if(secVisivel && ganhar("evento:"+E.id, E.titulo)) marcarAtual(atual); }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting && en.intersectionRatio>=.6){ marcarAtual(+en.target.getAttribute("data-i")); ganharAtual(); } });
  }, {root:tr, threshold:[.6]});
  Array.prototype.forEach.call(tr.children, function(c){ io.observe(c); });
  marcarAtual(0);
}

/* ================= PROPOSTAS ================= */
function montarPropostas(){
  var box=$("#cartoes");
  PROPOSTAS.forEach(function(Pp){
    var c=el("div",{"class":"cartao"+(achados["proposta:"+Pp.id]?" visto":"")});
    var fFrente="Proposta: "+Pp.titulo+". O que ele propõe: "+Pp.propoe;
    var fVerso=Pp.rot+": "+Pp.verso+(Pp.extra?" "+Pp.extra:"")+" Lula propõe: "+Pp.lula;
    c.innerHTML='<div class="giro">'+
      '<div class="face frente"><span class="ic" aria-hidden="true">'+Pp.ic+'</span><h3>'+esc(Pp.titulo)+'</h3><span class="rot">O que Flávio propõe</span><p>'+esc(Pp.propoe)+'</p>'+
        '<div class="acoes"><button class="virar" type="button">🔄 Virar o cartão</button>'+botaoOuvir(fFrente)+'</div></div>'+
      '<div class="face verso" aria-hidden="true"><span class="ic" aria-hidden="true">⚠️</span><h3>'+esc(Pp.titulo)+'</h3><span class="rot alerta">'+esc(Pp.rot)+'</span><p>'+esc(Pp.verso)+'</p>'+
        (Pp.extra?'<p class="extra">'+esc(Pp.extra)+'</p>':'')+
        '<div class="lula-box"><b>✅ Lula propõe</b>'+esc(Pp.lula)+'</div>'+
        '<div class="acoes"><button class="virar" type="button">↩️ Voltar</button>'+botaoOuvir(fVerso)+'</div></div>'+
      '</div>';
    var frente=$(".frente",c), verso=$(".verso",c);
    function setVirado(v){
      c.classList.toggle("virado", v);
      frente.setAttribute("aria-hidden", v?"true":"false"); verso.setAttribute("aria-hidden", v?"false":"true");
      frente.inert = v; verso.inert = !v;
      if(v && ganhar("proposta:"+Pp.id, "Proposta: "+Pp.titulo)) c.classList.add("visto");
      setTimeout(function(){ var b=$(".virar", v?verso:frente); if(b) b.focus({preventScroll:true}); }, 50);
    }
    verso.inert = true;
    $$(".virar",c).forEach(function(b){ b.addEventListener("click", function(){ setVirado(!c.classList.contains("virado")); }); });
    box.appendChild(c);
  });
}

/* ================= COMPARAR ================= */
function montarComparar(){
  var t=$("#temas");
  TEMAS.forEach(function(T,i){
    var b=el("button",{"class":"chip","type":"button","role":"tab","aria-selected":"false","aria-pressed":"false","data-id":T.id}, '<span aria-hidden="true">'+T.ic+'</span>'+T.nome+'<span class="ok" aria-hidden="true">'+(achados["tema:"+T.id]?"✓":"")+'</span>');
    b.addEventListener("click", function(){ mostrarTema(T.id, true); });
    t.appendChild(b);
  });
  var visto=false;
  new IntersectionObserver(function(es){ if(es[0].isIntersecting && !visto){ visto=true; mostrarTema(temaAtual, true); } }, {threshold:.25}).observe($("#grafico"));
  mostrarTema(TEMAS[0].id, false);
}
var temaAtual="desmat";
function mostrarTema(id, animar){
  temaAtual=id;
  var T=TEMAS.filter(function(x){ return x.id===id; })[0], g=$("#grafico");
  $$("#temas .chip").forEach(function(c){ var on=c.getAttribute("data-id")===id; c.setAttribute("aria-pressed", on?"true":"false"); c.setAttribute("aria-selected", on?"true":"false"); });
  var h='<h3><span aria-hidden="true">'+T.ic+'</span>'+T.nome+'</h3><p class="unid">'+esc(T.unid)+'</p>';
  if(T.dados){
    var tem={}; T.dados.forEach(function(d){ tem[d[2]]=1; });
    var leg=""; if(tem.a) leg+='<span><i style="background:var(--acai)"></i>Governo Bolsonaro</span>'; if(tem.m) leg+='<span><i style="background:var(--misto)"></i>Período misto</span>'; if(tem.b) leg+='<span><i style="background:var(--rio)"></i>Governo Lula</span>'; if(tem.c) leg+='<span><i style="background:var(--clima)"></i>Clima (não depende de governo)</span>';
    h+='<div class="leg-periodo">'+leg+'</div>';
    var max=Math.max.apply(null, T.dados.map(function(d){ return d[1]; }));
    h+='<div class="grafico">'+T.dados.map(function(d){ return '<div class="barra"><span class="valor">'+(T.prefixo||"")+fmt(d[1],T.casas)+'</span><div class="col '+d[2]+'" data-h="'+(d[1]/max*100*0.86).toFixed(1)+'"></div></div>'; }).join("")+'</div>';
    h+='<div class="anos">'+T.dados.map(function(d){ return '<span>'+d[0]+'</span>'; }).join("")+'</div>';
    if(T.lados) h+='<div class="duas-colunas"><div class="lado a"><small>Governo Bolsonaro (2019 a 2022)</small>'+esc(T.lados.a)+'</div><div class="lado b"><small>Governo Lula (2023 a 2026)</small>'+esc(T.lados.b)+'</div></div>';
  } else if(T.numeros){
    h+='<div class="duas-colunas"><div class="lado a"><small>Governo Bolsonaro (2019 a 2022)</small><b class="ladoN" data-n="'+T.numeros.a.n+'">0</b>'+esc(T.numeros.a.txt)+'</div><div class="lado b"><small>Governo Lula (2023 a 2026)</small><b class="ladoN" data-n="'+T.numeros.b.n+'">0</b>'+esc(T.numeros.b.txt)+'</div></div>';
  } else {
    h+='<div class="duas-colunas"><div class="lado a"><small>Governo Bolsonaro (2019 a 2022)</small><b class="ladoN" aria-hidden="true">🫁</b>'+esc(T.texto.a)+'</div><div class="lado b"><small>Governo Lula (2023 a 2026)</small><b class="ladoN" aria-hidden="true">🏥</b>'+esc(T.texto.b)+'</div></div>';
  }
  var falarTxt=T.nome+". O que os dados mostram: "+T.mostra+(T.justa?" "+T.justa:"");
  h+='<div class="leitura"><div><span class="ic" aria-hidden="true">👀</span><p><b>O que os dados mostram</b>'+esc(T.mostra)+'</p></div>'+(T.justa?'<div><span class="ic" aria-hidden="true">💬</span><p>'+esc(T.justa)+'</p></div>':'')+'</div>';
  h+='<div style="margin-top:.9rem">'+botaoOuvir(falarTxt)+'</div><p class="fonte">'+esc(T.fonte)+'</p>';
  g.innerHTML=h;
  var cols=$$(".col",g);
  if(reduzir || !animar){ cols.forEach(function(c){ c.style.height=c.getAttribute("data-h")+"%"; }); }
  else { requestAnimationFrame(function(){ requestAnimationFrame(function(){ cols.forEach(function(c,i){ setTimeout(function(){ c.style.height=c.getAttribute("data-h")+"%"; }, i*90); }); }); }); }
  $$(".ladoN[data-n]",g).forEach(function(b){ contar(b, +b.getAttribute("data-n")); });
  if(animar && ganhar("tema:"+id, "Comparação: "+T.nome)){ var ok=$('#temas .chip[data-id="'+id+'"] .ok'); if(ok) ok.textContent="✓"; }
}

/* ================= LULA X FLÁVIO ================= */
function montarDuelo(){
  var t=$("#duelo-temas");
  DUELO.forEach(function(D){
    var b=el("button",{"class":"chip","type":"button","role":"tab","aria-selected":"false","aria-pressed":"false","data-id":D.id}, '<span aria-hidden="true">'+D.ic+'</span>'+D.nome+'<span class="ok" aria-hidden="true">'+(achados["duelo:"+D.id]?"✓":"")+'</span>');
    b.addEventListener("click", function(){ mostrarDuelo(D.id, true); });
    t.appendChild(b);
  });
  var visto=false;
  new IntersectionObserver(function(es){ if(es[0].isIntersecting && !visto){ visto=true; mostrarDuelo(dueloAtual, true); } }, {threshold:.25}).observe($("#duelo-painel"));
  mostrarDuelo(DUELO[0].id, false);
}
function canto(lado, nome, inicial, C){
  var falarTxt=nome+". "+C.num+" "+C.txt+". "+C.itens.join(" ");
  return '<div class="canto '+lado+'"><div class="quem"><b aria-hidden="true">'+inicial+'</b>'+nome+'</div>'+
    '<div class="placa"><strong>'+esc(C.num)+'</strong><span>'+esc(C.txt)+'</span></div>'+
    '<ul>'+C.itens.map(function(i){ return '<li>'+esc(i)+'</li>'; }).join("")+'</ul>'+
    '<div style="margin-top:.7rem">'+botaoOuvir(falarTxt)+'</div><p class="fonte">'+esc(C.fonte)+'</p></div>';
}
var dueloAtual="trabalho";
function mostrarDuelo(id, ganha){
  dueloAtual=id;
  var D=DUELO.filter(function(x){ return x.id===id; })[0], pn=$("#duelo-painel");
  $$("#duelo-temas .chip").forEach(function(c){ var on=c.getAttribute("data-id")===id; c.setAttribute("aria-pressed", on?"true":"false"); c.setAttribute("aria-selected", on?"true":"false"); });
  var h='<h3>'+esc(D.titulo)+'</h3>';
  if(D.frases){
    h+='<p class="nota-pai">Jair Bolsonaro é o pai de Flávio e foi quem o escolheu como candidato.</p><div class="frases">'+D.frases.map(function(F){
      return '<div class="frase-cartao"><blockquote>'+esc(F.txt)+'”</blockquote><div class="autor">'+esc(F.quem)+', '+F.ano+'</div><div class="ctx">'+esc(F.ctx)+' Fonte: '+esc(F.fonte)+'.</div>'+
        '<div class="acoes">'+botaoOuvir(F.quem+", em "+F.ano+": "+F.txt+". "+F.ctx)+'</div></div>';
    }).join("")+'</div>';
  } else {
    h+='<div class="ringue'+(D.l?'':' um')+'">'+canto("f","Flávio Bolsonaro","F",D.f)+(D.l?canto("l","Lula","L",D.l):'')+'</div>';
  }
  pn.innerHTML=h;
  void pn.offsetWidth; pn.classList.remove("entrou"); pn.classList.add("entrou");
  if(ganha && ganhar("duelo:"+id, "Lula x Flávio: "+D.nome)){ var ok=$('#duelo-temas .chip[data-id="'+id+'"] .ok'); if(ok) ok.textContent="✓"; }
}

/* ================= JOGO ================= */
var jogo={ i:0, acertos:0, res:[] };
function nivel(n){
  if(n>=9) return ["🌳 Nível Sumaúma","Você conhece o Amazonas de verdade!"];
  if(n>=6) return ["🌰 Nível Castanheira","Muito bem! Você prestou atenção."];
  if(n>=3) return ["🫐 Nível Açaizeiro","Bom começo. Volte no mapa e tente de novo."];
  return ["🌱 Nível Semente","Toda árvore começa pequena. Explore a página e jogue de novo."];
}
function desenharJogo(){
  var box=$("#caixa-jogo");
  if(jogo.i>=PERGUNTAS.length){ return fimDeJogo(); }
  var Q=PERGUNTAS[jogo.i];
  var prog=PERGUNTAS.map(function(_,k){ return '<i class="'+(k<jogo.i?(jogo.res[k]?"certo":"errado"):(k===jogo.i?"agora":""))+'"></i>'; }).join("");
  box.innerHTML='<div class="progresso" aria-label="Pergunta '+(jogo.i+1)+' de '+PERGUNTAS.length+'">'+prog+'</div>'+
    '<div style="color:var(--muted);font-weight:700">Frase '+(jogo.i+1)+' de '+PERGUNTAS.length+'</div>'+
    '<p class="frase">“'+esc(Q.f)+'”</p>'+
    '<div style="margin:-.4rem 0 1.1rem">'+botaoOuvir(Q.f+" É verdade ou mentira?")+'</div>'+
    '<div class="resp"><button class="v" type="button" data-r="1"><b aria-hidden="true">✅</b>Verdade</button><button class="m" type="button" data-r="0"><b aria-hidden="true">❌</b>Mentira</button></div>'+
    '<div id="retorno" aria-live="polite"></div>';
  $$(".resp button",box).forEach(function(b){ b.addEventListener("click", function(){ responder(b.getAttribute("data-r")==="1", b); }); });
}
function responder(r, btn){
  var Q=PERGUNTAS[jogo.i], certo=(r===Q.v);
  jogo.res[jogo.i]=certo; if(certo) jogo.acertos++;
  $$(".resp button").forEach(function(b){ b.disabled=true; }); btn.classList.add("marcado");
  var ult = jogo.i===PERGUNTAS.length-1;
  var rt=$("#retorno");
  rt.className="retorno "+(certo?"certo":"errado");
  rt.innerHTML='<strong>'+(certo?"🎉 Acertou!":"🤔 Não foi dessa vez")+'</strong>'+esc(Q.e)+
    '<div class="acoes"><button class="botao-grande" type="button" id="prox">'+(ult?"Ver meu resultado 🏆":"Próxima frase")+'</button>'+botaoOuvir(Q.e)+'</div>';
  var i=jogo.i; var ps=$$(".progresso i"); if(ps[i]) ps[i].className = certo?"certo":"errado";
  $("#prox").addEventListener("click", function(){ jogo.i++; desenharJogo(); $("#caixa-jogo").scrollIntoView({behavior:reduzir?"auto":"smooth", block:"nearest"}); var f=$("#caixa-jogo .resp button, #caixa-jogo .botao-grande"); if(f) f.focus({preventScroll:true}); });
  $("#prox").focus({preventScroll:true});
}
function fimDeJogo(){
  var n=jogo.acertos, nv=nivel(n);
  var primeira=!quizFeito; quizFeito=true; melhor=Math.max(melhor,n); salvar(); desenharArvores();
  var box=$("#caixa-jogo");
  box.innerHTML='<div class="final"><div class="arvore-final" id="arvore-final">'+svgArvore()+'</div>'+
    '<div class="placar">'+n+'<span style="font-size:.45em;color:var(--muted)"> de 10</span></div>'+
    '<div class="nivel">'+nv[0]+'</div><p>'+nv[1]+(qtd()<TOTAL?" Ainda faltam "+(TOTAL-qtd())+" sementes para completar sua árvore.":"")+'</p>'+
    (melhor>n?'<p style="color:var(--muted)">Seu melhor resultado: '+melhor+' de 10.</p>':'')+
    '<div class="botoes"><button class="botao-grande" type="button" id="compartilhar">📲 Mandar para alguém</button><button class="botao-linha" type="button" id="denovo">🔁 Jogar de novo</button></div></div>';
  $("#denovo").addEventListener("click", function(){ jogo={i:0,acertos:0,res:[]}; desenharJogo(); });
  $("#compartilhar").addEventListener("click", function(){
    var txt="Fiz o jogo “Verdade ou mentira” sobre o Amazonas e acertei "+n+" de 10! Faça você também: ";
    var url=location.href.split("#")[0];
    if(navigator.share){ navigator.share({title:"O Amazonas", text:txt, url:url}).catch(function(){}); }
    else { window.open("https://wa.me/?text="+encodeURIComponent(txt+url), "_blank", "noopener"); }
  });
  if(primeira) avisar(qtd()>=12 ? "🫐 Sua árvore deu frutos!" : "🌱 Explore mais a página para sua árvore dar frutos");
  if(n>=6) chuvaDeFolhas();
}
function chuvaDeFolhas(){
  if(reduzir) return;
  var c=el("div",{"class":"chuva","aria-hidden":"true"}); var simb=["🍃","🌿","🌱","🍂","🫐"];
  for(var i=0;i<46;i++){ var s=el("span",null,simb[i%simb.length]); s.style.left=(Math.random()*100)+"vw"; s.style.animationDuration=(2.4+Math.random()*2.4)+"s"; s.style.animationDelay=(Math.random()*1.2)+"s"; s.style.fontSize=(20+Math.random()*20)+"px"; c.appendChild(s); }
  document.body.appendChild(c); setTimeout(function(){ c.remove(); }, 6000);
}

/* ================= NAVEGAÇÃO ATIVA ================= */
function navegacao(){
  var links=$$(".paradas a");
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ var id=en.target.id; links.forEach(function(a){ var on=a.getAttribute("data-alvo")===id; a.classList.toggle("ativa", on); if(on) a.setAttribute("aria-current","true"); else a.removeAttribute("aria-current"); }); } });
  }, {rootMargin:"-45% 0px -50% 0px"});
  ["mapa","passado","propostas","comparar","duelo","jogo"].forEach(function(id){ io.observe(document.getElementById(id)); });
}

/* ================= INÍCIO ================= */
montarMapa(); montarChips(); window.addEventListener("resize", montarMapa); montarLinha(); montarPropostas(); montarComparar(); montarDuelo(); desenharJogo(); navegacao(); atualizarPilula(false);
})();
