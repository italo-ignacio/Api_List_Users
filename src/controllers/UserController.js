// import do axios
import axios from "../services/axios";

// função index
export async function index(req, res) {
  // variáveis utilizadas
  const finalUsers = []; // lista que será retornada com todos usuários, endereços e contatos
  const users = []; // lista dos usuários retornados

  // variáveis pegas na query da chamda
  const { page, limit, sortBy, order } = req.query;
  try {
    // chamada do axios para realizar a requisição e atribuir a {data}
    const { data } = await axios.get(`${process.env.MOCK_BASE_URL}/users`, {
      params: { page, limit, sortBy, order }, // utilizar os parâmetros obtidos da query na requisição
    });
    // Separar os dados da requisição e atribuir a lista de usuários
    data.map((user) => {
      // atribuição da lista de usuários
      users.push({
        id: user.id, // atribuição do id
        createdAt: user.createdAt, // atribuição da data de criação
        fullName: user.firstName + " " + user.lastName, // atribuição do nome completo
        email: user.email, // atribuição do email
      });
    });

    // for para juntar os dados recebidos dos usuários, endereços e contatos
    for (let i = 0; i < users.length; i++) {
      // chamada do axios para realizar a requisição e atribuir o contact
      const contact = await axios.get(
        `http://localhost:3000/users/${users[i].id}/contact`
      );
      // chamada do axios para realizar a requisição e atribuir o address
      const address = await axios.get(
        `http://localhost:3000/users/${users[i].id}/address`
      );

      // atribuição da lista de usuários final
      finalUsers.push({
        id: users[i].id, // atribuição do id
        createdAt: users[i].createdAt, // atribuição da data de criação
        fullName: users[i].fullName, // atribuição do nome completo
        email: users[i].email, // atribuição do email
        addresses: address.data, // atribuição dos endereços
        contacts: [contact.data], // atribuição dos contatos
      });
    }

    // retorno da lista de usuários final
    return res.json(finalUsers);
  } catch (er) {
    // retorna um erro com uma mensagem
    return res.json({
      error: "Erro ao buscar os usuários",
    });
  }
}

// função showContact
export async function showContact(req, res) {
  try {
    // chamada do axios para realizar a requisição e atribuir a {data}
    const { data } = await axios.get(
      `${process.env.MOCK_BASE_URL}/users/${req.params.userId}/contacts`
    );

    // Separar os dados da requisição e coloca-los como variáveis e retorna-los
    data.map((contact) => {
      // retorno da função
      return res.json({
        contactId: contact.id, // atribuição do id
        name: contact.name, // atribuição do nome
        phoneNumber: contact.phoneNumber, // atribuição do telefone
        email: contact.email, // atribuição do email
      });
    });
  } catch (er) {
    // retorna um erro com uma mensagem
    return res.json({
      error: "Erro ao buscar o contato",
    });
  }
}

// função showAddress
export async function showAddress(req, res) {
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
    // retorna um erro com uma mensagem
    return res.json({
      error: "Erro ao buscar o endereço",
    });
  }
}
