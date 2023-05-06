const mysql = require('mysql2');
const http = require('http');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat'
})

const server = http.createServer((req, res) => {
    connection.query(
        'SELECT * FROM user',
        function (err, result, fields) {
            res.write(`${result[0].id} \n`);
            res.end();
        }
    );
})

server.listen(3000);