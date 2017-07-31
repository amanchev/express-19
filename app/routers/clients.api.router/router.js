const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            if (!req.user) {
                return res.send('You need authentication');
            }
            return res.send(req.user.clients);
        })
        .post('/', (req, res) => {
            return data.clients.findByUsername(req.body.username)
                .then((client) => {
                    data.trainers.addClient(req.user, client);
                    data.users.addClient(req.user, client);
                })
                .catch((err) => {
                    return res.send(err);
                });
        })
        .delete('/', (req, res) => {
            return data.clients.findByUsername(req.body.username)
                .then((client) => {
                    data.trainers.deleteClient(req.user, client);
                    data.users.deleteClient(req.user, client);
                })
                .catch((err) => {
                    return res.send(err);
                });
        });


    app.use('/api/clients', apiRouter);
};

module.exports = { attachTo };
