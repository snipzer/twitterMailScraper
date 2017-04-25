'use strict';

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var User = mongoose.model('User', {
    username: String,
    email: String,
    followers: String
});

mongoose.connect('mongodb://162.243.195.173:27017/db_test', function (err) {
    console.log(err);
    console.log("Connected");

    User.create({
        username: "Bibi2",
        email: "biib@domain.tld",
        followers: "3000"
    }).then(function (user) {
        return console.log(user);
    }).catch(function (e) {
        return console.log(e);
    });
});