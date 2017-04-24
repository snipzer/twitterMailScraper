import ArgParseObj from 'argparse';
import fs from 'fs';

const ArgParse = ArgParseObj.ArgumentParser;

const parser = new ArgParse({
    version: '0.0.1',
    addHelp:true,
    description: 'Used for create the config file'
});

// parser.addArgument(
//     [ '-at', '--accessToken' ],
//     {
//         help: "Token d'acces"
//     }
// );
//
// parser.addArgument(
//     [ '-ats', '--accessTokenSecret' ],
//     {
//         help: "Token d'acces secret"
//     }
// );
//
// parser.addArgument(
//     [ '-ck', '--consumerKey' ],
//     {
//         help: "Clef d'utilisateur "
//     }
// );
//
// parser.addArgument(
//     [ '-cs', '--consumerSecret' ],
//     {
//         help: "Secret d'utilisateur"
//     }
// );

parser.addArgument(
    [ '-t', '--toto' ],
    {
        help: "Secret d'utilisateur"
    }
);

const args = parser.parseArgs();

let argArray = args.toto.split(",");

let accessToken = argArray[0];
let accessTokenSecure = argArray[1];
let consumerKey = argArray[2];
let consumerSecret = argArray[3];



console.log(argArray);
