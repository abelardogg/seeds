const express = require('express');
const app = express();
const mysql = require('mysql');
// test
const testUser = require('./test/json/test-user.json');
const testUserYard = require('./test/json/test-user-yards.json');
const greeting = require('./private/test');

// mysql
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "seedstest"
});

// EJS engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

// HOMEPAGE
app.get('/', (req, res) =>{
    let user = {};
    let userName = '';

    connection.connect();

    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) throw error;
        user = results[1];
        userName = user.first_name;
        console.log(user);
        console.log('OUTPUT: ',userName , typeof userName);

        res.render('pages/home',{
            user : userName,
            yards : testUserYard
        });
    });
    connection.end();

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
