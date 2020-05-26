/** @format */

var express = require('express');
var router = express.Router();

const { Base64 } = require('js-base64');
const {jwt} = require('jsonwebtoken');

const USER = {
    username: 'z20240z@gmail.com',
    password: 'z7895123z',
};

const Response = require('../../response');

/* GET users listing. */
router.get('/', function (req, res) {
    res.json(Response.success({Data: 'respond with a resource'}));
});

router.post('/login', function (req, res) {

    if (!req.headers.authorization) return res.json(Response.failed('Invalid User.'));

    const token = req.headers.authorization.split(' ')[1];

    const [username, password] = Base64.decode(token).split(':');

    if (username !== USER.username || password !== USER.password) return res.json(Response.failed('Invalid User.'));

    console.log('JWT_SECRET', process.env.JWT_SECRET);

    const jwtToken = jwt.sign({ data: JSON.stringify({username}) }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

    res.json(Response.success({Token: jwtToken}));
});

module.exports = router;
