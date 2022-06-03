import axios from "../services/axios";

class UserController {
  async index(req, res) {
    const users = [];
    const id = [];
    const result = [];

    const loadContacts = async (id) => {
      let contactId;
      let name;
      let phoneNumber;
      let email;
      try {
        const { data } = await axios.get(`/users/${id}/contacts`);
        data.map((contact) => {
          contactId = contact.id;
          name = contact.name;
          phoneNumber = contact.phoneNumber;
          email = contact.email;
        });
        return { contactId, name, phoneNumber, email };
      } catch (error) {
        return res.status(400).json(error);
      }
    };

    const loadAdrress = async (id) => {
      try {
        const addresses = [];
        const { data } = await axios.get(`/users/${id}/address`);
        data.map((address) => {
          addresses.push({
            addressId: address.id,
            address: address.street + " " + address.number,
            country: address.country,
            countryCode: address.countryCode,
            city: address.city,
            state: address.state,
            zipcode: address.zipcode,
          });
        });
        return addresses;
      } catch (error) {
        return res.status(400).json(error);
      }
    };

    try {
      const { data } = await axios.get(`/users?page=1&limit=5`);

      data.map(async (user) => {
        id.push(user.id);

        result.push({
          id: user.id,
          createdAt: user.createdAt,
          fullName: user.firstName + " " + user.lastName,
          email: user.email,
        });
      });

      const requests = id.map(loadAdrress);
      const addresses = await Promise.all(requests);

      const requests2 = id.map(loadContacts);
      const contacts = await Promise.all(requests2);

      for (let index = 0; index < id.length; index++) {
        users.push({
          id: result[index].id,
          createdAt: result[index].createdAt,
          fullName: result[index].firstName + " " + result[index].lastName,
          email: result[index].email,
          addresses: addresses[index],
          contacts: contacts[index],
        });
      }

      return res.json({ users });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new UserController();
