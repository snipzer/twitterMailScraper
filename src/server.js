import path from 'path';
import _ from 'underscore';
import express from 'express';

import ScraperController from './controller/ScraperController';

export default class Server {
    constructor() {
        this._app = express();


        this._app.set('view engine', 'pug');
        this._app.set('views', path.join(__dirname, '../src/views'));
    }

    setPort(port) {
        if(_.isEmpty(port)) {
            port = 3000;
        }

        this.port = port;
    }

    _initControllers() {
        const scraperController = new ScraperController();

        this._app.get('/', scraperController.index);
    }

    run() {
        this._initControllers();

        this._app.listen(this.port, () => console.log(`Server listening on port ${this.port}!`))
    }
}