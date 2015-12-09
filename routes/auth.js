/**
 * Created by meskill on 08.12.2015.
 */

var express = require('express')
var passport = require('../auth')
var User = require('../models/user')

var router = express.Router()

function authenticate(method) {
    return function (req, res, next) {
        passport.authenticate(method, function (err, user, info) {
            if (err) return next(err)
            if (!user) return res.redirect('/login?info=' + info.message)
            req.logIn(user, (err) => next(err))
        })(req, res, next)
    }
}

router.get('/twitter', passport.authenticate('twitter'))
router.get('/twitter/callback', authenticate('twitter'), (req, res, next) => res.redirect('../'))

router.post('/login', authenticate('local'), (req, res, next) => res.redirect('./'))

router.get('/logout', function (req, res, next) {
    req.logout()
    res.redirect('/login')
})

router.get('/login', function (req, res, next) {
    res.render('login', {info: req.query.info})
})

router.post('/register', function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        desc: 'New User'
    })
    user.save(function (err) {
        if (err) return res.redirect('./register')
        res.redirect('/login?info=Successfully register')
    })
})

router.get('/register', function (req, res, next) {
    res.render('register')
})

router.all('/*', function (req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('./login?info=Access Denied')
})

router.get('/', (req, res, next) => res.redirect('./index'))

router.get('/index(.html?)?', function (req, res, next) {
    res.render('private/index', {name: req.user.name, title: 'my Server'})
})

module.exports = router