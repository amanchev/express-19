const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.trainers.getAll()
                .then((trainers) => {
                    return res.send(trainers);
                });
        })
        .post('/:username', (req, res) => {
            return data.clients.findByUsername(req.params.username)
                .then((client) => {
                    req.user.clients.push(client);
                });
        });

    app.use('/api/trainers', apiRouter);
};

module.exports = { attachTo };
