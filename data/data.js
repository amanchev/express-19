const ItemsData = require('./items.data');
const CategoriesData = require('./categories.data');
const TodosData = require('./todos.data');
const UsersData = require('./users.data');
const TrainersData = require('./trainers.data');
const ClientsData = require('./clients.data');

const init = (db) => {
    return Promise.resolve({
        items: new ItemsData(db),
        todos: new TodosData(db),
        categories: new CategoriesData(db),
        users: new UsersData(db),
        trainers: new TrainersData(db),
        clients: new ClientsData(db),
    });
};

module.exports = { init };
