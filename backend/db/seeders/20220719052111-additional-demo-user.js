'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John',
        lastName: 'Joe',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'John',
        lastName: 'Moe',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
