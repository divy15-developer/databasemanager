const express = require('express');
const user_dashboard_ctrl = require('../controller/user_dashboard');
const router = express.Router();

router.post('/store/database/connection' , user_dashboard_ctrl.store_database_connection);

router.get('/serach/show/db/list/:db_name' , user_dashboard_ctrl.search_show_database_list);

router.post('/get/all/db/info', user_dashboard_ctrl.get_all_db_info);

module.exports = router;