const { Pool } = require('pg');

const pool = new Pool(); // env variables here
module.exports = {
  query: (text, params) => pool.query(text, params),
};