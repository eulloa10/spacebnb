'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        reviewableId: 1,
        reviewableType: 'spot',
        review: 'This place rocks',
        stars: 5
      },
      {
        reviewableId: 2,
        reviewableType: 'user',
        review: 'This owner is a jerk',
        stars: 1
      },
      {
        reviewableId: 3,
        reviewableType: 'spot',
        review: 'This place is okay',
        stars: 3
      },
      {
        reviewableId: 1,
        reviewableType: 'spot',
        review: 'This place rocks',
        stars: 4
      },
      {
        reviewableId: 2,
        reviewableType: 'user',
        review: 'This owner is a jerk',
        stars: 1
      },
      {
        reviewableId: 3,
        reviewableType: 'spot',
        review: 'This place is okay',
        stars: 3
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {}, {});
  }
};
