import ArgParseObj from 'argparse';

const ArgParse = ArgParseObj.ArgumentParser;

const parser = new ArgParse({
    version: '0.0.1',
    addHelp:true,
    description: 'Argparse example'
});

parser.addArgument(
    [ '-f', '--firstname' ],
    {
        help: 'Environnement du programme'
    }
);

parser.addArgument(
    [ '-l', '--lastname' ],
    {
        help: 'Port de la base de données'
    }
);

parser.addArgument(
    [ '-d', '--domain' ],
    {
        help: 'IP de la base de données'
    }
);

parser.addArgument(
    [ '-d', '--domain' ],
    {
        help: 'IP de la base de données'
    }
);