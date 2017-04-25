import fs from 'fs';
import ArgParseObj from 'argparse';


export default class parserConfig
{
    constructor(pathToConfigSample, pathToConfig)
    {
        this.pathToConfigSample = pathToConfigSample;
        this.pathToConfig = pathToConfig;
        this.parser = new ArgParseObj.ArgumentParser({
            version: '0.0.1',
            addHelp:true,
            description: 'Used for create the config file'
        });

        this.parser.addArgument(
            [ '-c', '--credential' ],
            {
                help: "Argument are: accessToken,accessTokenSecret,consumerKey,consumerSecure, host, port, database"
            }
        );
    }

    setParam()
    {
        const args = this.parser.parseArgs();

        let argArray = args.credential.split(",");

        this.accessToken = argArray[0];
        this.accessTokenSecret = argArray[1];
        this.consumerKey = argArray[2];
        this.consumerSecret = argArray[3];
        this.host = argArray[4];
        this.port = argArray[5];
        this.database = argArray[6];

        return this;
    }

    writeConfig()
    {
        try
        {
            fs.readFile(this.pathToConfigSample, 'utf8', (err,data) =>
            {
                if (err) return console.log(err);


                let result = data.replace(/ACCESS_TOKEN_SECRET/g, this.accessTokenSecret)
                    .replace(/ACCESS_TOKEN/g, this.accessToken)
                    .replace(/CONSUMER_SECRET/g, this.consumerSecret)
                    .replace(/IP_ADRESSE/g, this.host)
                    .replace(/PORT/g, this.port)
                    .replace(/DATABASE_NAME/g, this.database)
                    .replace(/CONSUMER_KEY/g, this.consumerKey);

                let promise = new Promise((resolve, reject) =>
                {
                    fs.writeFile(this.pathToConfig, result, 'utf8', err =>
                    {
                        if (err) return console.log(err);
                        resolve();
                    });
                });

                Promise.all([promise]).then(console.log("Config file successfully write"));
            });
        }catch(e)
        {
            console.log(e);
        }
    }
}

