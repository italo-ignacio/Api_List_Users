// import do axios
import axios from "../services/axios";

// class do user controller
class UserController {
  // função index
  async index(req, res) {
    // variáveis utilizadas
    const finalUsers = []; // lista que será retornada com todos usuários, endereços e contatos
    const id = []; // lista com os ids para buscar os endereços e contatos
    const users = []; // lista dos usuários retornados

    // variáveis pegas na query da chamda
    const { page, limit, sortBy, order } = req.query;

    try {
      // chamada do axios para realizar a requisição e atribuir a {data}
      const { data } = await axios.get(`${process.env.MOCK_BASE_URL}/users`, {
        params: { page, limit, sortBy, order }, // utilizar os parâmetros obtidos da query na requisição
      });
      // Separar os dados da requisição e atribuir a lista de id e a lista de usuários
      data.map((user) => {
        id.push(user.id); // atribuição da lista de id

        // atribuição da lista de usuários
        users.push({
          id: user.id, // atribuição do id
          createdAt: user.createdAt, // atribuição da data de criação
          fullName: user.firstName + " " + user.lastName, // atribuição do nome completo
          email: user.email, // atribuição do email
        });
      });

      // função para carregar os endereços
      const loadAddress = async (userId) => {
        try {
          // chamada do axios para realizar a requisição e atribuir a {data}
          const { data } = await axios.get(
            `http://localhost:${process.env.PORT}/users/${userId}/address`
          );
          // retorno da função
          return data; // retorna a data
        } catch (er) {
          // retorna um erro com status 423 e uma mensagem
          return res.status(423).json({
            description: "Muitos usuários para serem retornados",
            solution:
              "Diminua o número de usuários a serem retornados (limit) e coloque qual pág deve ser exibida",
          });
        }
      };

      // função para carregar os contatos
      const loadContact = async (userId) => {
        try {
          // chamada do axios para realizar a requisição e atribuir a {data}
          const { data } = await axios.get(
            `http://localhost:${process.env.PORT}/users/${userId}/contact`
          );
          // retorno da função
          return data; // retorna a data
        } catch (er) {
          // retorna um erro com status 423 e uma mensagem
          return res.status(423).json({
            description: "Muitos usuários para serem retornados",
            solution:
              "Diminua o número de usuários a serem retornados (limit) e coloque qual pág deve ser exibida",
          });
        }
      };

      // criar e executa as requisições dos contatos pela lista de id
      const contacts = await Promise.all(id.map(loadContact));

      // criar e executa as requisições dos endereços pela lista de id
      const addresses = await Promise.all(id.map(loadAddress));

      // for para juntar os dados recebidos dos usuários, endereços e contatos
      for (let i = 0; i < id.length; i++) {
        // atribuição da lista de usuários final
        finalUsers.push({
          id: users[i].id, // atribuição do id
          createdAt: users[i].createdAt, // atribuição da data de criação
          fullName: users[i].fullName, // atribuição do nome completo
          email: users[i].email, // atribuição do email
          addresses: addresses[i], // atribuição dos endereços
          contacts: contacts[i], // atribuição dos contatos
        });
      }
      // retorno da lista de usuários final
      return res.json(finalUsers);
    } catch (err) {}
  }

  // função showContact
  async showContact(req, res) {
    try {
      // variável utilizada
      const contact = []; // lista de contatos do usuário

      // chamada do axios para realizar a requisição e atribuir a {data}
      const { data } = await axios.get(
        `${process.env.MOCK_BASE_URL}/users/${req.params.userId}/contacts`
      );
      // Separar os dados da requisição e coloca-los como variáveis na lista de contatos
      data.map((contacts) => {
        // atribuição da lista de contatos
        contact.push({
          contactId: contacts.id, // atribuição do id
          name: contacts.name, // atribuição do nome
          phoneNumber: contacts.phoneNumber, // atribuição do telefone
          email: contacts.email, // atribuição do email
        });
      });
      // retorno da função
      return res.json(contact); // retorna a lista
    } catch (er) {
      // retorna um erro com status 423 e uma mensagem
      return res.status(423).json({
        description: "Muitos usuários para serem retornados",
        solution:
          "Diminua o número de usuários a serem retornados (limit) e coloque qual pág deve ser exibida",
      });
    }
  }

  // função showAddress
  async showAddress(req, res) {
    try {
      // variável utilizada
      const addresses = []; // lista de endereços do usuário

      // chamada do axios para realizar a requisição e atribuir a {data}
      const { data } = await axios.get(
        `${process.env.MOCK_BASE_URL}/users/${req.params.userId}/address`
      );
      // Separar os dados da requisição e coloca-los como variáveis na lista de endereços
      data.map((address) => {
        // atribuição da lista de endereços
        addresses.push({
          addressId: address.id, // atribuição do id
          address: address.street + " " + address.number, // atribuição do endereço
          country: address.country, // atribuição do país
          countryCode: address.countryCode || " ", // atribuição da sigla do país (caso não tenha será vazio)
          city: address.city, // atribuição da cidade
          state: address.state, // atribuição do estado
          zipcode: address.zipcode, // atribuição do cep
        });
      });
      // retorno da função
      return res.json(addresses); // retorna a lista de endereços
    } catch (er) {
      // retorna um erro com status 423 e uma mensagem
      return res.status(423).json({
        description: "Muitos usuários para serem retornados",
        solution:
          "Diminua o número de usuários a serem retornados (limit) e coloque qual pág deve ser exibida",
      });
    }
  }
}

// export do user controller
export default new UserController();
