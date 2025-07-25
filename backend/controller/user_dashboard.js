const pgClient = require("../db");
const resHandler = require("../resHandler");
const errorHandler = require("../errorHandler");
const pg = require("pg");

async function store_database_connection(req, res, next) {
    try {
        const { ip, user, database, password, developer_id, port } = req.body;
        const db_collection = await pgClient.query(
            "SELECT * FROM user_dashboard_store_db_connection($1, $2, $3, $4, $5, $6)",
            [ip, database, user, password, BigInt(developer_id), port]
        );

        const db_id = db_collection.rows[0].user_dashboard_store_db_connection;

        const custome_db_connection = new pg.Pool({
            user: user,
            hostname: ip,
            database: database,
            password: password,
            port: parseInt(port),
            idleTimeoutMillis: 3000,
            max: 100,
            connectionTimeoutMillis: 3000,
        });

        const custome_db_client = await custome_db_connection.connect();

        const tableRecRes = await custome_db_client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`);


        const tables = tableRecRes.rows;

        for (const table of tables) {
            const tableName = table.table_name;

            const tableInsert = await pgClient.query(
                "SELECT * FROM user_dashboard_store_table($1,$2)",
                [db_id, tableName]
            );

            const table_id = tableInsert.rows[0].table_id;

            const columnRecRes = await custome_db_client.query(
                `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = $1 AND table_schema = 'public';
    `,
                [tableName]
            );


            await pgClient.query(
                "SELECT * FROM user_dashboard_store_table_column($1 , $2)",
                [table_id, JSON.stringify(columnRecRes.rows)]
            );
        }

        const functionRecRes = await custome_db_client.query(`
        SELECT
          p.proname AS function_name,
          pg_get_functiondef(p.oid) AS function_definition
        FROM
          pg_proc p
        JOIN
          pg_namespace n ON n.oid = p.pronamespace
        WHERE
          n.nspname = 'public'  -- or your target schema
          AND p.prokind = 'f'   -- 'f' = function
        ORDER BY
          function_name;
        `);

        await pgClient.query('SELECT * FROM user_dasboard_store_function($1 , $2)' , [db_id , JSON.stringify(functionRecRes.rows)]);

        const triggerRecRes = await custome_db_client.query(`
            SELECT
              tg.tgname AS trigger_name,
              cls.relname AS table_name,
              p.proname AS function_name,
              pg_get_triggerdef(tg.oid) AS trigger_definition
            FROM
              pg_trigger tg
            JOIN
              pg_class cls ON tg.tgrelid = cls.oid
            JOIN
              pg_proc p ON tg.tgfoid = p.oid
            WHERE
              NOT tg.tgisinternal;
            `);

            if(triggerRecRes.rows.length > 0){
            await pgClient.query('SELECT * FROM user_dasboard_store_trigger($1 , $2)' , [db_id , JSON.stringify(triggerRecRes.rows)]);
            };

        const typeRecRes = await custome_db_client.query(`           
        SELECT
          n.nspname AS schema_name,
          t.typname AS type_name,
          CASE t.typtype
            WHEN 'e' THEN (
              'CREATE TYPE ' || n.nspname || '.' || t.typname || ' AS ENUM (' ||
              string_agg(quote_literal(e.enumlabel), ', ') || ');'
            )
            WHEN 'c' THEN (
              'CREATE TYPE ' || n.nspname || '.' || t.typname || ' AS (' ||
              string_agg(a.attname || ' ' || pg_catalog.format_type(a.atttypid, a.atttypmod), ', ') || ');'
            )
            WHEN 'd' THEN (
              'CREATE DOMAIN ' || n.nspname || '.' || t.typname ||
              ' AS ' || pg_catalog.format_type(t.typbasetype, NULL) ||
              COALESCE(' ' || pg_get_constraintdef(con.oid), '')
            )
            ELSE NULL
          END AS create_type_syntax
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        LEFT JOIN pg_enum e ON t.oid = e.enumtypid
        LEFT JOIN pg_class cls ON cls.oid = t.typrelid
        LEFT JOIN pg_attribute a ON a.attrelid = t.typrelid AND a.attnum > 0 AND NOT a.attisdropped
        LEFT JOIN pg_constraint con ON con.contypid = t.oid AND con.contype = 'c'  -- for domain constraints
        WHERE
          t.typtype IN ('c', 'e', 'd')  -- composite, enum, domain
          AND n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
          AND (
            t.typtype != 'c' OR NOT EXISTS (
              SELECT 1 FROM pg_class c2 WHERE c2.reltype = t.oid AND c2.relkind = 'r'
            )  -- skip implicit table types
          )
        GROUP BY n.nspname, t.typname, t.typtype, t.typbasetype, con.oid
        ORDER BY schema_name, type_name;
        `);

        if(typeRecRes.rows.length > 0){
        await pgClient.query('SELECT * FROM user_dasboard_store_type($1,$2)' , [db_id,JSON.stringify(typeRecRes.rows)]);
        };

        const indexingRecRes = await custome_db_client.query(`
                SELECT
                    t.schemaname,
                    t.tablename,
                    i.indexname,
                    i.indexdef
                FROM
                    pg_indexes i
                JOIN
                    pg_tables t ON t.tablename = i.tablename
                WHERE
                    t.schemaname NOT IN ('pg_catalog', 'information_schema')
                ORDER BY
                    t.schemaname, t.tablename, i.indexname;
            `);

        if(typeRecRes.rows.length > 0){
        await pgClient.query('SELECT * FROM user_dasboard_store_indexing($1,$2)', [db_id, JSON.stringify(indexingRecRes.rows)]);
        };

        custome_db_client.release();

        return resHandler(res, 0);
    } catch (error) {
        console.log(error);
        return errorHandler(res, 2, "errorMessage", error.message);
    }
}

async function get_database_sources_list(req,res,next){};

async function search_show_database_list(req,res,next){
    const {db_name} = req.params;
    console.log(db_name);
    try {
        const dbListRes = await pgClient.query('SELECT * FROM user_dashboard_serach_show_database_connection_list($1)', [db_name]);

        resHandler(res , 1 , 'data' , dbListRes.rows);
    } catch (error) {
        errorHandler(res , 1 , 'error' , error.message)
    }
};

async function get_all_db_info(req, res, next){
  try {
    const {db_id} = req.body;
    const result = await pgClient.query('select * from user_dashboard_get_all_db_info($1)', [db_id]);

    resHandler(res , 1 , 'data', result.rows);
  } catch (error) {
    console.log("😈 Erro from get_db_info :", error);
    errorHandler(res , 1, 'error', error.message);
  }
}

module.exports = {
    store_database_connection: store_database_connection,
    search_show_database_list:search_show_database_list,
    get_all_db_info: get_all_db_info
};
