var debug = require('debug')('my-application');
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('static-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var logger = require('./logger');
var expressValidator = require("express-validator");

var LocalStrategy = require('passport-local').Strategy;
var db = mongoose.connection;

var app = express();

// routes
var routes = require('./routes/index');
var users = require('./routes/users');



app.get('/', routes);
app.get('/users', users.index);
app.get('/users/register', users.register);
app.get('/users/login', users.login);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uploads files 
var upload = multer({ dest: './uploads' });
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split("."),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';

        }
        return {
            param: formParam,
            msg: msg,
            value: value

        };

    }

}));

app.use(flash());
app.use(function(req, res, next) {
    res.locals.messages.require("express-messages")(req, res);
    next();

});
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var port = process.env.PORT || 3000;


var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});