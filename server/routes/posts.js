const express = require("express");
const router = express.Router();
const cors = require("cors");
const postsController = require("../controllers/postsController");
const authenticateToken = require("../middlewares/authenticateToken");
const upload = require('../middlewares/uploadMiddleware')
router.use(express.json());
router.use(cors());

router.get("/mainpreview", postsController.getPreview);
router.get("/mypost", authenticateToken, postsController.getMypost);
router.get("/posts/:id", postsController.getSinglePost);
router.post("/post", authenticateToken, upload.array('photos'), postsController.postNewStory);
router.put("/writeabout", authenticateToken, postsController.postWriteAbout);
router.post("/writecomments",authenticateToken, postsController.postComment);
router.get("/comments/:id", authenticateToken, postsController.getComments)

module.exports = router;
