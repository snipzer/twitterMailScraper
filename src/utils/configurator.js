import ArgParseObj from 'argparse';
import fs from 'fs';

const ArgParse = ArgParseObj.ArgumentParser;

const parser = new ArgParse({
    version: '0.0.1',
    addHelp:true,
    description: 'Used for create the config file'
});

parser.addArgument(
    [ '-c', '--credential' ],
    {
        help: "Argument are: accessToken,accessTokenSecret,consumerKey,consumerSecure"
    }
);

const args = parser.parseArgs();

let argArray = args.credential.split(",");

let accessToken = argArray[0];
let accessTokenSecret = argArray[1];
let consumerKey = argArray[2];
let consumerSecret = argArray[3];

try
{
    fs.readFile("config/config.sample.yml", 'utf8', (err,data) =>
    {
        if (err) return console.log(err);


        let result = data.replace(/ACCESS_TOKEN_SECRET/g, accessTokenSecret)
            .replace(/ACCESS_TOKEN/g, accessToken)
            .replace(/CONSUMER_SECRET/g, consumerSecret)
            .replace(/CONSUMER_KEY/g, consumerKey);

        let promise = new Promise((resolve, reject) =>
        {
            fs.writeFile("config/config.yml", result, 'utf8', err =>
            {
                if (err) return console.log(err);
            });

            resolve();
        });

        Promise.all([promise]).then(console.log("Config file successfully write"));
    });
}catch(e)
{
    console.log(e);
}
