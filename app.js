const express = require('express');
const app = express();

app.use(express.static('public'));

// HOMEPAGE
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/home.html');
});

// PROFILE
app.get('/profile', (req, res) =>{
    res.sendFile(__dirname + '/views/profile.html');
});

// DATA
app.post('/user-info', function (req, res) {
    res.sendFile(__dirname + '/test/json/test-user.json');
});

// templates
app.post('/main-header', function (req, res) {
    res.sendFile(__dirname + '/views/templates/header.html');
});

// 404
app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

// START SERVER
app.listen(3000, ()=> console.log('server up on port 3000'));
