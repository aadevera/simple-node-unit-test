const router = require('express').Router();
const { contactsController } = require('../../controllers');

router.get('/all', (req, res) => {
  try {
    const result = contactsController.getAll();
    const { status, data } = result;

    return res.status(status).json({ data });
  } catch (error) {
    if (error.status) res.status(error.status);
    else res.status(400);

    return res.json({ error: error.message || 'Bad Request' });
  }
});

router.get('/name/:name', (req, res) => {
  const { name } = req.params;
  try {
    const result = contactsController.getByName(name);
    const { status, data } = result;

    return res.status(status).json({ data });
  } catch (error) {
    if (error.status) res.status(error.status);
    else res.status(400);

    return res.json({ error: error.message || 'Bad Request' });
  }
});

router.get('/phone/:phone_number', (req, res) => {
  const { phone_number } = req.params;
  try {
    const result = contactsController.getByPhone(phone_number);
    const { status, data } = result;

    return res.status(status).json({ data });
  } catch (error) {
    if (error.status) res.status(error.status);
    else res.status(400);

    return res.json({ error: error.message || 'Bad Request' });
  }
});

router.get('/email/:email', (req, res) => {
  const { email } = req.params;
  try {
    const result = contactsController.getByEmail(email);
    const { status, data } = result;

    return res.status(status).json({ data });
  } catch (error) {
    if (error.status) res.status(error.status);
    else res.status(400);

    return res.json({ error: error.message || 'Bad Request' });
  }
});

router.post('/', (req, res) => {
  try {
    const result = contactsController.create(req.body);
    const { status, data } = result;

    return res.status(status).json({ data });
  } catch (error) {
    if (error.status) res.status(error.status);
    else res.status(400);

    return res.json({ error: error.message || 'Bad Request' });
  }
});

router.put('/email/:email', (req, res) => {
  const { email } = req.params;

  try {
    const result = contactsController.updateByEmail(email, req.body);
    const { status, data } = result;

    return res.status(status).json({ data });
  } catch (error) {
    if (error.status) res.status(error.status);
    else res.status(400);

    return res.json({ error: error.message || 'Bad Request' });
  }
});

router.put('/phone/:phone', (req, res) => {
  const { phone } = req.params;

  try {
    const result = contactsController.updateByPhone(phone, req.body);
    const { status, data } = result;

    return res.status(status).json({ data });
  } catch (error) {
    if (error.status) res.status(error.status);
    else res.status(400);

    return res.json({ error: error.message || 'Bad Request' });
  }
});

module.exports = router;
