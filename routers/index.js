const router = require('express').Router();

const contactRoutes = require('./contacts');

router.use('/contacts', contactRoutes);

module.exports = router;
