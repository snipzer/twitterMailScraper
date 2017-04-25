import mongoose from 'mongoose';
import UserModel from './models/UserModel';

mongoose.Promise = global.Promise;

export default class MongooseConnector {
    constructor(ip, port, table)
    {
        this.ip = ip;
        this.port = port;
        this.table = table;
    }

    run()
    {
        const promiseMongoose = new Promise((resolve, reject) =>
        {
            mongoose.connect(`mongodb://${ this.ip }:${ this.port }/${ this.table }`, err =>
            {
                if (err)
                {
                    reject(err);
                    return;
                }
                resolve("Connected")
            });
        });
        return promiseMongoose
    }

    stealUser(twitter, argument)
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
                    }).then(() => console.log(`=========================>USER CREATED<=========================\n*username: ${ tweet.user.screen_name }\n*description: ${ userMail[0] }\n*followers: ${ tweet.user.followers_count }\n`))
                    .catch(err => console.log(err));
            }
        });

        twitter.track(argument.keyword);
    }
}