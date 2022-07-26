'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Bookings', [{
       userId: 1,
       spotId: 1,
       startDate: "2022-08-01 02:26:32",
       endDate: "2022-08-02 02:26:32",
     },
     {
      userId: 2,
      spotId: 2,
      startDate: "2022-08-03 02:26:32",
      endDate: "2022-08-04 02:26:32",
    },
    {
      userId: 3,
      spotId: 3,
      startDate: "2022-09-01 02:26:32",
      endDate: "2022-09-10 02:26:32",
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {}, {});
  }
};
