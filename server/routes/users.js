const express = require("express");
const router = express.Router();
const cors = require("cors");

const usersController = require("../controllers/usersController");
const authenticateToken = require("../middlewares/authenticateToken");

router.use(express.json());
router.use(cors());

router.get("/about", usersController.getAboutPage);
router.get("/login/success",authenticateToken, usersController.getLoginSuccess);
router.post("/signup", usersController.postSignup);
router.post("/login", usersController.postLogin);

module.exports = router;