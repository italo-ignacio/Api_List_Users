# Desafio_LinkApi

API do desafio técnico LinkApi - Junior

# Clonar o projeto

HTTPS https://github.com/itilocao/Desafio_LinkApi.git
SSH git@github.com:itilocao/Desafio_LinkApi.git

# Instalar dependências do projeto

npm i

# Dependencies

- axios
  https://github.com/axios/axios

- dotenv
  https://github.com/motdotla/dotenv

- express
  https://github.com/expressjs/express

- swagger-ui-express
  https://github.com/scottie1984/swagger-ui-express

# devDependencies

- nodemon
  https://github.com/remy/nodemon

- sucrase
  https://github.com/alangpierce/sucrase

# Criar arquivo .env na pasta do projeto

touch .env

# Adicionar os valores no .env

MOCK_BASE_URL=https://62151ae9cdb9d09717adf48c.mockapi.io/api/v1

# Execultar projeto

npm run dev
ou
npx nodemon

# Documentação da API na URL

http://localhost:3000/api-docs

# Listagem de usuários na URL

http://localhost:3000/user?page=1&limit=10
