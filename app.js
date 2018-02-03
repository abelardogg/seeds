const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

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
// ACCESS TO PUBLIC DATA
app.use(express.static('public'));
// ACCESS TO BROWSER COOKIES
app.use(cookieParser());

// session validation
app.all('*', (req, res, next) => {
    let isLogged = req.cookies.isLogged;
    /**
     * TODO sessions
     * Create session cookie
     * check if the isLogged cookies equals to TRUE
     * check if the session cookie exists
     *
     * Use the cookie isLogged for testing.
     *
     */

    if ( isLogged === 'true' || req.path === '/login') {
        next();
    } else {
        res.redirect('/login');
    }
});

// LOGIN
app.get('/login', (req, res)=>{
    res.render('pages/login');
});

// HOMEPAGE
app.get('/', (req, res) =>{
    let user = {};
    let userName = '';

    connection.query('SELECT * from seeds_users_info', function (error, results, fields) {
        if (error) throw error;
        user = results[1];
        userName = user.user_first_name;

        res.render('pages/home',{
            user : userName,
            yards : testUserYard
        });
    });
});

// PROFILE
app.get('/profile', (req, res) =>{
    res.render('pages/profile');
});

app.get('/yards', (req, res) =>{
    res.render('pages/yards');
});


// 404
app.use(function (req, res, next) {
    res.status(404).render('pages/404');
});
// START SERVER
app.listen(3000, ()=> console.log('server up on port 3000'));
