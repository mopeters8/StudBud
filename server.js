var express = require('express');
var app = express();

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.render('index.ejs')
});

app.get('/login', function (req, res) {
    res.render('login.ejs')
});

app.post('/login', (req, res) => {

});

app.get('/register', function (req, res) {
    res.render('register.ejs')
});

app.post('/register', (req, res) => {
    
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});