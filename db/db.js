const pool = require("./pool.js");

// Create users table
pool.query(`CREATE TABLE IF NOT EXISTS users(
            user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            is_authorized BOOLEAN DEFAULT FALSE);`).then(res => {
                console.log('Users table: Success ✅');
            }).catch((err) =>{
                console.log(err);
            }).then(res => {
                pool.query(`CREATE TABLE IF NOT EXISTS messages(
                            msg_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                            user_id INT REFERENCES users(user_id),
                            msg TEXT NOT NULL);`).then(res => {
                                console.log('Messages table: Success ✅');
                            }).catch((err) => {
                                console.log(err);
                            });
            });

// Create messages table






