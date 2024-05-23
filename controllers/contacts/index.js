const contacts = require('../../data');

module.exports = {
  getAll: () => {
    return {
      status: 200,
      data: contacts,
    };
  },
  getByName: (name) => {
    const foundContact = contacts.find((contact) => contact.name === name);

    if (!foundContact) {
      throw {
        status: 400,
        message: 'Name does not exists.',
      };
    }

    return {
      status: 200,
      data: foundContact,
    };
  },
  getByPhone: (phone_number) => {
    const foundContact = contacts.find(
      (contact) => contact.phone_number === phone_number
    );

    if (!foundContact) {
      throw {
        status: 400,
        message: 'phone_number does not exists.',
      };
    }

    return {
      status: 200,
      data: foundContact,
    };
  },
  getByEmail: (email) => {
    const foundContact = contacts.find((contact) => contact.email === email);

    if (!foundContact) {
      throw {
        status: 400,
        message: 'email does not exists.',
      };
    }

    return {
      status: 200,
      data: foundContact,
    };
  },
  create: ({ name, phone_number, email }) => {
    const findIndex = contacts.find(
      (contact) =>
        contact.email === email || contact.phone_number === phone_number
    );

    if (findIndex) {
      throw {
        status: 400,
        message: 'Duplicate Entry. Try Again.',
      };
    }

    contacts.push({
      name,
      phone_number,
      email,
    });

    return {
      status: 200,
      data: contacts[contacts.length - 1],
    };
  },
  updateByPhone: (phone_number, data) => {
    const { email, name } = data;
    const foundContact = contacts.find(
      (contact) => contact.phone_number === phone_number
    );

    if (!foundContact) {
      throw {
        status: 400,
        message: 'Phone does not exists.',
      };
    }

    if (email) foundContact.email = email;
    if (name) foundContact.name = name;

    return {
      status: 200,
      data: foundContact,
    };
  },
  updateByEmail: (email, data) => {
    const { phone_number, name } = data;
    const foundContact = contacts.find((contact) => contact.email === email);

    if (!foundContact) {
      throw {
        status: 400,
        message: 'Email does not exists.',
      };
    }

    if (phone_number) foundContact.phone_number = phone_number;
    if (name) foundContact.name = name;

    return {
      status: 200,
      data: foundContact,
    };
  },
};
