/**
 * Created by meskill on 08.12.2015.
 */

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var TwitterStrategy = require('passport-twitter')
var User = require('../models/user')

passport.use(new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'}
    , function (email, password, done) {
        User.findOne({email: email}, function (err, user) {
            if (err) return done(err)
            if (!user) return done(null, false, {message: 'Incorrect email'})
            if (user.password === password) return done(null, user)
            return done(null, false, {message: 'Incorrect password'})
        })
    }));

passport.use(new TwitterStrategy({
        consumerKey: 'DylSwCkPUBHdkejTidxyzQ7SI',
        consumerSecret: 'ePTlMfDH0DNz20WQMfASg9zhVuEwDQpKx9xMVsn4TL7k4YbhbY',
        callbackURL: "http://localhost:3000/private/twitter"
    }
    , function (token, tokenSecret, profile, done) {
        var user = {
            email: profile.username + '@twitter.com',
            name: profile.username,
            password: 'twitter'
        }
        done(null, user)
    }
))

passport.serializeUser(function (user, done) {
    done(null, user);
});


passport.deserializeUser(function (user, done) {
    User.findById(user.id, function (err, u) {
        if (err)
            if (err.name != 'CastError' || err.kind !== 'ObjectId')
                return done(err)
            u = user
        done(null, user);
    });
});

module.exports = passport