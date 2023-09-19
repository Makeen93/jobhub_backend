const jobController = require("../controllers/jobController");
const { verifyAndAuthorization,verifyToken,verifyAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();


// REGISTRATION 
router.post("/", verifyAndAdmin,jobController.createJob);

router.put("/:id", verifyAndAdmin,jobController.updateJob);
router.delete("/:id", verifyAndAdmin,jobController.deleteJob);
router.get("/:id",jobController.getJob);
router.get("/",jobController.getAllJobs);
router.get("/Search/:key",jobController.searchJobs);




module.exports = router