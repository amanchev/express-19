const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/auth/sign-up', (req, res) => {
            return controller.getSignUpForm(req, res);
        })
        .get('/auth/sign-in', (req, res) => {
            return controller.getSignInForm(req, res);
        })
        .post('/auth/sign-out', (req, res) => {
            return controller.signOut(req, res);
        })
        .post('/auth/sign-up', (req, res) => {
            return controller.signUp(req, res);
        })
        .post('/auth/sign-in', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/sign-in',
            failureFlash: true,
        }));

    app.use('/', router);
};

module.exports = { attachTo };
