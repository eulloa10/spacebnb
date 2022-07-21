'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Spots', [
      {
       ownerId: 1,
       address: '1234 Testing Avenue',
       city: 'Los Angeles',
       state: 'CA',
       zipcode: 12345,
       country: 'USA',
       lat: '37.2431',
       lng: '115.7930',
       name: 'Galactic Getaway',
       description: 'A comfortable place to stay',
       price: 199,
       previewImage: 'https://www.somagnews.com/wp-content/uploads/2020/02/b1-21-e1582998385352.jpg'
     },
     {
      ownerId: 2,
      address: '1234 Testing Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: 12345,
      country: 'USA',
      lat: '37.2431',
      lng: '115.7930',
      name: 'AVP',
      description: 'A comfortable place to stay',
      price: 299,
      previewImage: 'https://images.squarespace-cdn.com/content/v1/581b9de346c3c4dd52bd4ddf/1479090917761-RJYTLC5T029IHSDB37NL/Screen+Shot+2016-11-10+at+10.37.23+PM.png?format=1000w'
    },
    {
      ownerId: 3,
      address: '1234 Testing Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: 12345,
      country: 'USA',
      lat: '37.2431',
      lng: '115.7930',
      name: 'Milky Way',
      description: 'A comfortable place to stay',
      price: 699,
      previewImage: 'http://dornob.com/wp-content/uploads/2012/05/futuristic-curved-house.jpg'
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {}, {});
  }
};
