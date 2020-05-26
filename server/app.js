/** @format */

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var accessLogStream = fs.createWriteStream(
    path.join(__dirname + '/log/', 'access.log'),
    { flags: 'a' }
);

var indexRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    // origin: ['http://www.example.com', 'http://localhost:8080'],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// 日誌的部分之後還要再修
app.use(logger(function(tokens, req, res) {
    return [
        `[${tokens.date(req, res, 'iso')}]`,
        `(${tokens['remote-user'](req, res)})`,
        tokens.method(req, res),
        tokens['remote-addr'](req, res),
        tokens.referrer(req, res),
        tokens.url(req, res),
        `HTTP/${tokens['http-version'](req, res)}`,
        tokens.status(req, res),
        `response-time: ${tokens['response-time'](req, res)} ms`,
        `total-time: ${tokens['total-time'](req, res)} `,
        `headers: ${JSON.stringify(req.headers)} `,
        `payload: ${JSON.stringify({query:req.query, body:req.body, params:req.params})}`
    ].join(' ');
}, { stream: accessLogStream }));
app.use(logger('dev'));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


const writeErrorLog = (err) => {

    const now = new Date();

    const errorLogStream = fs.createWriteStream(
        path.join(__dirname + '/log/', 'error.log'),
        { flags: 'a' }
    );

    // 使用 utf8 编码写入数据
    const message = `[${now.toISOString()}] ` + err.message + '\n' + err.stack + '\n\n';
    errorLogStream.write(message, 'UTF8');

    // 标记文件末尾
    errorLogStream.end();

    // 处理流事件 --> data, end, and error
    errorLogStream.on('finish', function() {
        console.log('写入完成。');
    });

    errorLogStream.on('error', function(err){
        console.log(err.stack);
    });
};

// error handler
app.use(function (err, req, res, next) {

    res.status(err.status || 500);
    res.json(req.app.get('env') === 'development' ? {err} : {});

    writeErrorLog(err);

    throw Error(err.message);
});

module.exports = app;
