const router = require("express").Router();
const indexController = require("../middleware/indexController");
const passport = require('../auth/passport.js')

router.get("/",(req,res) => {res.render("index.ejs")})

router.get("/sign-up", indexController.signUpFormGet);
router.post("/sign-up", indexController.signUpFormPost)

router.get("/log-in", indexController.logInFormGet)
router.post("/log-in", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/log-in"
}),)


module.exports = router;