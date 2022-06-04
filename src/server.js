// import do servidor app
import app from "./app";

// Função para iniciar a api na porta do .env
app.listen(process.env.PORT, () => {
  console.log(`\nListagem de usuários na URL: http://localhost:${process.env.PORT}/users?page=1&limit=10\nDocumentação da API na URL: http://localhost:${process.env.PORT}/api-docs
`);
});
