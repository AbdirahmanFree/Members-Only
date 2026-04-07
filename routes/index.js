const router = require("express").Router();
const indexController = require("../middleware/indexController");

router.get("/", indexController.signUpFormGet);

module.exports = router;