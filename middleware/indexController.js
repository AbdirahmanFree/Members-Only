const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const { hashedPassword } = require('../auth/password.js')
const queries = require('../db/queries.js')
const passport = require('../auth/passport.js')


const validateCredentials = [
    body('firstname').trim().matches(/^[a-zA-Z]+$/),
    body('lastname').trim().matches(/^[a-zA-Z]*$/),
    body('username').trim(),
    body('password').trim(),
]



exports.homePageGet = (req,res) => {res.render("index.ejs", {user: req.user})}


exports.signUpFormGet = (req,res) => {
    res.render("sign-up-form")
}

exports.logInFormGet = (req,res) => {
    res.render("log-in-form")
}

exports.signUpFormPost = [
    validateCredentials,
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.errors)
            return res.render('sign-up-form')
        }
        else {
            try{
                const {firstname, lastname, username, password} = matchedData(req)
                const passwordHash = await hashedPassword(password)
                const user = {firstname,lastname, username, passwordHash}
                const savedUser = await queries.addUser(user)
                req.login(savedUser, (err) => {
                    if(err) return next(err);
                    res.redirect("/")
                })
            }catch(error){
                console.log(error)
            }
        }


    }
]

exports.logOutFormPost =  (req,res) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.session.destroy((error) => {
            if(error){return next(error)};

            res.clearCookie("connect.sid");
            res.redirect("/");
        })
    })
}

exports.joinGroupPost = (req,res) => {
    try{
        const password = req.body.password
        const user = req.user
        if( process.env.GROUP_KEY === password){
            console.log('correct')
            queries.authorizeUser(user.user_id).then(newUser => {
                console.log(newUser)
            })
        }
    }catch(error){
        console.log(error)
    }
}