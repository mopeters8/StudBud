var express = require('express');
var path = require('path');
const pageRouter = require('./routes/pages')
var app = express();
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


//routers
app.use('/', pageRouter)


//errors: page not found
app.use((req, res, next) => {
    var err = new Error('Page not found! Sorry friend :(');
    err.status = 404;
    next(err);
})

//handling errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});


//Starting on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;

