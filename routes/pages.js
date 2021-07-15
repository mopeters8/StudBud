const express = require('express');
const router = express.Router();

//get index page.
router.get('/', (req, res, next) => {
    res.render('index.ejs', {title:"Our Project"});
})

module.exports = router;