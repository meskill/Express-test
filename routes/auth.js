/**
 * Created by meskill on 08.12.2015.
 */

var express = require('express');
var passport = require('../auth');
var User = require('../models/user');

var router = express.Router();

function authenticate(method) {
	return function (req, res, next) {
		passport.authenticate(method, function (err, user, info) {
			if (err) return next(err);
			if (!user) return res.redirect('/login?info=' + info.message);
			req.logIn(user, (err) => next(err))
		})(req, res, next)
	}
}

router.get('/twitter', authenticate('twitter'), (req, res, next) => res.redirect('./'));

router.post('/login', authenticate('local'), (req, res, next) => res.redirect('./'));

router.get('/logout', function (req, res, next) {
	req.logout();
	res.redirect('/login')
});

router.get('/login', function (req, res, next) {
	res.render('login', {info: req.query.info})
});

router.post('/register', function (req, res, next) {
	var user = new User({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		desc: 'New User'
	});
	user.save(function (err) {
		if (err) return res.redirect('./register');
		res.redirect('/login?info=Successfully register')
	})
});

router.get('/register', function (req, res, next) {
	res.render('register')
});

router.get('/*', function (req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('./login?info=Access Denied')
});

router.get('/', (req, res, next) => res.redirect('./index.html'));

router.get('/recent', (req, res, next) => res.send(req.user.recent));

router.post('/recent', (req, res, next) => {
	User.findById(req.user._id, (err, user) => {
		if (err) return next(err);
		user.recent.push({
			title: req.body.title
			, count: req.body.count
		});
		user.save((err) => err ? next(err) : 0)
	});
	res.end()
});

router.put('/recent', (req, res, next) => {
	User.findByIdAndUpdate(req.user._id, {recent: req.body}, (err, user) => {
		if (err) return next(err)
	});
	res.end()
});

router.get('/favourites', (req, res, next) => res.send(req.user.favourites));

router.post('/favourites', (req, res, next) => {
	User.findById(req.user._id, (err, user) => {
		if (err) return next(err);
		user.favourites.push(JSON.parse(req.body));
		user.save((err) => err ? next(err) : 0)
	});
	res.end()
});

router.put('/favourites', (req, res, next) => {
	User.findByIdAndUpdate(req.user._id, {favourites: req.body}, (err, user) => {
		if (err) return next(err)
	});
	res.end()
});

router.use(express.static('./private'));

//router.get('/index(.html?)?', function (req, res, next) {
//    res.render('private/index', {name: req.user.name, title: 'my Server'})
//})

module.exports = router;