import path from 'path';
import _ from 'underscore';
import express from 'express';
import http from "http";
import ScraperController from './controller/ScraperController';
import Scraper from './utils/scraper/scraper';

export default class Server {
    constructor() {
        this._app = express();
        this._server = http.createServer(this._app);

        this._app.use(express.static(path.join(__dirname, '../public')));

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

        this._app.get('/scraper/:argument', (request, response) =>
        {
            this.scraper.run(request.params.argument);

            response.render('scraperView');
        })
    }

    setSocket(variable, middleware)
    {
        this._app.set(variable, middleware);
    }

    getSocket()
    {
        return this._app.get("io");
    }

    setScraper(pathToConfig)
    {
        this.scraper = new Scraper(pathToConfig, this.getSocket());
    }


    run() {
        this._initControllers();

        this._server.listen(this.port, () => console.log(`Server listening on port ${this.port}!`));
    }
}