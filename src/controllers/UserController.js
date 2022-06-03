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
    const { page, limit, sortBy, order, pass } = req.query;

    // função para carregar os contatos dos usuários
    const loadContacts = async (id) => {
      // variáveis utilizadas
      let contactId; // id do contato
      let name; // nome do contato
      let phoneNumber; // telefone do contato
      let email; // email do contato
      try {
        // chamada do axios para realizar a requisição e atribuir a {data}
        const { data } = await axios.get(`/users/${id}/contacts`, {
          timeout: 0,
        });
        // Separar os dados da requisição e coloca-los nas variáveis
        data.map((contact) => {
          contactId = contact.id; // atribuição do id
          name = contact.name; // atribuição do nome
          phoneNumber = contact.phoneNumber; // atribuição do telefone
          email = contact.email; // atribuição do email
        });
        // retorno da função
        return { contactId, name, phoneNumber, email }; // retorna as variáveis
      } catch (er) {
        // verifica se o pass é diferente de 0
        if (pass != 0) {
          // se o pass for diferente de 0 retorna um erro com status 423 e uma mensagem
          return res.status(423).json({
            description: "Muitos usuários para serem retornados",
            solution:
              "Diminua o número de usuários a serem retornados (limit) e coloque qual pág deve ser exibida",
          });
        }
      }
    };

    // função para carregar os endereços dos usuários
    const loadAdrress = async (id) => {
      try {
        // variável utilizada
        const addresses = []; // lista de endereços do usuário

        // chamada do axios para realizar a requisição e atribuir a {data}
        const { data } = await axios.get(`/users/${id}/address`, {
          timeout: 0,
        });
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
        return addresses; // retorna a lista de endereços
      } catch (er) {
        // verifica se o pass é diferente de 0
        if (pass != 0) {
          // se o pass for diferente de 0 retorna um erro com status 423 e uma mensagem
          return res.status(423).json({
            description: "Muitos usuários para serem retornados",
            solution:
              "Diminua o número de usuários a serem retornados (limit) e coloque qual pág deve ser exibida",
          });
        }
      }
    };

    try {
      // chamada do axios para realizar a requisição e atribuir a {data}
      const { data } = await axios.get(`/users`, {
        params: { page, limit, sortBy, order }, // utilizar os parâmetros obtidos da query na requisição
        timeout: 0,
      });
      // Separar os dados da requisição e atribuir a lista de id e a lista de usuários
      data.map(async (user) => {
        id.push(user.id); // atribuição da lista de id

        // atribuição da lista de usuários
        users.push({
          id: user.id, // atribuição do id
          createdAt: user.createdAt, // atribuição da data de criação
          fullName: user.firstName + " " + user.lastName, // atribuição do nome completo
          email: user.email, // atribuição do email
        });
      });

      // criar as requisições dos endereços pela lista de id
      const requests = id.map(loadAdrress);
      // executar as requisições dos endereços e atribui-la na variável addresses
      const addresses = await Promise.all(requests);

      // criar as requisições dos contatos pela lista de id
      const requests2 = id.map(loadContacts);
      // executar as requisições dos contatos e atribui-lo na variável contacts
      const contacts = await Promise.all(requests2);

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
}

// export do user controller
export default new UserController();
