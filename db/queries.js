const pool = require('./pool.js');

 async function addUser(user){
    await pool.query(`INSERT INTO users(firstname, lastname, username, password)
               VALUES ($1,$2,$3,$4);`, [user.firstname,user.lastname,user.username,user.passwordHash]);
};

async function getUsers() {
    const { rows } = await pool.query(`SELECT * FROM users;`);
    return rows;
};

async function getUserByUsername(username){
    const { rows } = await pool.query(`SELECT * FROM users
                                        WHERE username = $1;`,[username]);
    return rows[0]
}

async function getUserByID(id) {
    const { rows } = await pool.query(`SELECT * FROM users
                                        WHERE user_id = $1;`,[id]);
    return rows[0]
}

module.exports ={
    addUser,
    getUsers,
    getUserByUsername,
    getUserByID
}