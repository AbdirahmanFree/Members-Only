const router = require("express").Router();
const indexController = require("../middleware/indexController");
const passport = require('../auth/passport.js')

router.get("/", indexController.homePageGet)

router.get("/sign-up", indexController.signUpFormGet);
router.post("/sign-up", indexController.signUpFormPost);

router.post("/log-out", indexController.logOutFormPost)

router.get("/log-in", indexController.logInFormGet)
router.post("/log-in", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/log-in"
}))

router.post("/join-group", indexController.joinGroupPost)


module.exports = router;