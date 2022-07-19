'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Images', [
      {
       imageableId: 1,
       imageableType: 'review',
       url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzFedSQT0lUcr15fCwJjhNHVqPsin8e_XgMg&usqp=CAU',
      },
      {
        imageableId: 2,
        imageableType: 'spot',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0hSXw8nUp0Za8J8eDH5ElHnSVkINsLS5_4w&usqp=CAU',
       },
       {
        imageableId: 3,
        imageableType: 'review',
        url: 'https://media.architecturaldigest.com/photos/5e4d52b1c2fb4c0009749bea/master/w_3840,h_2160,c_limit/Axiom%20Space%20Station_photo_credit%20image%20Axiom%20Space_6.jpg',
       },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {}, {});
  }
};
