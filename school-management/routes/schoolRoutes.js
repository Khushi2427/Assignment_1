const express = require("express");
const router = express.Router();
const { addSchool, listSchools ,createTable} = require("../controllers/schoolController");

router.post("/addSchool", addSchool);
router.get("/listSchools", listSchools);
router.post('/createTable',createTable)
module.exports = router;
