import yaml from 'js-yaml';
import fs from 'fs';
import ArgParseObj from 'argparse';
import Twitter from 'node-tweet-stream';

// Récupération de la config
const config = yaml.safeLoad(fs.readFileSync('config/config.yml', 'utf8'));

// Permet la ligne de commande npm run build argument.
const ArgParse = ArgParseObj.ArgumentParser;
const parser = new ArgParse({
    version: '0.0.1',
    addHelp: true,
    description: 'Used for create the request to twitter'
});

parser.addArgument(
    ['-k', '--keyword'],
    {
        help: "The keyword to search for"
    }
);

// Permet de récupéré le tableau d'argument
const args = parser.parseArgs();

const client = new Twitter({
    consumer_key: config.default.app.twitter.consumerKey,
    consumer_secret: config.default.app.twitter.consumerSecret,
    token: config.default.app.twitter.accessToken,
    token_secret: config.default.app.twitter.accessTokenSecret
});

let arrayMail = [];

client.on('tweet', function (tweet, error)
{
    if (error) console.log(error);

    console.log(tweet.user.description);
    console.log(tweet.user.screen_name);
    console.log(tweet.user.followers_count);

    let promise = new Promise((resolve, reject) =>
    {
        const regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

        if ((tweet.user.description != null) && tweet.user.description.match(regex))
        {
            let arrayTemp = tweet.user.description.match(regex);
            for (let i = 0; i < arrayTemp.length; i++)
            {
                arrayMail.push(arrayTemp[i]);
            }
        }

        resolve(arrayMail);
    });
    Promise.all([promise]).then(console.log(arrayMail))
        .catch(e => console.log(e));

});

client.track(args.keyword);