/* ============================================================================
   TESTE DE NÍVEL — BACKEND (Google Apps Script)
   Recebe cada teste enviado pela página e grava uma linha na planilha.
   Opcional: manda um e-mail de aviso a cada novo lead.

   Como usar: ver INSTRUCOES.md (mesmo pasta). Resumo:
   Planilha Google → Extensões → Apps Script → cole ISTO → Implantar como
   "App da Web" (executar como você, acesso "qualquer pessoa") → copie a URL /exec
   → cole em config.js (SHEETS_ENDPOINT).
   ========================================================================== */

// >>> Para receber e-mail a cada novo teste, ponha o e-mail aqui. Vazio = sem e-mail.
var EMAIL_AVISO = "";   // ex.: "bruno.rmedeiros47@gmail.com"

var ABA = "Respostas";

var CABECALHO = [
  "Recebido em", "Nível", "Rótulo", "Acertos", "Total",
  "Nome", "WhatsApp", "E-mail", "Idade",
  "Objetivo(s)", "Experiência", "Dias", "Turno", "Observação",
  "Auto A1", "Auto A2", "Auto B1", "Auto B2", "Auto C1", "Auto C2",
  "Redação", "Iniciado em"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(30000); } catch (x) {}
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(CABECALHO);
      sheet.getRange(1, 1, 1, CABECALHO.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    var p = data.perfil || {};
    var a = data.autoavaliacao || {};
    var arr = function (x) { return Array.isArray(x) ? x.join(", ") : (x || ""); };

    sheet.appendRow([
      new Date(),
      data.nivel || "", data.rotulo || "", data.acertos, data.total,
      p.nome || "", "'" + (p.whatsapp || ""), p.email || "", p.idade || "",
      arr(p.objetivo), arr(p.experiencia), arr(p.dias), arr(p.turno), p.observacao || "",
      a.A1 || "", a.A2 || "", a.B1 || "", a.B2 || "", a.C1 || "", a.C2 || "",
      data.redacao || "", data.iniciado_em || ""
    ]);

    if (EMAIL_AVISO) {
      try {
        MailApp.sendEmail(
          EMAIL_AVISO,
          "Novo teste de nível: " + (p.nome || "sem nome") + " — " + (data.nivel || "?"),
          "Nome: " + (p.nome || "") + "\n" +
          "WhatsApp: " + (p.whatsapp || "") + "\n" +
          "Nível: " + (data.nivel || "") + " (" + (data.rotulo || "") + ") — " + data.acertos + "/" + data.total + "\n" +
          "Objetivo: " + arr(p.objetivo) + "\n" +
          "Dias/Turno: " + arr(p.dias) + " · " + arr(p.turno) + "\n\n" +
          "Redação:\n" + (data.redacao || "(vazio)")
        );
      } catch (mailErr) { /* e-mail é opcional: não derruba o registro */ }
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

// Permite testar no navegador se a implantação está no ar.
function doGet() {
  return json({ ok: true, msg: "Backend do Teste de Nível no ar. Use POST para enviar." });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
