const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    addClient(trainer, client) {
        if (!this._isClientExist(trainer, client)) {
            this.collection.update({ 'username': trainer.username }, { $push: { 'clients': client } });
        } else {
            throw new Error('Client allready exist!');
        }
    }
    deleteClient(trainer, client) {
        this.collection.update({ 'username': trainer.username }, { $pop: { 'clients': client } });
    }

    _isClientExist(trainer, client) {
        // this.collection.findByUsername(trainer.username)
        //     .then((t) => {
        //         t.clients.forEach((c) => {
        //             if (c._username === client._username) {
        //                 return true;
        //             }
        //             return false;
        //         });
        //     });
        return false;
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }
    findByEmail(email) {
        return this
            .filterBy({ email: new RegExp(email, 'i') })
            .then(([user]) => user);
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }
}

module.exports = UsersData;
