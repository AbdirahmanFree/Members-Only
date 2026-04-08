const router = require("express").Router();
const indexController = require("../middleware/indexController");

router.get("/", indexController.signUpFormGet);
router.post("/sign-up", indexController.signUpFormPost)

module.exports = router;