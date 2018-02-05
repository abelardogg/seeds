const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

const utils = require('./private/utils');
// test
const testUser = require('./test/json/test-user.json');
const testUserYard = require('./test/json/test-user-yards.json');

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

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// session validation
app.all('*', (req, res, next) => {

    // LOGIN
    let isLogged = req.cookies.isLogged;
    let isLoggedSat = req.cookies.izloggedzat;

    if ( isLogged === 'true' ) {
        connection.query("select SU_name, SU_last_name from seeds_users where SA_token = '"+isLoggedSat+"';", function (error, results, fields) {
            if (error) {
                res.json({success:'false', message:'Server error'});
                throw error;
            }

            if(results.length===1){
                console.log('User exists, login success');
                if(req.path === '/login'){
                    res.redirect('/');
                } else {
                    next();
                }
            }
            else {
                console.log('User DON`T exists, login FAILED');
                res.render('pages/login');
            }
        });

    } else if(req.path === '/loginrequest'){
        next();
    } else{
        res.render('pages/login');
    }
});

// LOGIN
app.get('/login', (req, res)=>{
    console.log('login page');
    res.render('pages/login');
});

app.post('/loginrequest',upload.array(), (req, res) => {
    // let reqFull = req.body;
    let reqEmail = req.body.email;
    let reqPass = req.body.pass;

    connection.query("select SA_token from seeds_accounts where SA_email = '"+reqEmail+"' and SA_pass = '"+reqPass+"';", function (error, results, fields) {
        if (error) {
            res.json({success:'false', message:'Server error'});
            throw error;
        }
        // user = results[1];
        // userName = user.user_first_name;

        console.log('Results: ',results);

        console.log('Results length: ',results.length);

        if(results.length===1){
            /**
             * TODO POST the current date on success
             *
             * if the login is successful, insert the current date
             * into SEEDS_SESSION table
             *
             */
            res.json({success:'true', sat:results[0].SA_token});
        }
        else {
            res.json({success:'false', message:'Wrong email or password'});
        }

    });

});

// HOMEPAGE
app.get('/', (req, res) =>{
    let user = {};
    let userName = '';

    connection.query('SELECT * from seeds_users', function (error, results, fields) {
        if (error) throw error;
        user = results[0];
        userName = user.SU_name;

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
