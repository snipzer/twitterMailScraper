import yaml from 'js-yaml';
import fs from 'fs';
import Twitter from 'node-tweet-stream';

import MongooseConnector from '../bdd/MongooseConnector';
import ParserIndex from '../parser/parserIndex';

// Récupération des arguments
const argument = new ParserIndex().getArguments();

// Récupération de la config
const config = yaml.safeLoad(fs.readFileSync('src/config/config.yml', 'utf8'));

const client = new Twitter({
    consumer_key: config.default.app.twitter.consumerKey,
    consumer_secret: config.default.app.twitter.consumerSecret,
    token: config.default.app.twitter.accessToken,
    token_secret: config.default.app.twitter.accessTokenSecret
});

const mongooseConnector = new MongooseConnector(config.default.db.host, config.default.db.port, config.default.db.database);

mongooseConnector.run().then(() =>
{
    mongooseConnector.stealUser(client, argument);
});



