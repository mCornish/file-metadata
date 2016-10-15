const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const MONGO_URL = process.env.MONGOLAB_URI;

const CSS_PATH = __dirname + '/src/main.css';
const HTML_PATH = __dirname + '/src/index.html';

app.set('port', process.env.PORT || 5000);

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(path.join(HTML_PATH));
});

app.get('/favicon.ico', (req, res) => res.sendStatus(200)); // Ignore favicon request

const fileUpload = upload.single('file');
app.post('/upload', (req, res) => {
    fileUpload(req, res, err => {
        if (err) {
            console.log('ERROR: ', err);
            res.send({"error": "Error uploading file"});
        }
        const result = {
            size: req.file.size
        }
        res.send(result);
    })
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
