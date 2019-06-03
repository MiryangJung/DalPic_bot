var express = require('express');
var packageInfo = require('./package.json');

var app = express();

app.get('/', function (req, res) {
    res.send("Hi! DalPic_bot! Web for Heroku Not Sleep!")
});

app.listen(process.env.PORT, function () {
    console.log('Server Start!');
});