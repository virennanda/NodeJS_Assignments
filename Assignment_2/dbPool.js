const Pool = require("pg").Pool;
const { Connection: cn } = require("./config");

const pool = new Pool({
    user: cn.USER,
    host: cn.HOST,
    database: cn.DATABASE,
    password: cn.PASSWORD,
    port: cn.PORT,
});

module.exports = {
    DB: pool
}