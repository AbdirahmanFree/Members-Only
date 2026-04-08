const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const { hashedPassword } = require('../auth/password.js')
const queries = require('../db/queries.js')

const validateCredentials = [
    body('firstname').trim().matches(/^[a-zA-Z]+$/),
    body('lastname').trim().matches(/^[a-zA-Z]*$/),
    body('username').trim(),
    body('password').trim(),
]


exports.homePageGet = (req,res) => {res.render("index.ejs")}


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
            res.render('sign-up-form')
        }
        else {
            try{
                const {firstname, lastname, username, password} = matchedData(req)
                const passwordHash = await hashedPassword(password)
                queries.addUser({firstname, lastname, username, passwordHash}).then(response => {
                    console.log('Add user: Success ✅')
                })
            }catch(error){
                console.log(error)
            }
        }


    }
]
