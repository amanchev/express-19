class TodosController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in');
    }
    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    signUp(req, res) {
        const bodyUser = req.body;

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }
                this.data.users.create(bodyUser);

                delete bodyUser.password;
                delete bodyUser['confirm-password'];

                bodyUser.clients = [];

                if (bodyUser.isTrainer === '1') {
                    return this.data.trainers.create(bodyUser);
                }
                return this.data.clients.create(bodyUser);
            })

        .then((dbUser) => {
                return res.redirect('/auth/sign-in');
            })
            .catch((err) => {
                console.log(err);
                req.flash('error', err);
                return res.redirect('/auth/sign-in');
            });
    }
}

const init = (data) => {
    return new TodosController(data);
};

module.exports = { init };
