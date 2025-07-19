const express = require('express');
const { store_database_connection } = require('../controller/user_dashboard');
const router = express.Router();

router.post('/store/database/connection' , store_database_connection);

module.exports = router;