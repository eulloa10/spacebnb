'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      //   {
      //    userId: 1,
      //    spotId: 1,
      //    review: 'This place rocks',
      //    stars: 5
      //  },
      //  {
      //   userId: 2,
      //   spotId: 2,
      //   review: 'This place sucks',
      //   stars: 1
      // },
      // {
      //   userId: 3,
      //   spotId: 3,
      //   review: 'This place is okay',
      //   stars: 3
      // }
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
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {}, {});
  }
};
