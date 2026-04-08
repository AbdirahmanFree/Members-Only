const bcrypt = require("bcrypt");

const saltRounds = 10;

async function hashedPassword(password) {
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    return hashedPassword
}

async function comparePasswords(hashedPassword,password){
    const match = await bcrypt.compare(password, hashedPassword);
     return match
}

module.exports = {
    hashedPassword,
    comparePasswords
}