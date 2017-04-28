import fs from 'fs';
import yaml from 'js-yaml';
import Twitter from 'node-tweet-stream';
import MongooseConnector from '../bdd/MongooseConnector';
import UserModel from '../bdd/models/UserModel';
import _ from 'underscore';

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

        this.twitter = new Twitter({
            consumer_key: this.consumerKey,
            consumer_secret: this.consumerSecret,
            token: this.accessToken,
            token_secret: this.accessTokenSecret
        });

        this.run();
    }

    run()
    {
        const mongooseConnector = new MongooseConnector(this.host, this.port, this.database);

        mongooseConnector.run().then(() =>
        {
            this._stealUser(this.twitter);
        });
    }

    _stealUser(twitter)
    {
        const socket = this.socket;

        twitter.on('tweet', function (tweet, error)
        {
            if (error) console.log(error);

            socket.emit("readUser", {

                username: tweet.user.screen_name,
                description: tweet.user.description,
                followers: tweet.user.followers_count,
                friends: tweet.user.friends_count,

            }, {for: 'everyone'});

            const regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

            if ((!_.isNull(tweet.user.description)) && tweet.user.description.match(regex))
            {
                let userMail = tweet.user.description.match(regex);

                UserModel.create(
                    {
                        username: tweet.user.screen_name,
                        email: userMail[0],
                        followers: tweet.user.followers_count,

                    }).then(() =>
                {
                    socket.emit("savedUser", {

                        username: tweet.user.screen_name,
                        email: userMail[0],
                        followers: tweet.user.followers_count,
                        friends: tweet.user.friends_count,

                    }, {for: 'everyone'});
                }).catch(err => console.log(err));
            }
        });

    }

    track(argument)
    {
        if(_.isUndefined(this.arguments))
        {
            this.arguments = [];

            this.arguments.push(argument);
        }
        else
        {
            this.arguments.push(argument);
        }

        this.arguments.forEach(item =>
        {
            this.twitter.track(item);
        });
    }

    untrack(argument)
    {
        const index = this.arguments.indexOf(argument);

        this.arguments.splice(index, 1);
    }
}