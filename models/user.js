/**
 * Created by meskill on 07.12.2015.
 */

var mongoose = require('mongoose')

var User = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    desc: String,
    recent: Array,
    favorites: Array
});

module.exports = mongoose.model('User', User);