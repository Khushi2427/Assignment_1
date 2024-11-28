// require("dotenv").config();
// const express = require("express");
// const schoolRoutes = require("./routes/schoolRoutes");
// const db = require("./config/db");

// const app = express();
// app.set("view engine",'ejs')

// app.use(express.json()); 


// db.query("SELECT 1 + 1 AS result", (err, results) => {
//   if (err) {
//     console.error("Database connection test failed:", err.message);
//   } else {
//     console.log("Database connection test successful:", results[0].result); // Should log: 2
//   }
// });




// app.get('/',(req,res)=>{
//   res.render('index')
// })

// app.use("/api", schoolRoutes);
// const PORT = process.env.PORT || 5006;
// app.listen(PORT, '0.0.0.0',() => {
//   console.log(`Server running on http://0.0.0.0:${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const schoolRoutes = require("./routes/schoolRoutes");
const db = require("./config/db");  // Import the PostgreSQL client from db.js

const app = express();
app.set("view engine", 'ejs');

app.use(express.json());

// Perform a simple query to test the database connection
db.query("SELECT 1 + 1 AS result", (err, results) => {
  if (err) {
    console.error("Database connection test failed:", err.message);
  } else {
    console.log("Database connection test successful:", results.rows[0].result); // Should log: 2
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 5006;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
