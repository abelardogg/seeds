const express = require('express');
const app = express();

// EJS engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

// HOMEPAGE
app.get('/', (req, res) =>{
    res.render('pages/home');
});

// PROFILE
app.get('/profile', (req, res) =>{
    res.render('pages/profile');
});

app.get('/yards', (req, res) =>{
    res.render('pages/yards');
});

//
// // DATA Test
// app.post('/user-info', function (req, res) {
//     res.sendFile(__dirname + '/test/json/test-user.json');
// });
//
// // templates
// app.post('/main-header', function (req, res) {
//     res.sendFile(__dirname + '/views/templates/header.html');
// });

// 404
app.use(function (req, res, next) {
    res.status(404).render('pages/404');
});

// START SERVER
app.listen(3000, ()=> console.log('server up on port 3000'));
