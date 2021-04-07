const { Sequelize, DataTypes } = require('sequelize');
const seeder = require('./seeder.js');

const sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '.data/database.sqlite'
});

const User = require('./models/User.model.js')(sequelize, DataTypes);
const Session = require('./models/Session.model.js')(sequelize, DataTypes);
const Label = require('./models/Label.model.js')(sequelize, DataTypes);
const Todo = require('./models/Todo.model.js')(sequelize, DataTypes);
const DateMood = require('./models/DateMood.model.js')(sequelize, DataTypes);

(async function() {
    await sequelize.sync();
    await seeder.seedLabels(Label);
})();

module.exports = {
    User,
    Session,
    Label,
    Todo,
    DateMood
};