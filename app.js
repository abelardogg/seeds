const express = require('express');
const app = express();

// EJS engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

// HOMEPAGE
app.get('/', (req, res) =>{

    let yards = [
        {
            "yardId":"0001",
            "name":"Nogalera",
            "type":"nogal",
            "ubication":"Chihuahua",
            "quantity":200,
            "areaQuantity":1,
            "areaUnity":"km",
            "description":"distintas variedades"
        },
        {
            "yardId":"0002",
            "name":"Yum yum",
            "type":"naranjo",
            "ubication":"Puebla",
            "quantity":50,
            "areaQuantity":500,
            "areaUnity":"m",
            "description":"tamaño medio"
        },
        {
            "yardId":"0003",
            "name":"Good crops",
            "type":"maiz",
            "ubication":"Sinaloa",
            "quantity":10000,
            "areaQuantity":5,
            "areaUnity":"km",
            "description":"venta a fabrica"
        },
        {
            "yardId":"0004",
            "name":"Maizal",
            "type":"maiz",
            "ubication":"Chihuahua",
            "quantity":500,
            "areaQuantity":2,
            "areaUnity":"km",
            "description":"consumo personal"
        }
    ];

    res.render('pages/home',{
        name:'abelardo',
        yards : yards
    });
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
