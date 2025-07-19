const pgClient = require('../db');
const resHandler = require('../resHandler');
const errorHandler = require('../errorHandler');

async function store_database_connection(req, res, next){
    try {
        console.log(req.body)
        const {ip , user , database , password , developer_id} = req.body;
        await pgClient.query('SELECT * FROM user_dashboard_store_db_connection($1, $2, $3, $4, $5)', 
            [ip , database , user , password , BigInt(developer_id)]);

        return resHandler(res , 0);
    } catch (error) {
        console.log(error);
        return errorHandler(res, 2 , 'errorMessage' , error.message);
    }
};

module.exports = {
    store_database_connection : store_database_connection
};