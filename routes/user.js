const userController = require("../controllers/userController");
const { verifyAndAuthorization,verifyToken,verifyAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();


// REGISTRATION 

router.put("/", verifyAndAuthorization,userController.updateUser);
router.delete("/", verifyAndAuthorization,userController.deleteUser);
router.get("/:id", verifyAndAuthorization,userController.getUser);
router.get("/", verifyAndAdmin,userController.getAllUsers);




module.exports = router