const { expect } = require('chai');
const { contactsController } = require('../controllers');
const contactsData = require('../data');

describe('Contacts Controller Test', () => {
  const defaultContacts = [
    {
      name: 'Juan dela Cruz',
      phone_number: '09171234567',
      email: 'juan@dela.com',
    },
    {
      name: 'Jaime Ibarra',
      phone_number: 'N/A',
      email: 'ibarra@qqq.com',
    },
  ];
  let contacts;

  beforeEach(() => {
    console.log(contactsData);
    contactsData.splice(0, contactsData.length);
    contacts = defaultContacts;
    contactsData.push(JSON.parse(JSON.stringify(defaultContacts[0])));
    contactsData.push(JSON.parse(JSON.stringify(defaultContacts[1])));
  });

  it('should get all contacts', () => {
    const result = contactsController.getAll();

    expect(result.status).to.be.equal(200);
    expect(result.data).to.deep.eq(contacts);
  });

  it('should get a contact with a specific email 200', () => {
    const email = 'juan@dela.com';
    const result = contactsController.getByEmail(email);

    expect(result.status).to.be.equal(200);
    expect(result.data).to.be.deep.eq(contacts[0]);
  });

  it('should get a contact with a specific phone number 200', () => {
    const phone = '09171234567';
    const result = contactsController.getByPhone(phone);

    expect(result.status).to.be.equal(200);
    expect(result.data).to.be.deep.eq(contacts[0]);
  });

  it('should get a contact with a specific name 200', () => {
    const name = 'Juan dela Cruz';
    const result = contactsController.getByName(name);

    expect(result.status).to.be.equal(200);
    expect(result.data).to.be.deep.eq(contacts[0]);
  });

  it('should throw 400 if name not found', () => {
    const name = 'Name not Found';
    const errorMessage = 'Name does not exists.';
    try {
      contactsController.getByName(name);
    } catch (error) {
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.eq(errorMessage);
    }
  });

  it('should throw 400 if phone not found', () => {
    const phone = 'phone not Found';
    const errorMessage = 'phone_number does not exists.';
    try {
      contactsController.getByPhone(phone);
    } catch (error) {
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.eq(errorMessage);
    }
  });

  it('should throw 400 if email not found', () => {
    const email = 'email not Found';
    const errorMessage = 'email does not exists.';
    try {
      contactsController.getByEmail(email);
    } catch (error) {
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.eq(errorMessage);
    }
  });

  it('should create a contact and return 200', () => {
    const createData = {
      name: 'New Data',
      phone_number: '12399923923',
      email: 'newData@new.com',
    };

    const result = contactsController.create(createData);

    expect(result.status).to.be.equal(200);
    expect(result.data).to.be.deep.eq(createData);
  });

  it('should throw 400 if creating contact and it exists', () => {
    const createData = {
      name: 'Juan dela Cruz',
      phone_number: '09171234567',
      email: 'juan@dela.com',
    };

    try {
      const result = contactsController.create(createData);
    } catch (error) {
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('Duplicate Entry. Try Again.');
    }
  });

  it('should update by phone number', () => {
    const updateData = {
      name: 'Updated',
      email: 'updated@updated.com',
    };
    const phone = '09171234567';

    const result = contactsController.updateByPhone(phone, updateData);

    expect(result.status).to.be.eq(200);
    expect(result.data).to.be.deep.eq({
      ...updateData,
      phone_number: phone,
    });
  });

  it('should update by email', () => {
    const updateData = {
      name: 'Updated',
      phone_number: '1111123123',
    };
    const email = 'ibarra@qqq.com';

    const result = contactsController.updateByEmail(email, updateData);

    expect(result.status).to.be.eq(200);
    expect(result.data).to.be.deep.eq({
      ...updateData,
      email,
    });
  });

  it('should throw 400 if email does not exists while updating', () => {
    const updateData = {
      name: 'Updated',
      phone_number: '1111123123',
    };
    const email = 'doesnotexist@qqq.com';

    try {
      const result = contactsController.updateByEmail(email, updateData);
    } catch (error) {
      expect(error.status).to.be.eq(400);
      expect(error.message).to.be.eq('Email does not exists.');
    }
  });
  it('should throw 400 if email does not exists while updating', () => {
    const updateData = {
      name: 'Updated',
      email: '1111123123',
    };
    const phone = 'doesnotexist@qqq.com';

    try {
      const result = contactsController.updateByPhone(phone, updateData);
    } catch (error) {
      expect(error.status).to.be.eq(400);
      expect(error.message).to.be.eq('Phone does not exists.');
    }
  });

  it('should not update anything through updateByEmail if no data is passed', () => {
    const updateData = {};
    const email = 'ibarra@qqq.com';

    const result = contactsController.updateByEmail(email, updateData);

    expect(result.status).to.be.eq(200);
    expect(result.data).to.be.deep.eq(contacts[1]);
  });

  it('should not update anything through updateByPhone if no data is passed', () => {
    const updateData = {};
    const phone = '09171234567';

    const result = contactsController.updateByPhone(phone, updateData);

    expect(result.status).to.be.eq(200);
    expect(result.data).to.be.deep.eq(contacts[0]);
  });
});
