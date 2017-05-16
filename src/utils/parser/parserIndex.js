import fs from 'fs';
import ArgParseObj from 'argparse';


export default class ParserIndex {
    constructor()
    {
        this.parser = new ArgParseObj.ArgumentParser({
            version: '0.0.1',
            addHelp: true,
            description: 'Used for create the request to twitter'
        });

        this.parser.addArgument(
            ['-k', '--keyword'],
            {
                help: "The keyword to search for"
            }
        );
        this.args = this.parser.parseArgs();
    }

    getArguments()
    {
        return this.args;
    }
}