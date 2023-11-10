const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const { verifyToken,verifyAndAuthorization } = require("../middleware/verifyToken");


// CREATE BOOKMARKS
router.post("/", verifyAndAuthorization,bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id", verifyAndAuthorization,bookmarkController.deleteBookmark);


// GET BOOKMARKS
router.get("/",verifyAndAuthorization, bookmarkController.getBookmarks);



module.exports = router