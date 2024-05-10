// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db'); // Import the database connection

async function login(email, password) {
    try {
        // Query to find user by email
        const query = 'SELECT * FROM users WHERE email = ?';
        const results = await new Promise((resolve, reject) => {
            connection.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });

        // If no user found
        if (results.length === 0) {
            throw new Error('User not found');
        }

        const user = results[0];
         console.log("user: " , user)
        // Compare hashed password
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (!passwordMatch) {
        //     throw new Error('Invalid password');
        // }

        // Generate JWT token
        console.log("user.password", user.password);
        console.log("password", password);
        if(user.password===password){

            console.log("login sucessfully")
        const token = jwt.sign({ userId: user.id },"2ac73ba989af4e86e95c1d17de2fbd52eb1b6df7562af08a22649794582062e1", { expiresIn: '1h' });
          const data= {
            userId:user.id,
            token:token

          }
        return data;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { login };
