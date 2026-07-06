# Ligar o envio para o Google Sheets (Fase 3) — passo a passo

Objetivo: fazer cada teste enviado cair automaticamente numa planilha sua, e
(opcional) te avisar por e-mail. Leva ~10 minutos, uma vez só. Tudo grátis.

> Faça tudo logado na conta **bruno.rmedeiros47@gmail.com**.

## 1. Criar a planilha
1. Acesse **https://sheets.new** (cria uma planilha nova).
2. Dê um nome no canto superior esquerdo, ex.: **Teste de Nível — Respostas**.
   (Não precisa criar colunas: o script cria o cabeçalho sozinho no 1º envio.)

## 2. Abrir o editor de script
3. No menu, vá em **Extensões → Apps Script**.
4. Vai abrir uma aba com um arquivo `Código.gs` e uma função `myFunction()` vazia.
5. **Apague tudo** que estiver lá e **cole todo o conteúdo do arquivo
   [`Code.gs`](Code.gs)** (o que está aqui nesta pasta).
6. (Opcional) Para receber e-mail a cada novo teste, na linha
   `var EMAIL_AVISO = "";` coloque seu e-mail entre as aspas:
   `var EMAIL_AVISO = "bruno.rmedeiros47@gmail.com";`
7. Clique no ícone de **salvar** (disquete).

## 3. Publicar como aplicativo da web
8. No canto superior direito, clique em **Implantar → Nova implantação**.
9. Clique na engrenagem ⚙ ao lado de "Selecionar tipo" e escolha **App da Web**.
10. Preencha:
    - **Descrição:** qualquer coisa (ex.: "teste de nível v1").
    - **Executar como:** **Eu** (seu e-mail).
    - **Quem tem acesso:** **Qualquer pessoa**.  ← importante, senão a página não consegue enviar.
11. Clique **Implantar**.
12. O Google vai pedir para **autorizar**. Clique em **Autorizar acesso**, escolha
    sua conta, e em "O Google não verificou este app" clique em **Avançado →
    Acessar (nome do projeto)** e depois **Permitir**. (É seguro: o app é seu.)
13. Vai aparecer uma **URL do app da Web** terminada em **`/exec`**.
    **Copie essa URL.**

## 4. Plugar a URL na página
14. Me mande a URL (ou, se for editar você mesmo): no arquivo
    `projetos/teste-de-nivel/config.js`, cole a URL entre as aspas de
    `SHEETS_ENDPOINT`. Ex.:
    ```js
    SHEETS_ENDPOINT: "https://script.google.com/macros/s/AKfy.../exec",
    ```
15. Salvar, dar `commit` e `push` (eu faço isso quando você me mandar a URL).

## 5. Testar
16. Abra a página publicada, faça um teste rápido até o final.
17. Volte na planilha — deve aparecer **uma linha nova** com os dados. 🎉
    (Se marcou o e-mail, chega também um aviso na sua caixa.)

---

### Notas
- **Atualizar o script depois** (ex.: mudar o e-mail): edite o `Code.gs` no Apps
  Script e vá em **Implantar → Gerenciar implantações → editar (lápis) → Versão:
  Nova versão → Implantar**. A URL **continua a mesma**.
- **Spam:** a URL é pública (qualquer um poderia mandar dados). Para o lançamento
  aos 300 leads o risco é baixo. Se um dia virar problema, dá para adicionar uma
  "senha" simples compartilhada entre a página e o script — me avise que eu faço.
- **Privacidade:** os dados ficam só na sua planilha e no seu e-mail. Nada é
  compartilhado com terceiros (coerente com o aviso de LGPD que o aluno aceita).
