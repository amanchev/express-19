const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            if (req.query.sport) {
                return data.trainers
                    .filterBy({ 'sport': new RegExp(req.query.sport, 'i') })
                    .then((trainers) => {
                        res.send(trainers);
                    });
            }
            if (req.query.tag) {
                return data.trainers
                    .filterBy({ 'tag': new RegExp(req.query.tag, 'i') })
                    .then((trainers) => {
                        res.send(trainers);
                    });
            }

            return data.trainers.getAll()
                .then((trainers) => {
                    res.send(trainers);
                });
        });

    app.use('/api/trainers', apiRouter);
};

module.exports = { attachTo };
