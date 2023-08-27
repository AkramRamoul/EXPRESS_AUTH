const express = require("express");
const router = express.Router();
const lougoutController = require("../../controllers/logoutController");

router.get("/", lougoutController.handleLogout);

module.exports = router;
