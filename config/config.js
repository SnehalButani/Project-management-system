require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  PrivateKey: process.env.PrivateKey,
  saltRounds:12,
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_dialect
  }
}
