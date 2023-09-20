const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/app.db'
});


//exportar o apontamento do banco
module.exports = sequelize;