import yaml from 'js-yaml';
import fs from 'fs';
import ArgParseObj from 'argparse';


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


console.log(args.keyword);