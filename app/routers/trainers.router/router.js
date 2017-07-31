const { Router } = require('express');
const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    router.get('/trainers/', (req, res) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    req.flash(
                        'err', { message: 'You need authentication' }
                    );

                    res.redirect('/auth/sign-in');
                });
        }
        return controller.getAll(req, res);
    });
    router.get('/trainers/all', (req, res) => {
        return controller.getAllPublic(req, res);
    });
    router.get('/pricing', (req, res) => {
        return controller.getPricing(req, res);
    });
    router.get('/trainers/:username', (req, res) => {
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