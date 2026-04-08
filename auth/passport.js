const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("../db/pool.js")
const queries = require('../db/queries.js')
const { comparePasswords } = require('./password.js')

passport.use(
    new LocalStrategy ( async (username, password, done) => {
        try {
            queries.getUserByUsername(username).then((user) => {
                if(!user){
                    console.log(username)
                    console.log(user)
                    console.log('user not found')
                    return done(null,false)
                }
                comparePasswords(user.password,password).then(match => {
                    if(match) {
                        console.log('Password check: Success ✅')
                        return done(null,user)
                    }
                    else {
                        console.log('password incorrect')
                        return done(null,false)
                    }

                }).catch(error => {
                    console.log('error comparing passwords')
                    done(error)
                })

                
            }).catch(error => {
                console.log('error getting user')
                done(error)
            })
             

        } catch(error) {
            console.log(error)
        }
    })
)

passport.serializeUser((user,done) => {
    done(null,user.user_id)
})

passport.deserializeUser(async (id,done) => {

    try {
        const user = await queries.getUserByID(id);
        console.log('FOund User,', user)
        done(null,user);

    } catch(error){
        console.log(error)
    }
   
})

module.exports = passport