const express = require("express");
const router = express.Router();
const cors = require("cors");
const postsController = require("../controllers/postsController");
const authenticateToken = require("../middlewares/authenticateToken");

router.use(express.json());
router.use(cors());

router.get("/mainpreview", postsController.getPreview);
router.get("/mypost", authenticateToken, postsController.getMypost);
router.get("/posts/:id", postsController.getSinglePost);
router.post("/post", authenticateToken, postsController.postNewStory);
router.put("/writeabout", authenticateToken, postsController.postWriteAbout);

module.exports = router;
