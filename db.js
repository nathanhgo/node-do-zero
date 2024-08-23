import 'dotenv/config' //process.env

import postgres from 'postgres'

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env; //ler var ambiente
PGPASSWORD = decodeURIComponent(PGPASSWORD); //criar url conexão

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});