# Desafio_LinkApi

API do desafio técnico LinkApi - Junior

# Requisitos

- Obrigatório

Ter o Node.js instalado https://nodejs.org/en/

# Clonar o projeto

HTTPS

```bash
git clone https://github.com/itilocao/Desafio_LinkApi.git
```

SSH

```bash
git clone git@github.com:itilocao/Desafio_LinkApi.git
```

# Instalar dependências do projeto

- Insira o comando no terminal dentro da pasta do projeto

```bash
npm install
```

[Ver dependências](#dependências)

# Criar um arquivo com o nome ".env" na pasta do projeto

```bash
touch .env
```

# Adicionar os seguintes valores no arquivo ".env"

```bash
MOCK_BASE_URL=https://62151ae9cdb9d09717adf48c.mockapi.io/api/v1
PORT=3000
```

# Executar o projeto

```bash
npm run dev
```

ou

```bash
npx nodemon
```

# Documentação da API na URL

http://localhost:3000/api-docs

# Listagem de usuários na URL

http://localhost:3000/users?page=1&limit=10

# Como utilizar a documentação

- Selecione a rota que deseja visualizar

  <img src="https://user-images.githubusercontent.com/51239510/172022831-f7642cdd-e639-425d-a672-3050bb65d848.png" alt="Selecione a rota"/>

- Aperte em "_Try it out_"

  <img src="https://user-images.githubusercontent.com/51239510/172022839-672d6648-aa15-4b39-ad4c-a4d01b4fa205.png" alt="Aperte em try it out"/>

- Coloque os parâmetros e aperte em execute

  <img src="https://user-images.githubusercontent.com/51239510/172022848-1353c6f1-a8be-485e-b619-93cc3f3f324f.png" alt="Coloque os parâmetros e aperte em execute"/>

- Será retornado os usuários

  <img src="https://user-images.githubusercontent.com/51239510/172022855-f18ca7e6-02e4-421d-b942-78c1379fae57.png" alt="Será retornado os usuários"/>

# Dependências

- axios

  https://github.com/axios/axios

- dotenv

  https://github.com/motdotla/dotenv

- express

  https://github.com/expressjs/express

- swagger-ui-express

  https://github.com/scottie1984/swagger-ui-express

# Dependências de desenvolvimento

- nodemon

  https://github.com/remy/nodemon

- sucrase

  https://github.com/alangpierce/sucrase
