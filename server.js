var express = require('express');
var path = require('path');
const pageRouter = require('./routes/pages')
var app = express();
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


//routers
app.use('/', pageRouter)

//Login page.
app.get('/login', function (req, res) {
    res.render('login.ejs')
});

app.post('/login', (req, res) => {

});

//register page.
app.get('/register', function (req, res) {
    res.render('register.ejs')
});

app.post('/register', (req, res) => {
    
});

//Starting on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;

