const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/templates/home.html');
});

app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/public/templates/404.html');
  });

app.listen(3000, ()=> console.log('server up on port 3000'));