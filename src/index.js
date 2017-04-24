import yaml from 'js-yaml';
import fs from 'fs';


const config = yaml.safeLoad(fs.readFileSync('config/config.yml', 'utf8'));

console.log(config.default.app.twitter.accessToken);
console.log(config.default.app.twitter.accessTokenSecret);
console.log(config.default.app.twitter.consumerKey);
console.log(config.default.app.twitter.consumerSecret);
