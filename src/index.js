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

let arrayMail = [];

client.get('search/tweets', {q: args.keyword}, function (error, tweets, response)
{
    if(error) console.log(error);

     // console.log(tweets.statuses);
    let promise = new Promise((resolve, reject) =>
    {

        tweets.statuses.forEach( function (item)
        {
            console.log(item.user.description);
            const regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

            if(item.user.description.match(regex))
            {
                let toto = item.user.description.match(regex);
                for(let i = 0; i < toto.length; i++)
                {
                    arrayMail.push(toto[i]);
                }
            }

        });
        resolve(arrayMail);
    });
    Promise.all([promise]).then(console.log(arrayMail));
});

