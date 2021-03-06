//'use strict'; module are strict by default ;)
const https = require('https');
const http = require('http');
const fs = require('fs');

const httpsPort = 8000;

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
    key: sslkey,
    cert: sslcert
};

const httpsRedirect = (req, res) => {
    res.writeHead(301, { 'Location': `https://localhost:${httpsPort}` + req.url });
    res.end();
};

module.exports = (app, httpPort) => {
    https.createServer(options, app).listen(httpsPort);
    http.createServer(httpsRedirect).listen(httpPort);
};
