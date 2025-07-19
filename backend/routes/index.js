const express = require('express');
const router = express.Router();
const user_dashboard = require('./user_dashboard');

router.use('/user/dashboard' , user_dashboard);

module.exports = router;