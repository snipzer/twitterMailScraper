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

console.log(argArray);

fs.writeFile("file.txt", "contents", {uid: 1000, gid: 1000}, callback);

// console.log(args.accessToken);
// console.log(args.accessTokenSecret);
// console.log(args.consumerKey);
// console.log(args.consumerSecret);