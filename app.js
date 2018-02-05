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

    } else if(req.path === '/loginrequest' || req.path === '/signup'){
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

app.post('/signup', upload.array(), (req, res) =>{
    let rqJson = req.body;
    console.log(rqJson);
    res.json(rqJson);
});
// HOMEPAGE
app.get('/', (req, res) =>{

    let userTkn = req.cookies.izloggedzat;
    let user = {},
        userName = '',
        yards = [];

    connection.query('SELECT users.SU_name, users.SU_last_name, yards.SY_name, yards.SY_type \n' +
        'FROM seeds_users AS users \n' +
        'INNER JOIN seeds_yards AS yards \n' +
        'ON users.SA_token = yards.SA_token\n' +
        'WHERE users.SA_token=\'MFNBVGFiZUBtYWlsLmNvbQ==\';', function (error, results, fields) {
        if (error) {
            throw error;
        }

        let rows = results.length;

        user.name = results[0].SU_name;
        user.lastName = results[0].SU_last_name;

        userName = user.name +' '+ user.lastName;

        console.log('rows: ',rows);
        for(let x = 0 ; x < rows ;  x++ ){
            console.log('iteration: ',x);
            console.log(results[x]);

            yards.push({
                name : results[x].SY_name,
                type : results[x].SY_type,
                ubication : '',
                areaQuantity : '',
                areaUnity : '',
                description : ''
            });
        }

        res.render('pages/home',{
            user : userName,
            yards : yards
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
