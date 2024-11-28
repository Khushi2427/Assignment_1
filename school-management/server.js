require("dotenv").config();
const express = require("express");
const schoolRoutes = require("./routes/schoolRoutes");
const db = require("./config/db");

const app = express();
app.set("view engine",'ejs')

app.use(express.json()); 


db.query("SELECT 1 + 1 AS result", (err, results) => {
  if (err) {
    console.error("Database connection test failed:", err.message);
  } else {
    console.log("Database connection test successful:", results[0].result); // Should log: 2
  }
});




app.get('/',(req,res)=>{
  res.render('index')
})

app.use("/api", schoolRoutes);
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
