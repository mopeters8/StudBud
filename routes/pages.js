const pool = require('./../core/pool.js');
const { application } = require('express');
const express = require('express');
const Pool = require('mysql/lib/Pool');
const User = require('../core/user');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();


// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/discover');
        return;
    }
    // IF not we just send the index page.
    res.render('newindex.ejs', {title:"My application"});
})
// Get home page
router.get('/discover', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        //res.render('discover.ejs', {opp:req.session.opp, name:user.email}); what I had before
        res.render('discover.ejs', {opp:req.session.opp, name:user.email});
        return;
    }
    res.redirect('/');
});

//Rendering the chat page
router.get('/chat', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.render('chat.ejs')
        return;
    }
    res.redirect('/');
});

//Rendering settings page.
router.get('/settings', function (req, res) {
    let user = req.session.user;

    if(user) {
        // var field = req.session.user.username
        // pool.query(`SELECT * FROM users WHERE username = '${field}'`, function(err, rows, fields) {
        //     console.log(rows)
        //     if (err) throw err
        //         res.render('settings.ejs', {title: 'data', items: rows })
        // })

        res.render('settings.ejs')
        return;
    }
});

//Posting to submit settings changes.
router.post('/submit_changes', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        userId: req.session.user.id,
        username: req.session.user.username,
        fname: req.body.fname,
        lname: req.body.lname,
        uni: req.body.uni,
        major: req.body.major,
        minor: req.body.minor, 
        bio: req.body.bio,
    };

    user.settings(userInput, function(lastId) {
    });

    res.redirect('/settings')
});

// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/discover');
        } else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })

});

// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        fullname: req.body.email,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/discover');
            });

        } else {
            console.log('Error creating a new user ...');
        }
    });

});


// Get loggout page
router.get('/logout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;