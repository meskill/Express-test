/**
 * Created by meskill on 07.12.2015.
 */

var mongoose = require('mongoose')

var User = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    desc: String
});

module.exports = mongoose.model('User', User);