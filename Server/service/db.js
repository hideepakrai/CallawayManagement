// db.js
const mysql = require('mysql');

const dbConfig = {
    host: "srv362.hstgr.io",
    user: "u683660902_calloms",
    password: "Jaipur@302030",
    database: "u683660902_calloms",
    port:3306
};

const connection = mysql.createConnection(dbConfig);
  console.log("db details: " , dbConfig)
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = connection;
