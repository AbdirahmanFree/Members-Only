const pool = require('./pool.js');

 async function addUser(user){
    await pool.query(`INSERT INTO users(firstname, lastname, username, password)
               VALUES ($1,$2,$3,$4);`, [user.firstname,user.lastname,user.username,user.passwordHash]);
    const newUser = await getUserByUsername(user.username)
    return newUser;
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

async function authorizeUser(id){
    await pool.query(`UPDATE users
                SET is_authorized = TRUE
                WHERE user_id = $1`, [id])
    const user = await getUserByID(id)
    return user

}

async function getAllMessages(){
    const { rows } = await pool.query(`SELECT * FROM messages`);
    return rows
}

async function postMessage(message){
    await pool.query(`
        INSERT into messages(user_id,msg)
        VALUES($1,$2)`, [message.user_id,message.message])
}

async function getMessagesAndUsers(){
    const { rows } = await pool.query(`
        SELECT msg, users.username, users.user_id FROM messages
        JOIN users
        ON users.user_id = messages.user_id`)
    return rows
}

module.exports ={
    addUser,
    getUsers,
    getUserByUsername,
    getUserByID,
    authorizeUser,
    getAllMessages,
    postMessage,
    getMessagesAndUsers
}