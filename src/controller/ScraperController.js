import yaml from 'js-yaml';
import fs from 'fs';
import Twitter from 'node-tweet-stream';
import ParserIndex from '../utils/parser/parserIndex';
import MongooseConnector from '../utils/bdd/MongooseConnector';

export default class ScraperController {
    index(req, res)
    {
        res.render('scraperView');
    }

}