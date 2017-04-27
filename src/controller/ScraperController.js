
export default class ScraperController {

    constructor(socket)
    {
        this.socket = socket;
    }

    index(req, res)
    {
        console.log(this.socket);
        this.socket.emit("toto", {for: "everyone"});

        res.render('scraperView');
    }

}