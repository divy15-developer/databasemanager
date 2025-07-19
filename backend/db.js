const pg = require('pg');

const pool = new pg.Pool({
    hostname : '192.168.0.58',
    user: 'postgres',
    password : 'shree',
    database : 'Database_manager',
    port : 5432,
    idleTimeoutMillis : 3000,
    max: 100,
    connectionTimeoutMillis : 3000
});

module.exports = {
    query : async (query , value) => {
        const db = await pool.connect();
          try {
            return await db.query(query , value);
          } catch (error) {
             throw error;
          }finally{
            db.release();
          }
    }
};