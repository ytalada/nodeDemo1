const express = require('express');
var bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(bodyParser.json());

const readFileModule = require('./files/readFile');
const deleteFileModule = require('./files/deleteFile');
const writeFileModule = require('./files/writeFile');

app.listen(port, (request, response) => {
    console.log(`Server listening on port ${port} !!`)
});

app.get('/readFileAsync', (request, response) => {
    readFileModule.readFileAsync(request, response);
});

app.get('/readFileSync', (request, response) => {
    readFileModule.readFileSync(request, response);
});

app.get('/deleteFileAsync', (request, response) => {
    deleteFileModule.deleteFileAsync(request, response);
});

app.get('/deleteFileSync', (request, response) => {
    deleteFileModule.deleteFileSync(request, response);
});

app.post('/writeFileAsync', (request, response) => {
    writeFileModule.writeFileAsync(request, response);
});

app.post('/writeFileSync', (request, response) => {
    writeFileModule.writeFileAsync(request, response);
});