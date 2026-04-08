const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const { hashPassword } = require('../auth/password.js')
const queries = require('../db/queries.js')

const validateSignUp = [
    body('firstname').trim().matches(/^[a-zA-Z]+$/),
    body('lastname').trim().matches(/^[a-zA-Z]*$/),
    body('username').trim(),
    body('password').trim(),
]





exports.signUpFormGet = (req,res) => {
    res.render("sign-up-form")
}

exports.signUpFormPost = [
    validateSignUp,
    (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.errors)
            res.render('sign-up-form')
        }
        else {
            try{
                const {firstname, lastname, username, password} = matchedData(req)
                const hashedPassword = hashPassword(password)
                queries.addUser({firstname, lastname, username, hashedPassword}).then(response => {
                    console.log('Add user: Success ✅')
                })
            }catch(error){
                console.log(error)
            }
        }


    }
]
