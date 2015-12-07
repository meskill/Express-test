/**
 * Created by meskill on 07.12.2015.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/db');
mongoose.connection.on('open', function () {
    console.log('Mongoose connected');
})

module.exports = mongoose;