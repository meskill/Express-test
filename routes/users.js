var express = require('express');
var User = require('../models/user');


var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) next(err);
        res.send(users);
    })
});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
})

router.post('/', function (req, res, next) {
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        desc: req.body.desc
    }
    new User(user).save(function (err) {
        if (err) return next(err);
        res.send('ok');
    })
});

router.delete('/:id', function (req, res, next) {
    User.remove({_id: req.params.id}, function (err) {
        if (err) return next(err);
        res.send('oki');
    })
});

router.put('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        user.name = req.body.name;
        user.email = req.body.email;
        user.desc = req.body.desc;
        user.save(function (err) {
            if (err) next(err);
        })
    });
})

module.exports = router;
