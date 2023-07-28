const { Sequelize } = require('sequelize');
const dbconfig = require('./configs/database.js');

const sequelize = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {
  host: dbconfig.host,
  dialect: 'mysql',
  port: dbconfig.port,
  dialectOptions: {
    ssl: {
      ca: dbconfig.ssl.ca
    }
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize
};

/*
const sequelize = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {
  host: dbconfig.host,
  dialect: 'mysql',
  port: dbconfig.port
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });
module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize
};
*/