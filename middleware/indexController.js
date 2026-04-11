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

const validateMessage = [
  body('message')
    .trim()
    .notEmpty().withMessage('Message cannot be empty')
    .isLength({ max: 500 }).withMessage('Message too long')
];



exports.homePageGet = (req,res) => {
    queries.getMessagesAndUsers().then(messages => {
        console.log(messages)
        res.render("index.ejs", {user: req.user, messages: messages})
    })
}


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
                res.redirect("/")
            })
        }
    }catch(error){
        console.log(error)
    }
}

exports.createMessagePost = [
    validateMessage,
    (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.errors)
            return res.redirect('/')
        }
        else {
            try{
                const {message} = matchedData(req)
                const user_id = req.user.user_id;
                queries.postMessage({user_id,message}).then((response)=> {
                    console.log('message posted')
                    return res.redirect("/")
                    
                })
            }catch(error){
                console.log(error)
            }

        }
    }
]