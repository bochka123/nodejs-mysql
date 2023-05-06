const mysql = require('mysql2');
const http = require('http');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat'
})

const server = http.createServer((req, res) => {
    if(req.url === '/messages') {
        connection.query(
            'SELECT * FROM messages',
            function (err, result, fields) {
                let html = '<html lang="en"><body><ul>';
                result.forEach((element) => {
                    html += `<li>${element.text}</li>`
                });
                html += '</ul><form action="/add" method="POST"><input type="text" name="content"></form></body></html>';
                res.writeHead(200, {'Content-type': 'text/html'});
                res.end(html);
            }
        );
    }else if (req.url === '/add' && req.method === 'POST') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            let sp = new URLSearchParams(data);
            let content = sp.get('content');
            connection.query(
                `INSERT INTO messages(text, userId, dialogId) VALUES("${content}", 1, 2);`,
                function (err, result, fields) {
                    res.writeHead(302, {'Location': '/messages'});
                    res.end();
                }
            );
        })
    }
})

server.listen(3000);