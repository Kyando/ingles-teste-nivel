# Teste de Nível — Escola de Inglês Online (Natalia Sartor)

Página estática de teste de proeficiência (CEFR A1–C2) para triar leads e formar
turmas. Feita para rodar no celular, sem instalar nada, no design system Bordô.

**Status:** v1 funcional para revisão da experiência. O envio dos dados para a
planilha (Fase 3) ainda não está ligado — ver "Envio dos dados" abaixo.

## Arquivos

| Arquivo | O que é | Precisa editar? |
|---|---|---|
| `index.html` | Estrutura + estilos (design system Bordô) | Raramente |
| **`questoes.js`** | **Todo o conteúdo do teste: perfil, autoavaliação, questões, pontuação, mensagens** | **Sim — é aqui que se troca questão** |
| `config.js` | WhatsApp, marca e o endpoint de envio | Ao ligar o backend / trocar WhatsApp |
| `app.js` | Lógica do teste (navegação, correção, envio) | Só para mudar comportamento |

### Trocar / editar questões (o caso comum)
Abra **`questoes.js`**. Cada questão é um bloco:
```js
{ id: "q07", nivel: "A2", tipo: "gramática",
  enunciado: "My brother is ___ than me.",
  opcoes: ["tall", "taller", "tallest", "more tall"],
  correta: 1 }   // índice base 0: 0=1ª, 1=2ª, 2=3ª, 3=4ª
```
- Use `___` no enunciado onde entra a resposta.
- `correta` é o índice (começa em **0**).
- Pode adicionar/remover questões à vontade — o total e a pontuação se ajustam
  sozinhos (as faixas de nível são proporcionais ao total).

## Rodar localmente
Precisa de um servidor http simples (abrir o `index.html` direto com `file://`
funciona, mas um servidor é mais fiel). Ex.:
```
npx serve .        # ou: python -m http.server
```
e abra o endereço mostrado.

## Envio dos dados (Fase 3 — ainda desligado)
Hoje, ao finalizar, o aluno vê o resultado e o envio é **pulado** (os dados ficam
só no `localStorage` do aparelho dele, como backup). Para ligar o envio para uma
planilha nossa:
1. Criar Planilha Google → Extensões → Apps Script; publicar como **Web App**
   ("Executar como: eu", "Quem tem acesso: qualquer pessoa"), que grava o corpo
   JSON recebido numa linha da planilha (e, se quiser, envia e-mail de aviso).
2. Copiar a URL que termina em `/exec`.
3. Colar em `config.js` → `SHEETS_ENDPOINT`.
Nada mais muda. Inspecionar envios locais no navegador:
`localStorage.getItem('teste_envios')`.

## Deploy (GitHub Pages)
Repositório desta pasta → Settings → Pages → branch `main` / raiz. O `.nojekyll`
garante que o Pages sirva os arquivos como estão. URL final pode receber um
subdomínio (ex. `teste.<dominio-da-escola>`) quando o domínio existir.
