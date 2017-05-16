import fs from 'fs';
import yaml from 'js-yaml';
import Twitter from 'node-tweet-stream';
import MongooseConnector from '../bdd/MongooseConnector';
import UserModel from '../bdd/models/UserModel';

export default class Scraper {

    constructor(pathToConfig, socket)
    {
        this.config = yaml.safeLoad(fs.readFileSync(pathToConfig, 'utf8'));
        this.socket = socket;

        this.consumerKey = this.config.default.app.twitter.consumerKey;
        this.consumerSecret = this.config.default.app.twitter.consumerSecret;
        this.accessToken = this.config.default.app.twitter.accessToken;
        this.accessTokenSecret = this.config.default.app.twitter.accessTokenSecret;

        this.host = this.config.default.db.host;
        this.port = this.config.default.db.port;
        this.database = this.config.default.db.database;

        this.client = new Twitter({
            consumer_key: this.consumerKey,
            consumer_secret: this.consumerSecret,
            token: this.accessToken,
            token_secret: this.accessTokenSecret
        });
    }

    run(argument)
    {
        const mongooseConnector = new MongooseConnector(this.host, this.port, this.database);

        mongooseConnector.run().then(() =>
        {
            this._stealUser(this.client, argument);
        });
    }

    _stealUser(twitter, argument)
    {
        const socket = this.socket;

        twitter.on('tweet', function (tweet, error)
        {
            if (error) console.log(error);



            //console.log(`username: ${ tweet.user.screen_name }\ndescription: ${ tweet.user.description }\nfollowers: ${ tweet.user.followers_count }\n`);



            const regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

            if ((tweet.user.description != null) && tweet.user.description.match(regex))
            {
                let userMail = tweet.user.description.match(regex);

                UserModel.create(
                {
                    username: tweet.user.screen_name,
                    email: userMail[0],
                    followers: tweet.user.followers_count,
                }).then(() =>
                    {
                        console.log("================================\n");
                        console.log("================================\n\n");

                        socket.emit("toto");
                    }).catch(err => console.log(err));
            }
        });

        twitter.track(argument);
    }
}