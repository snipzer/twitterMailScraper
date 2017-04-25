import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default class MongooseConnector {
    constructor(ip, port, table)
    {
        this.ip = ip;
        this.port = port;
        this.table = table;
    }

    run()
    {
        const promiseMongoose = new Promise((resolve, reject) =>
        {
            mongoose.connect(`mongodb://${ this.ip }:${ this.port }/${ this.table }`, err =>
            {
                if (err)
                {
                    reject(err);
                    return;
                }
                resolve("Connected")
            });
        });
        return promiseMongoose
    }
}