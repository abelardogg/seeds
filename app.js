const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


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

    if ( isLogged === 'true' ) {
        console.log('validation TRUE');
        next();
    } else if(req.path === '/loginrequest'){
        console.log('validation TRUE 2');

        next();

    } else{
        console.log('validation FALSE');

        res.render('pages/login');
    }
});

// LOGIN
app.get('/login', (req, res)=>{
    console.log('login page');
    res.render('pages/login');
});

app.post('/loginrequest',upload.array(), (req, res) => {
    let fullReq = req.body;
    console.log(fullReq, typeof fullReq);
    res.json(fullReq);
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
