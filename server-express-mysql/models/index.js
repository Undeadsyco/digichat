'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const associations = require('./rel/associations');
const db = {};


const usermodel = require('./user');
const relationshipModel = require('./relationship');
const groupModel = require('./group');
const membershipModel = require('./membership');
const postModel = require('./post');
const commentModel = require('./comment');
const requestModel = require('./request');
const blockModel = require('./block');

/** @type {Sequelize} */
let sequelize;

if (env === 'development') {
  require('dotenv').config({ path: __dirname + '/../.env.development', override: true });
  sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_IP,
    dialect: 'mysql',
  });
} else {
  console.log('database', process.env.DATABASE_NAME);
  console.log('username', process.env.DATABASE_USERNAME);
  console.log('password', process.env.DATABASE_PASSWORD);

  sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: `/cloudsql/${process.env.DATABASE_INSTANCE}`,
    dialect: 'mysql',
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.DATABASE_INSTANCE}`,
    }
  });
}

db.user = usermodel(sequelize, Sequelize.DataTypes);
db.relationship = relationshipModel(sequelize, Sequelize.DataTypes);
db.group = groupModel(sequelize, Sequelize.DataTypes);
db.membership = membershipModel(sequelize, Sequelize.DataTypes);
db.post = postModel(sequelize, Sequelize.DataTypes);
db.comment = commentModel(sequelize, Sequelize.DataTypes);
db.request = requestModel(sequelize, Sequelize.DataTypes);
db.block = blockModel(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

associations(db)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
