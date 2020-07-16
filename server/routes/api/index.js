var express = require('express');
var router = express.Router();
const users = require('./users');
const questions = require('./questions');
const jwt = require('express-jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.use(jwt({
    secret: process.env.JWT_SECRET
}).unless({
    path: ['/api/users/login']
}));

router.use('/users', users);
router.use('/questions', questions);


module.exports = router;
