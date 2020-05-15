const Sequelize = require('sequelize');
const db = require('./db/db');

const Task = db.define('tasks', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });

module.exports = Task