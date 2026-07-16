/* ============================================================================
   TESTE DE NÍVEL — LÓGICA DA PÁGINA (app.js)
   Não precisa mexer aqui para trocar questões: isso é em questoes.js.
   Fluxo: intro → perfil → autoavaliação → questões (1 por tela) → redação
          → consentimento → resultado (+ envio opcional).
   ========================================================================== */
(function () {
  "use strict";

  var D = window.TESTE_DATA;
  var CFG = window.TESTE_CONFIG || {};
  var screen = document.getElementById("screen");
  var bar = document.getElementById("progressBar");

  // O cabeçalho agora é o wordmark FolkLore fixo no HTML (fonte de verdade: Wordmark.astro).
  // CFG.MARCA/DESCRITOR seguem em uso só no texto corrido (consentimento, rodapé, payload).

  var NIVEIS = ["A1", "A2", "B1", "B2", "C1", "C2"];

  var state = {
    step: "intro",
    qIndex: 0,
    perfil: {},
    autoaval: {},
    respostas: {},   // qid -> índice escolhido
    escrita: "",
    consent: false,
    startedAt: null
  };

  /* ---------- helpers ---------- */
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function blankify(txt) { return esc(txt).replace("___", '<span class="blank">_____</span>'); }
  function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

  // máscara de telefone BR: (41) 99949-8178  (aceita fixo 10 díg. e celular 11 díg.)
  function maskTel(v) {
    var d = String(v).replace(/\D/g, "").slice(0, 11);
    if (!d) return "";
    if (d.length <= 2) return "(" + d;
    var head = "(" + d.slice(0, 2) + ") ";
    if (d.length <= 6) return head + d.slice(2);
    if (d.length <= 10) return head + d.slice(2, 6) + "-" + d.slice(6);   // fixo
    return head + d.slice(2, 7) + "-" + d.slice(7);                        // celular
  }

  function progress() {
    var total = D.questoes.length;
    switch (state.step) {
      case "intro": return 0;
      case "perfil": return 6;
      case "autoaval": return 14;
      case "questao": return 20 + Math.round((state.qIndex / total) * 62); // 20→82
      case "escrita": return 88;
      case "consent": return 94;
      case "resultado": return 100;
      default: return 0;
    }
  }
  function paint() { if (bar) bar.style.width = progress() + "%"; }

  function go(step) { state.step = step; render(); scrollTop(); }

  /* ============================ TELAS ============================ */

  function render() {
    paint();
    var fn = ({
      intro: viewIntro, perfil: viewPerfil, autoaval: viewAutoaval,
      questao: viewQuestao, escrita: viewEscrita, consent: viewConsent, resultado: viewResultado
    })[state.step];
    screen.innerHTML = "";
    screen.appendChild(fn());
  }

  /* ---- intro ---- */
  function viewIntro() {
    var v = el('<div></div>');
    v.innerHTML =
      '<span class="balao">hello! vamos descobrir seu nível?</span>' +
      '<h1>Teste de nível de <em class="serif">inglês</em></h1>' +
      '<p class="lead">Em cerca de <strong>15 minutos</strong>, no seu próprio ritmo, você descobre seu nível de A1 a C2 — a mesma escala usada no mundo todo. É de graça e não precisa instalar nada.</p>' +
      '<div class="card gold">' +
        '<h3 style="margin-top:0">Como funciona</h3>' +
        '<ul class="ticks">' +
          '<li>Algumas perguntas rápidas sobre você e seus objetivos</li>' +
          '<li>' + D.questoes.length + ' questões de inglês, do mais fácil ao mais difícil</li>' +
          '<li>Uma frase curta escrita por você</li>' +
          '<li>Seu resultado na hora, com o próximo passo</li>' +
        '</ul>' +
      '</div>' +
      '<p class="meta">Dica: responda sem pesquisar nem usar tradutor — o objetivo é te conhecer de verdade para montar a turma certa para você. 💛</p>';
    var nav = el('<div class="navrow"></div>');
    var btn = el('<button class="btn primary">Começar o teste</button>');
    btn.onclick = function () { state.startedAt = new Date().toISOString(); go("perfil"); };
    nav.appendChild(btn);
    v.appendChild(nav);
    return v;
  }

  /* ---- perfil ---- */
  function viewPerfil() {
    var v = el('<div></div>');
    v.innerHTML = '<p class="kicker">Passo 1 de 4</p><h2>Conta um pouco de você</h2>';
    var form = el('<div></div>');
    D.perfil.forEach(function (f) {
      var field = el('<div class="field" data-fid="' + f.id + '"></div>');
      var lab = '<label class="q">' + esc(f.label) + (f.obrigatorio ? ' <span class="req">*</span>' : '') +
        (f.sublabel ? '<span class="sub">' + esc(f.sublabel) + '</span>' : '') + '</label>';
      field.innerHTML = lab;
      if (f.tipo === "texto" || f.tipo === "tel" || f.tipo === "email") {
        var it = ({ texto: "text", tel: "tel", email: "email" })[f.tipo];
        var inp = el('<input type="' + it + '" ' + (f.placeholder ? 'placeholder="' + esc(f.placeholder) + '"' : '') + '>');
        inp.value = state.perfil[f.id] || "";
        if (f.tipo === "tel") {
          inp.setAttribute("inputmode", "numeric");
          inp.value = maskTel(inp.value);
          inp.oninput = function () { inp.value = maskTel(inp.value); state.perfil[f.id] = inp.value; };
        } else {
          inp.oninput = function () { state.perfil[f.id] = inp.value.trim(); };
        }
        field.appendChild(inp);
      } else if (f.tipo === "textarea") {
        var ta = el('<textarea></textarea>'); ta.value = state.perfil[f.id] || "";
        ta.oninput = function () { state.perfil[f.id] = ta.value.trim(); };
        field.appendChild(ta);
      } else if (f.tipo === "radio" || f.tipo === "checkbox") {
        var multi = f.tipo === "checkbox";
        var box = el('<div class="opts"></div>');
        f.opcoes.forEach(function (op) {
          var chosen = multi ? ((state.perfil[f.id] || []).indexOf(op) > -1) : (state.perfil[f.id] === op);
          var o = el('<div class="opt' + (multi ? ' multi' : '') + (chosen ? ' sel' : '') + '"><span class="dot"></span><span class="lbl">' + esc(op) + '</span></div>');
          o.onclick = function () {
            if (multi) {
              var arr = state.perfil[f.id] || [];
              var i = arr.indexOf(op);
              if (i > -1) arr.splice(i, 1); else arr.push(op);
              state.perfil[f.id] = arr;
              o.classList.toggle("sel");
            } else {
              state.perfil[f.id] = op;
              box.querySelectorAll(".opt").forEach(function (n) { n.classList.remove("sel"); });
              o.classList.add("sel");
            }
            clearErr(field);
          };
          box.appendChild(o);
        });
        field.appendChild(box);
      }
      field.appendChild(el('<p class="err">Este campo é obrigatório.</p>'));
      form.appendChild(field);
    });
    v.appendChild(form);

    var nav = el('<div class="navrow"></div>');
    var back = el('<button class="btn ghost">← Voltar</button>'); back.onclick = function () { go("intro"); };
    var next = el('<button class="btn primary" style="flex:1">Continuar</button>');
    next.onclick = function () { if (validaPerfil()) go("autoaval"); };
    nav.appendChild(back); nav.appendChild(next);
    v.appendChild(nav);
    return v;
  }

  function clearErr(field) { var e = field.querySelector(".err"); if (e) e.classList.remove("show"); }
  function showErr(field, msg) { var e = field.querySelector(".err"); if (e) { if (msg) e.textContent = msg; e.classList.add("show"); } }

  function validaPerfil() {
    var ok = true, first = null;
    D.perfil.forEach(function (f) {
      if (!f.obrigatorio) return;
      var val = state.perfil[f.id];
      var empty = (f.tipo === "checkbox") ? (!val || !val.length) : (!val || val === "");
      var field = screen.querySelector('[data-fid="' + f.id + '"]');
      if (empty) { ok = false; showErr(field, "Este campo é obrigatório."); if (!first) first = field; }
      else if (f.id === "whatsapp" && (String(val).replace(/\D/g, "").length < 10)) {
        ok = false; showErr(field, "Confira o WhatsApp com DDD."); if (!first) first = field;
      } else clearErr(field);
    });
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    return ok;
  }

  /* ---- autoavaliação ---- */
  function viewAutoaval() {
    var A = D.autoaval || D.autoavaliacao;
    var v = el('<div></div>');
    v.innerHTML = '<p class="kicker">Passo 2 de 4</p><h2>Como você se sente hoje?</h2><p>' + esc(A.instrucao) + '</p>' +
      '<p class="meta" style="margin-top:-2px">Da esquerda (' + esc(A.escala[0]) + ') para a direita (' + esc(A.escala[A.escala.length - 1]) + ').</p>';
    A.afirmacoes.forEach(function (af) {
      var c = el('<div class="card"><p style="font-weight:600;margin-top:0">' + esc(af.texto) + '</p></div>');
      var scale = el('<div class="scale"></div>');
      A.escala.forEach(function (lbl, i) {
        var chosen = state.autoaval[af.id] === i;
        var o = el('<button type="button" class="seg' + (chosen ? ' sel' : '') + '">' + esc(lbl) + '</button>');
        o.onclick = function () {
          state.autoaval[af.id] = i;
          scale.querySelectorAll(".seg").forEach(function (n) { n.classList.remove("sel"); });
          o.classList.add("sel");
        };
        scale.appendChild(o);
      });
      c.appendChild(scale);
      v.appendChild(c);
    });
    var nav = el('<div class="navrow"></div>');
    var back = el('<button class="btn ghost">← Voltar</button>'); back.onclick = function () { go("perfil"); };
    var next = el('<button class="btn primary" style="flex:1">Ir para as questões</button>');
    next.onclick = function () { state.qIndex = 0; go("questao"); };
    nav.appendChild(back); nav.appendChild(next);
    v.appendChild(nav);
    return v;
  }

  /* ---- questão (1 por tela, auto-avança) ---- */
  function viewQuestao() {
    var total = D.questoes.length;
    var q = D.questoes[state.qIndex];
    var v = el('<div></div>');
    v.innerHTML =
      '<p class="kicker">Passo 3 de 4</p>' +
      '<div class="qcount">Questão ' + (state.qIndex + 1) + ' de ' + total + '</div>' +
      '<div class="stem">' + blankify(q.enunciado) + '</div>';
    var box = el('<div class="opts"></div>');
    q.opcoes.forEach(function (op, i) {
      var chosen = state.respostas[q.id] === i;
      var o = el('<div class="opt' + (chosen ? ' sel' : '') + '"><span class="dot"></span><span class="lbl">' + esc(op) + '</span></div>');
      o.onclick = function () {
        state.respostas[q.id] = i;
        box.querySelectorAll(".opt").forEach(function (n) { n.classList.remove("sel"); });
        o.classList.add("sel");
        setTimeout(avancarQuestao, 260); // sensação de teste ágil; dá pra voltar
      };
      box.appendChild(o);
    });
    v.appendChild(box);

    var nav = el('<div class="navrow"></div>');
    var back = el('<button class="btn ghost">← Voltar</button>');
    back.onclick = function () {
      if (state.qIndex === 0) go("autoaval");
      else { state.qIndex--; go("questao"); }
    };
    nav.appendChild(back);
    v.appendChild(nav);
    v.appendChild(el('<p class="meta" style="text-align:center;margin-top:14px">Toque na resposta que você acha certa para avançar. Sem tradutor 😉</p>'));
    return v;
  }
  function avancarQuestao() {
    if (state.qIndex < D.questoes.length - 1) { state.qIndex++; go("questao"); }
    else go("escrita");
  }

  /* ---- redação ---- */
  function viewEscrita() {
    var W = D.producaoEscrita;
    var v = el('<div></div>');
    v.innerHTML =
      '<p class="kicker">Passo 4 de 4</p><h2>Agora, escreva um pouquinho</h2>' +
      '<p>' + esc(W.instrucao) + '</p>' +
      '<div class="card gold"><p class="prompt-en">' + esc(W.prompt) + '</p></div>';
    var ta = el('<textarea placeholder="Write your answer here..."></textarea>');
    ta.value = state.escrita;
    ta.oninput = function () { state.escrita = ta.value; };
    v.appendChild(ta);
    var nav = el('<div class="navrow"></div>');
    var back = el('<button class="btn ghost">← Voltar</button>');
    back.onclick = function () { state.qIndex = D.questoes.length - 1; go("questao"); };
    var next = el('<button class="btn primary" style="flex:1">Quase lá →</button>');
    next.onclick = function () { go("consent"); };
    nav.appendChild(back); nav.appendChild(next);
    v.appendChild(nav);
    return v;
  }

  /* ---- consentimento + envio ---- */
  function viewConsent() {
    var v = el('<div></div>');
    v.innerHTML =
      '<span class="balao">tudo pronto!</span>' +
      '<h2>Ver o meu resultado</h2>' +
      '<p>É só confirmar e a gente calcula seu nível na hora.</p>';
    var lab = el('<label class="consent"><input type="checkbox"><span>Autorizo o contato pela ' + esc(CFG.MARCA || "escola") + ' e o uso das minhas respostas para avaliar meu nível e montar a turma ideal. Seus dados não são compartilhados com terceiros.</span></label>');
    var chk = lab.querySelector("input");
    var errp = el('<p class="err">Precisamos do seu aceite para continuar.</p>');
    var nav = el('<div class="navrow"></div>');
    var back = el('<button class="btn ghost">← Voltar</button>'); back.onclick = function () { go("escrita"); };
    var send = el('<button class="btn primary" style="flex:1">Ver meu resultado 🎉</button>');
    chk.onchange = function () { state.consent = chk.checked; if (chk.checked) errp.classList.remove("show"); };
    send.onclick = function () {
      if (!state.consent) { errp.classList.add("show"); return; }
      finalizar();
    };
    nav.appendChild(back); nav.appendChild(send);
    v.appendChild(lab); v.appendChild(errp); v.appendChild(nav);
    return v;
  }

  /* ---- pontuação ---- */
  function pontuar() {
    var total = D.questoes.length, acertos = 0, detalhe = [];
    D.questoes.forEach(function (q) {
      var esc_ = state.respostas[q.id];
      var ok = esc_ === q.correta;
      if (ok) acertos++;
      detalhe.push({ id: q.id, nivel: q.nivel, escolhida: (esc_ == null ? null : q.opcoes[esc_]), correta: q.opcoes[q.correta], ok: ok });
    });
    var frac = total ? acertos / total : 0;
    var faixa = D.pontuacao.faixas.find(function (f) { return frac >= f.min && frac <= f.max; }) || D.pontuacao.faixas[0];
    return { acertos: acertos, total: total, fracao: frac, nivel: faixa.nivel, rotulo: faixa.rotulo, detalhe: detalhe };
  }

  function montarPayload(res) {
    var A = D.autoaval || D.autoavaliacao;
    var autoLegivel = {};
    A.afirmacoes.forEach(function (af) {
      var i = state.autoaval[af.id];
      autoLegivel[af.nivel] = (i == null ? "—" : A.escala[i]);
    });
    return {
      timestamp: new Date().toISOString(),
      iniciado_em: state.startedAt,
      marca: CFG.MARCA || "",
      versao_teste: (D.meta && D.meta.versao) || "",
      nivel: res.nivel, rotulo: res.rotulo, acertos: res.acertos, total: res.total,
      perfil: state.perfil,
      autoavaliacao: autoLegivel,
      redacao: state.escrita,
      respostas: res.detalhe
    };
  }

  function finalizar() {
    var res = pontuar();
    var payload = montarPayload(res);
    // 1) backup local sempre
    try {
      var arr = JSON.parse(localStorage.getItem("teste_envios") || "[]");
      arr.push(payload); localStorage.setItem("teste_envios", JSON.stringify(arr));
    } catch (e) { /* storage indisponível: segue */ }
    // 2) envio para a planilha (se configurado) — fire-and-forget
    enviar(payload);
    // 3) mostra o resultado imediatamente (não espera a rede)
    state._resultado = res;
    go("resultado");
  }

  function enviar(payload) {
    var url = CFG.SHEETS_ENDPOINT;
    if (!url) { console.info("[teste] SHEETS_ENDPOINT vazio — envio pulado (v1 de revisão). Payload:", payload); return; }
    try {
      fetch(url, {
        method: "POST",
        mode: "no-cors",                       // Apps Script: resposta opaca, não precisamos ler
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      }).catch(function (err) { console.warn("[teste] falha no envio:", err); });
    } catch (e) { console.warn("[teste] erro ao enviar:", e); }
  }

  /* ---- resultado ---- */
  function viewResultado() {
    var res = state._resultado || pontuar();
    var msg = (D.resultado && D.resultado[res.nivel]) || "";
    var v = el('<div></div>');
    v.innerHTML =
      '<div class="result-badge"><span class="big ' + res.nivel + '">' + res.nivel + '</span></div>' +
      '<div class="result-rotulo">' + esc(res.rotulo) + '</div>';
    var track = el('<div class="cefr-track"></div>');
    NIVEIS.forEach(function (n) { track.appendChild(el('<span class="lv' + (n === res.nivel ? ' on' : '') + '">' + n + '</span>')); });
    v.appendChild(track);
    v.appendChild(el('<div class="card"><p style="margin:0">' + esc(msg) + '</p></div>'));
    v.appendChild(el('<p class="meta" style="text-align:center">Você acertou <strong>' + res.acertos + ' de ' + res.total + '</strong> questões. Sua redação vai ser lida pela professora para confirmar seu nível.</p>'));

    // CTA WhatsApp
    var texto = encodeURIComponent("Oi! Acabei de fazer o teste de nível e meu resultado foi " + res.nivel + " (" + res.rotulo + "). Quero saber sobre as turmas 😊");
    var waUrl = "https://wa.me/" + (CFG.WHATSAPP || "") + "?text=" + texto;
    var cta = el('<a class="btn wa" style="margin-top:18px" href="' + waUrl + '" target="_blank" rel="noopener">Falar com a ' + esc(CFG.MARCA || "escola") + ' no WhatsApp</a>');
    v.appendChild(cta);

    v.appendChild(el('<footer class="legal">Este teste dá uma estimativa do seu nível segundo o Quadro Comum Europeu (CEFR). O resultado final é confirmado por uma professora. ' + esc(CFG.MARCA || "") + ' · ' + esc(CFG.DESCRITOR || "") + '.</footer>'));
    return v;
  }

  /* start */
  render();
})();
