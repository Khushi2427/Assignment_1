// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });


// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err.message);
//     process.exit(1); 
//   } else {
//     console.log("Connected to MySQL server!");

//     db.query(
//       `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
//       (err, result) => {
//         if (err) {
//           console.error("Error creating database:", err.message);
//           process.exit(1);
//         } else {
//           console.log(`Database '${process.env.DB_NAME}' is ready!`);
//         }
//       }
//     );
//   }
// });


// db.changeUser({ database: process.env.DB_NAME }, (err) => {
//   if (err) {
//     console.error("Error switching to database:", err.message);
//     process.exit(1);
//   }
// });

// module.exports = db;
const { Client } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a new PostgreSQL client using the connection string
const client = new Client({
  connectionString: process.env.DB_URL,  // Use the environment variable
  ssl: {
    rejectUnauthorized: false  // Necessary for cloud Postgres databases
  }
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Error connecting to the database', err));

// Export the client for use in other parts of the app (like querying)
module.exports = client;
