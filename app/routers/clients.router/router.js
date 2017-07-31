const { Router } = require('express');
const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    router.get('/clients/', (req, res) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    req.flash(
                        'err', { message: 'You need authentication' }
                    );

                    res.redirect('/auth/sign-in');
                });
        } else if (req.user.isTrainer === '1') {
            return controller.getAll(req, res);
        }
        return res.redirect('/404');
    });

    router.get('/clients/:username', (req, res) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    req.flash(
                        'err', { message: 'You need authentication' }
                    );

                    res.redirect('/auth/sign-in');
                });
        }
        return controller.getProfile(req, res);
    });


    app.use('/', router);
};

module.exports = { attachTo };
