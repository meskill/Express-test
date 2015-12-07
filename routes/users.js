var express = require('express');
var User = require('../models/user');


var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) next(err);
        res.send(JSON.stringify(users));
    })
});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) next(err);
        res.send(user);
    })
})

router.post('/', function (req, res, next) {
    var user = {
        name: req.body.name,
        email: req.body.email,
        desc: req.body.desc
    }
    new User(user).save(function (err) {
        if (err) next(err);
        res.send('ok');
    })
});

router.delete('/:id', function (req, res, next) {
    User.remove({id: req.params.id}, function (err, user) {
        if (err) next(err);
        console.log(user);
        res.send('oki');
    })
});

router.put('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) next(err);
        user.name = req.body.name;
        user.email = req.body.email;
        user.desc = req.body.desc;
        user.save(function (err) {
            if (err) throw err;
        })
    });
})

module.exports = router;
