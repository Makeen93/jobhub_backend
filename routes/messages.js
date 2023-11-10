const router = require("express").Router();
const messageController = require("../controllers/messageController");

const { verifyToken,verifyAndAuthorization } = require("../middleware/verifyToken");


// Send Messages
router.post("/", verifyAndAuthorization,messageController.sendMessage);


// DELETE Messages

// router.delete("/:id", verifyAndAuthorization,bookmarkController.deleteBookmark);


// GET All Messages
router.get("/:id",verifyAndAuthorization, messageController.getAllMessages); 



module.exports = router