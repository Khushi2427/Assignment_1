const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error connecting to the database", err));

module.exports = client;
