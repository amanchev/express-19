class ClientsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.clients.getAll().then((result) => {
            return res.render('clients/clients', {
                _masterContext: req.user || [],
                context: result || [],
            });
        });
    }
    getProfile(req, res) {
        // return res.render('trainers/profile');
        this.data.clients.filterBy({ username: req.params.username })
            .then((result) => {
                result = result[0];
                if (!result) {
                    if (req.params.username === req.user.username) {
                        result = req.user;
                    } else {
                        return res.redirect('/404');
                    }
                }
                return res.render('clients/profile', {
                    _masterContext: req.user || [],
                    context: result || [],
                });
            });
    }
}
const init = (data) => {
    return new ClientsController(data);
};

module.exports = { init };
