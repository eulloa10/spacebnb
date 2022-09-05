'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 2,
        review: 'This place rocks',
        stars: 5
      },
      {
        userId: 2,
        spotId: 3,
        review: 'This owner is a jerk',
        stars: 1
      },
      {
        userId: 3,
        spotId: 1,
        review: 'This place is okay',
        stars: 3
      },
      {
        userId: 3,
        spotId: 2,
        review: 'This place is meh',
        stars: 3
      },
      {
        userId: 1,
        spotId: 3,
        review: 'This place was solid',
        stars: 5
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {}, {});
  }
};
