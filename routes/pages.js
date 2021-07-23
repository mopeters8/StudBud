const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user = new User();

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
    user.login(req.body.username, req.body.password, function(result) {
        if (result) {
            res.send('Logged in as : '+ result.username);
        } else {
            res.send('Username/Password incorrect!');
        }
    })
});

//post register data
router.post('/register', (req, res, next) => {
    let userInput = {
        username: req.body.email,
        fullname: req.body.name,
        password: req.body.password
    };

    user.create(userInput, function(lastId) {
        if (lastId) {
            res.send('Welcome '+ userInput.username);
        } else {
            console.log('Error creating a new user...');
        }
    });
});

module.exports = router;