const express = require('express');
const router = express.Router();

//get index page
router.get('/', (req, res, next) => {
    res.render('index.ejs', {title:"Our Project"});
})

//get home page
router.get('/home', (req, res, next) => {
    res.send('This is the home page');
});

//post login data
router.post('/login', (req, res, next) => {
    res.json(req.body);
});

//post register data
router.post('/register', (req, res, next) => {
    res.json(req.body);
});

module.exports = router;