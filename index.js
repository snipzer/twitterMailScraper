const config = require('config-yml');

console.log(config.default.app.twitter.accessToken);
console.log(config.default.app.twitter.accessTokenSecret);
console.log(config.default.app.twitter.consumerKey);
console.log(config.default.app.twitter.consumerSecret);
