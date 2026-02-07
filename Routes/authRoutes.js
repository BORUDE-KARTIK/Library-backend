const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);

module.exports = router;
