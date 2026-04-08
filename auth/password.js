const bcrypt = require("bcrypt");

const saltRounds = 10;

async function hashedPassword(password) {
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    return hashedPassword
}

async function comparePasswords(hashedPassword,password){
    const match = await bcrypt.compare(password, hashedPassword);
     return done(null, false, { message: "Incorrect password" })
}

module.exports = {
    hashedPassword,
    comparePasswords
}