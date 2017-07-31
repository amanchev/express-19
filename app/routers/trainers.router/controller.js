class TrainersController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.trainers.getAll().then((result) => {
            return res.render('trainers/trainers', {
                _masterContext: req.user || [],
                context: result || [],
            });
        });
    }
    getAllPublic(req, res) {
        this.data.trainers.getAll().then((result) => {
            return res.render('public/trainers', {
                context: result || [],
            });
        });
    }
    getPricing(req, res) {
        this.data.trainers.getAll().then((result) => {
            return res.render('public/pricing', {
                context: result || [],
            });
        });
    }
    getProfile(req, res) {
        // return res.render('trainers/profile');
        this.data.trainers.filterBy({ username: req.params.username })
            .then((result) => {
                result = result[0];
                if (req.params.username === req.user.username) {
                    result = req.user;
                    return res.render('trainers/myprofile', {
                        _masterContext: req.user || [],
                        context: result || [],
                    });
                }
                if (!result) {
                    return res.redirect('/404');
                }
                return res.render('trainers/profile', {
                    _masterContext: req.user || [],
                    context: result || [],
                });
            });
    }
}
const init = (data) => {
    return new TrainersController(data);
};

module.exports = { init };
