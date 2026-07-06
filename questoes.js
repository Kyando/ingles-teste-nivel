/* ============================================================================
   TESTE DE NÍVEL — BANCO DE CONTEÚDO (MÓDULO DE DADOS)
   Escola de Inglês Online · Natalia Sartor (marca provisória)

   >>> ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA MUDAR O TESTE. <<<
   A lógica da página (app.js) lê tudo daqui. Trocar, adicionar ou remover
   questões = mexer só neste arquivo.

   COMO EDITAR UMA QUESTÃO:
     - "enunciado": o texto; use "___" onde entra a resposta.
     - "opcoes": as 4 alternativas (pode ser mais ou menos que 4).
     - "correta": o ÍNDICE da alternativa certa, começando em 0
                  (0 = primeira, 1 = segunda, 2 = terceira, 3 = quarta).
     - "nivel": "A1" | "A2" | "B1" | "B2" | "C1" | "C2".
   Para ADICIONAR uma questão: copie um bloco { ... } e ajuste. O total é
   recontado sozinho. A tabela de pontuação (lá embaixo) usa o total real.
   ========================================================================== */

window.TESTE_DATA = {

  meta: {
    versao: "v1",
    atualizado: "2026-07-06",
    escala: "CEFR A1–C2"
  },

  /* ---- BLOCO 0 · PERFIL (forma as turmas) ------------------------------- */
  perfil: [
    { id: "nome",       label: "Seu nome completo",              tipo: "texto",    obrigatorio: true },
    { id: "whatsapp",   label: "WhatsApp (com DDD)",             tipo: "tel",      obrigatorio: true, placeholder: "(51) 99999-9999" },
    { id: "email",      label: "E-mail (opcional)",              tipo: "email",    obrigatorio: false },
    { id: "idade",      label: "Sua faixa de idade",             tipo: "radio",    obrigatorio: true,
      opcoes: ["até 17", "18–24", "25–34", "35–44", "45–54", "55+"] },
    { id: "objetivo",   label: "Por que você quer aprender / melhorar o inglês?", sublabel: "pode marcar mais de uma", tipo: "checkbox", obrigatorio: true,
      opcoes: ["Viagem", "Trabalho / carreira", "Trabalhar remotamente para o exterior", "Estudos ou prova", "Conversação do dia a dia", "Morar fora", "Outro"] },
    { id: "experiencia", label: "Como foi seu contato com o inglês até agora?", sublabel: "pode marcar mais de uma", tipo: "checkbox", obrigatorio: true,
      opcoes: ["Praticamente nunca estudei", "Escola / curso no passado", "Estudo sozinho (apps, vídeos)", "Uso no trabalho", "Já morei / moro fora"] },
    { id: "dias",       label: "Quais dias costumam funcionar para você?", sublabel: "marque todos que servem", tipo: "checkbox", obrigatorio: true,
      opcoes: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"] },
    { id: "turno",      label: "E qual turno?",                  tipo: "checkbox", obrigatorio: true,
      opcoes: ["Manhã", "Tarde", "Noite"] },
    { id: "observacao", label: "Quer nos contar mais alguma coisa? (opcional)", tipo: "textarea", obrigatorio: false }
  ],

  /* ---- BLOCO 1 · AUTOAVALIAÇÃO (can-do CEFR) ---------------------------- */
  autoavaliacao: {
    instrucao: "Marque, com sinceridade, o que você já consegue fazer hoje. Não tem certo nem errado — só ajuda a gente a te conhecer.",
    escala: ["Ainda não", "Um pouco", "Com facilidade"],
    afirmacoes: [
      { id: "cando_a1", nivel: "A1", texto: "Consigo me apresentar e dizer meu nome, idade e de onde sou." },
      { id: "cando_a2", nivel: "A2", texto: "Consigo pedir comida num restaurante e fazer compras simples em inglês." },
      { id: "cando_b1", nivel: "B1", texto: "Consigo conversar sobre meu dia, meus planos e minhas opiniões no cotidiano." },
      { id: "cando_b2", nivel: "B2", texto: "Consigo participar de uma reunião ou discutir um assunto complexo com fluidez." },
      { id: "cando_c1", nivel: "C1", texto: "Consigo entender filmes e podcasts sem legenda e me expressar com naturalidade." },
      { id: "cando_c2", nivel: "C2", texto: "Consigo usar o inglês com precisão total, incluindo nuances, humor e ironia." }
    ]
  },

  /* ---- BLOCO 2 · QUESTÕES (auto-corrigidas → CEFR) ---------------------- */
  /* 5 por nível, dificuldade crescente. "correta" = índice (base 0).        */
  questoes: [
    // ---- A1 ----
    { id: "q01", nivel: "A1", tipo: "gramática",   enunciado: "Hi! My name ___ Ana.", opcoes: ["is", "am", "are", "be"], correta: 0 },
    { id: "q02", nivel: "A1", tipo: "gramática",   enunciado: "She ___ coffee every morning.", opcoes: ["drink", "drinks", "drinking", "drank"], correta: 1 },
    { id: "q03", nivel: "A1", tipo: "vocabulário", enunciado: "It's cold in here. Please close the ___.", opcoes: ["window", "rain", "clock", "spoon"], correta: 0 },
    { id: "q04", nivel: "A1", tipo: "gramática",   enunciado: "I have ___ apple in my bag.", opcoes: ["a", "an", "the", "some"], correta: 1 },
    { id: "q05", nivel: "A1", tipo: "gramática",   enunciado: "The keys are ___ the table.", opcoes: ["in", "on", "at", "to"], correta: 1 },

    // ---- A2 ----
    { id: "q06", nivel: "A2", tipo: "gramática",   enunciado: "Yesterday we ___ to the beach.", opcoes: ["go", "went", "gone", "going"], correta: 1 },
    { id: "q07", nivel: "A2", tipo: "gramática",   enunciado: "My brother is ___ than me.", opcoes: ["tall", "taller", "tallest", "more tall"], correta: 1 },
    { id: "q08", nivel: "A2", tipo: "gramática",   enunciado: "There isn't ___ milk in the fridge.", opcoes: ["some", "any", "a", "many"], correta: 1 },
    { id: "q09", nivel: "A2", tipo: "vocabulário", enunciado: "I need to ___ a decision about my holiday.", opcoes: ["do", "make", "take", "get"], correta: 1 },
    { id: "q10", nivel: "A2", tipo: "gramática",   enunciado: "Look at those dark clouds! It ___ rain.", opcoes: ["is going to", "go to", "will to", "goes"], correta: 0 },

    // ---- B1 ----
    { id: "q11", nivel: "B1", tipo: "gramática",   enunciado: "I have never ___ to Japan.", opcoes: ["be", "been", "gone", "being"], correta: 1 },
    { id: "q12", nivel: "B1", tipo: "gramática",   enunciado: "If it rains tomorrow, we ___ at home.", opcoes: ["stay", "will stay", "would stay", "stayed"], correta: 1 },
    { id: "q13", nivel: "B1", tipo: "gramática",   enunciado: "That's the woman ___ car was stolen.", opcoes: ["who", "which", "whose", "whom"], correta: 2 },
    { id: "q14", nivel: "B1", tipo: "vocabulário", enunciado: "Could you ___ the baby while I cook dinner?", opcoes: ["look after", "look up", "look for", "look into"], correta: 0 },
    { id: "q15", nivel: "B1", tipo: "gramática",   enunciado: "While I ___ dinner, the phone rang.", opcoes: ["cooked", "was cooking", "cook", "have cooked"], correta: 1 },

    // ---- B2 ----
    { id: "q16", nivel: "B2", tipo: "gramática",   enunciado: "If I ___ rich, I would travel the world.", opcoes: ["am", "was", "were", "will be"], correta: 2 },
    { id: "q17", nivel: "B2", tipo: "gramática",   enunciado: "The bridge ___ in 1990.", opcoes: ["built", "was built", "has built", "is building"], correta: 1 },
    { id: "q18", nivel: "B2", tipo: "gramática",   enunciado: "My eyes hurt because I ___ at the screen all day.", opcoes: ["look", "have looked", "have been looking", "am looking"], correta: 2 },
    { id: "q19", nivel: "B2", tipo: "gramática",   enunciado: "She told me she ___ tired that day.", opcoes: ["is", "was", "has been", "will be"], correta: 1 },
    { id: "q20", nivel: "B2", tipo: "vocabulário", enunciado: "The meeting was ___ because of the storm.", opcoes: ["called off", "called on", "called up", "called for"], correta: 0 },

    // ---- C1 ----
    { id: "q21", nivel: "C1", tipo: "gramática",   enunciado: "___ had I arrived when the meeting started.", opcoes: ["No sooner", "Hardly", "Immediately", "Suddenly"], correta: 1 },
    { id: "q22", nivel: "C1", tipo: "vocabulário", enunciado: "Her argument was so ___ that no one in the room could disagree.", opcoes: ["compelling", "compulsory", "complacent", "comprehensive"], correta: 0 },
    { id: "q23", nivel: "C1", tipo: "gramática",   enunciado: "If I had studied medicine, I ___ a doctor now.", opcoes: ["would be", "would have been", "will be", "am"], correta: 0 },
    { id: "q24", nivel: "C1", tipo: "vocabulário", enunciado: "The politician gave an ___ answer, carefully avoiding the real question.", opcoes: ["evasive", "evident", "eventual", "evocative"], correta: 0 },
    { id: "q25", nivel: "C1", tipo: "gramática",   enunciado: "The committee recommended that he ___ the position immediately.", opcoes: ["takes", "take", "took", "has taken"], correta: 1 },

    // ---- C2 ----
    { id: "q26", nivel: "C2", tipo: "vocabulário", enunciado: "Let's not beat around the ___ — are you resigning or not?", opcoes: ["bush", "tree", "corner", "block"], correta: 0 },
    { id: "q27", nivel: "C2", tipo: "vocabulário", enunciado: "His ___ remarks, though subtle, revealed his deep contempt for the plan.", opcoes: ["caustic", "cautious", "casual", "candid"], correta: 0 },
    { id: "q28", nivel: "C2", tipo: "vocabulário", enunciado: "The report ___ serious doubts about the project's viability.", opcoes: ["raised", "lifted", "rose", "grew"], correta: 0 },
    { id: "q29", nivel: "C2", tipo: "leitura",     enunciado: "“Despite the glowing reviews, Mara couldn't shake the feeling that the restaurant was coasting on its reputation.” — What does Mara most likely think about the restaurant?", opcoes: ["It's overrated and living on past fame", "It's improving quickly", "It's very cheap", "It has just opened"], correta: 0 },
    { id: "q30", nivel: "C2", tipo: "gramática",   enunciado: "Only after the results were published ___ the true extent of the error.", opcoes: ["did they realize", "they realized", "they had realized", "realizing they"], correta: 0 }
  ],

  /* ---- BLOCO 3 · PRODUÇÃO ESCRITA (a Natalia lê; não é auto-corrigida) -- */
  producaoEscrita: {
    instrucao: "Sem pressa e sem tradutor 🙂 Escreva 3 a 5 frases. Se souber pouco, escreva o que conseguir — isso também nos ajuda.",
    prompt: "Tell me a little about yourself: your daily routine, your work or studies, and why you want to learn (or improve) your English."
  },

  /* ---- PONTUAÇÃO → NÍVEL ----------------------------------------------- */
  /* 1 ponto por acerto. As faixas abaixo são frações do total de questões,  */
  /* então continuam válidas mesmo se você mudar a quantidade de questões.   */
  pontuacao: {
    faixas: [
      { nivel: "A1", rotulo: "Iniciante",              min: 0.00, max: 0.22 },
      { nivel: "A2", rotulo: "Básico",                 min: 0.23, max: 0.42 },
      { nivel: "B1", rotulo: "Intermediário",          min: 0.43, max: 0.62 },
      { nivel: "B2", rotulo: "Intermediário avançado", min: 0.63, max: 0.78 },
      { nivel: "C1", rotulo: "Avançado",               min: 0.79, max: 0.92 },
      { nivel: "C2", rotulo: "Proficiente",            min: 0.93, max: 1.01 }
    ]
  },

  /* ---- MENSAGEM DE RESULTADO (o que o aluno lê) ------------------------- */
  resultado: {
    A1: "Você está começando a sua jornada — e esse é o melhor lugar para começar com método. Numa turma de nível iniciante, cada aula te dá bagagem para dizer mais sobre você em inglês.",
    A2: "Você já tem uma base! Consegue se virar em situações simples. O próximo passo é ganhar confiança para conversar — exatamente o que uma turma pequena no seu nível oferece.",
    B1: "Você é intermediário: já conversa sobre o cotidiano. Agora o pulo do gato é fluidez e naturalidade, e isso se ganha falando com regularidade numa turma do seu nível.",
    B2: "Muito bom! Você já se comunica bem em temas complexos. O foco agora é refinar precisão e vocabulário avançado — uma turma B2 mantém você desafiado.",
    C1: "Nível avançado — parabéns! Você se expressa com naturalidade. O trabalho aqui é lapidar nuance, registro e espontaneidade num grupo à altura.",
    C2: "Nível proficiente! Você domina o inglês com precisão. Nesse ponto, o valor está em manter o idioma vivo e afiado com prática de alto nível e temas exigentes."
  }
};
