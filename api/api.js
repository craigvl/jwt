var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

var strategy = new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {

    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function (err, user) {
        if (err) return done(err);

        if (!user)
            return done(null, false, {
                message: 'Wrong email/password'
            });

        user.comparePasswords(password, function (err, isMatch) {
            if (err) return done(err);

            if (!isMatch)
                return done(null, false, {
                    message: 'Wrong email/password'
                });
            
            console.log(user.email);
            return done(null, user);

        });
    })

});


passport.use(strategy);

app.post('/register', function (req, res) {
    console.log('Register Called');

    if (!req.body) return res.sendStatus(400)

    var user = req.body;
    var newUser = new User({
        email: user.email,
        password: user.password
    })

    newUser.save(function (err) {
        createSendToken(newUser, res);
    })
})

app.post('/login', passport.authenticate('local'), function (req, res) {
                   createSendToken(req.user, res);
})

function createSendToken(user, res) {

    var payLoad = {
        sub: user.id
    }

    var token = jwt.encode(payLoad, "shhh....");

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });

}

var bunches = [
    'Pats',
    'foo'
];

app.get('/bunches', function (req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'you are not authorized'
        });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shhh....");

    if (!payload.sub) {
        res.status(401).send({
            message: 'Authentication failed'
        });
    }

    res.send(bunches);
})

mongoose.connect('mongodb://localhost/bunchy')

var server = app.listen(3000, function () {
    console.log('api listening on ', server.address().port);
})