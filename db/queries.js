const pool = require('./pool.js')

 async function addUser(user){
    pool.query(`INSERT INTO users(firstname, lastname, username, password)
                VALUES ($1,$2,$3,$4);`, [user.firstname,user.lastname,user.username,user.password])
}

module.exports ={
    addUser
}