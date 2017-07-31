/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        if (!req.user) {
            return res.redirect('/home');
        }
        return res.redirect('/dashboard');
    });
    app.get('/home', (req, res) => {
        if (!req.user) {
            return res.render('public/home');
        }
        return res.redirect('dashboard');
    });
    app.get('/404', (req, res) => {
        return res.render('404');
    });
    app.get('/dashboard', (req, res) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    req.flash(
                        'err', { message: 'You need authentication' }
                    );

                    res.redirect('/auth/sign-in');
                });
        }
        return res.render('dashboard', {
            _masterContext: req.user || [],
        });
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
    app.get('*', (req, res) => {
        return res.redirect('404');
    });
};

module.exports = { attachTo };
