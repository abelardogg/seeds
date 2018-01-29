const express = require('express');
const app = express();

app.use(express.static('public'));

// HOMEPAGE
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/home.html');
});

app.post('/', function (req, res) {
    res.send({userName:'Abelardo'})
});


// 404
app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/views/404.html');
  });

app.listen(3000, ()=> console.log('server up on port 3000'));