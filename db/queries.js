const pool = require('./pool.js');

 async function addUser(user){
    await pool.query(`INSERT INTO users(firstname, lastname, username, password);
                VALUES ($1,$2,$3,$4);`, [user.firstname,user.lastname,user.username,user.password]);
};

async function getUsers() {
    const { rows } = await pool.query(`SELECT * FROM users;`);
    return rows;
};

async function getUser(username){
    const { rows } = await pool.query(`SELECT * FROM users
                                        WHERE username = $1;`,[username]);
}

module.exports ={
    addUser,
    getUsers,
    getUser
}