const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { verifyToken,verifyAndAuthorization } = require("../middleware/verifyToken");


// Create Chat
router.post("/", verifyAndAuthorization,chatController.accessMessage);



// GET Chat
router.get("/",verifyAndAuthorization, chatController.getChat);



module.exports = router