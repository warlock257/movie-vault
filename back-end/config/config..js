require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": process.env.dbPass,
    "database": "movie_vault",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.herUser,
    "password": process.env.herPass,
    "database": process.env.herDb,
    "host": process.env.herHost,
    "dialect": "postgres"
  }
}
