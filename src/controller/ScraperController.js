export default class ScraperController {
    index(req, res) {
        res.send(`Hello World`);
        // res.render('user/index', {
        //     name: req.params.username,
        //     title: 'Mon titre de page'
        // });
    }
}