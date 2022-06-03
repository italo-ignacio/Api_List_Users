// import do servidor app
import app from "./app";

// Porta utilizada
const port = 3000;

// Função para iniciar a api na porta 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}/user?page=1&limit=10`);
});
