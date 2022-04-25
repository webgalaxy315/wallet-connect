var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(80, function () {
    console.log("port 3000");
});