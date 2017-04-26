import yaml from 'js-yaml';
import fs from 'fs';
import Twitter from 'node-tweet-stream';
import ParserIndex from '../utils/parser/parserIndex';
import MongooseConnector from '../utils/bdd/MongooseConnector';

export default class ScraperController {
    index(req, res)
    {
        //res.send(`Hello World`);
        res.render('scraperView');
    }

    scraper()
    {
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
            this.stealUser(client, argument);
        });
    }

    _stealUser(twitter, argument)
    {
        twitter.on('tweet', function (tweet, error)
        {
            if (error) console.log(error);

            console.log("================================\n");

            console.log(`username: ${ tweet.user.screen_name }\ndescription: ${ tweet.user.description }\nfollowers: ${ tweet.user.followers_count }\n`);

            console.log("================================\n\n");

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
                    console.log(`=========================>USER CREATED<=========================\n*username: ${ tweet.user.screen_name }\n*description: ${ userMail[0] }\n*followers: ${ tweet.user.followers_count }\n`);

                })
                    .catch(err => console.log(err));
            }
        });

        twitter.track(argument.keyword);
    }
}