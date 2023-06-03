const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { all, add, edit, employee, remove } = require("../controllers/employees");

router.get("/", auth, all);

router.get("/:id", auth, employee);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;
