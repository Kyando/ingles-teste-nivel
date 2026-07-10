/* ============================================================================
   CONFIGURAÇÃO DO TESTE DE NÍVEL
   ----------------------------------------------------------------------------
   ENVIO DOS DADOS (Fase 3 do plano):
   Enquanto SHEETS_ENDPOINT estiver vazio (""), o teste funciona 100% para o
   aluno (ele responde e vê o resultado), mas os dados NÃO são enviados para
   lugar nenhum — ficam só guardados no aparelho dele (localStorage) como
   segurança. Isso é de propósito: a v1 é para a Natalia revisar a EXPERIÊNCIA.

   Para ligar o envio para a nossa planilha do Google (Fase 3):
     1. Criar uma Planilha Google + Apps Script (Web App) que grava cada envio.
     2. Publicar o Web App ("Qualquer pessoa") e copiar a URL /exec.
     3. Colar essa URL entre as aspas de SHEETS_ENDPOINT abaixo.
   Pronto — a partir daí cada teste enviado cai na planilha e (opcional) dispara
   um e-mail de aviso para a Natalia. Nada mais no código precisa mudar.
   ========================================================================== */

window.TESTE_CONFIG = {
  // Cole aqui a URL do Web App do Google Apps Script (termina em /exec):
  // A planilha/Apps Script deve ser criada na conta Google: bruno.rmedeiros47@gmail.com
  SHEETS_ENDPOINT: "https://script.google.com/macros/s/AKfycbzAvMO07c2uTKAQk8zikUTW7kTJgYh-DG6CikyQ8ZvFhfauB-bCw7U3OzoeN3x6uJyV/exec",

  // WhatsApp da escola para o botão de contato no final (só dígitos, com DDI 55):
  WHATSAPP: "5541996226496",

  // Marca exibida (FolkLore — alinhado ao site folkloreenglish.com.br):
  MARCA: "FolkLore",
  DESCRITOR: "Escola de Inglês Online"
};
