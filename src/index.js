import yaml from 'js-yaml';
import fs from 'fs';
import ArgParseObj from 'argparse';
import Twitter from 'twitter';

const config = yaml.safeLoad(fs.readFileSync('config/config.yml', 'utf8'));

// console.log(config.default.app.twitter.accessToken);
// console.log(config.default.app.twitter.accessTokenSecret);
// console.log(config.default.app.twitter.consumerKey);
// console.log(config.default.app.twitter.consumerSecret);

const ArgParse = ArgParseObj.ArgumentParser;

const parser = new ArgParse({
    version: '0.0.1',
    addHelp:true,
    description: 'Used for create the request to twitter'
});

parser.addArgument(
    [ '-k', '--keyword' ],
    {
        help: "The keyword to search for"
    }
);

const args = parser.parseArgs();

const client = new Twitter({
    consumer_key: config.default.app.twitter.consumerKey,
    consumer_secret: config.default.app.twitter.consumerSecret,
    access_token_key: config.default.app.twitter.accessToken,
    access_token_secret: config.default.app.twitter.accessTokenSecret
});


// client.get('search/tweets', {q: args.keyword}, function (error, tweets, response)
// {
//     if(error) console.log(error);
//
//      // console.log(tweets.statuses);
//
//     tweets.statuses.forEach( function (item)
//     {
//         // console.log(item.user.description);
//     });
//
//
//
// });

const regex = /^[a-zA-Z0-9._-]{1,64}@([a-zA-Z0-9-]{2,252}\.[a-zA-Z.]{2,6}){5,255}$/g;

const str = "salut jean jean@example.com";

let tab = str.match(regex);

console.log(tab);