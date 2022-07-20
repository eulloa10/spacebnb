'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(
        models.Image,
        {
          foreignKey:'imageableId',
          constraints: false,
          scope: {
            imageableType: 'review'
          }
        }
      )

      Review.belongsTo(
        models.User,
        {
          foreignKey:'reviewableId',
          onDelete: 'cascade',
          constraints: false
        }
      )

      Review.belongsTo(
        models.Spot,
        {
          foreignKey: 'reviewableId',
          onDelete: 'cascade',
          constraints: false
        }
      )
    }
  }
  Review.init({
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    // spotId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    reviewableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewableType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
