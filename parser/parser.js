const config = require('config-yml');

const ArgParse = ArgParseObj.ArgumentParser;

const parser = new ArgParse({
    version: '0.0.1',
    addHelp:true,
    description: 'Argparse example'
});

parser.addArgument(
    [ '-at', '--accessToken' ],
    {
        help: "Token d'acces"
    }
);

parser.addArgument(
    [ '-ats', '--accessTokenSecret' ],
    {
        help: "Token d'acces secret"
    }
);

parser.addArgument(
    [ '-ck', '--consumerKey' ],
    {
        help: "Clef d'utilisateur "
    }
);

parser.addArgument(
    [ '-cs', '--consumerSecret' ],
    {
        help: "Secret d'utilisateur"
    }
);

console.log(ArgParse.accessToken);