'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Song, { foreignKey: 'genreId'})

    }
  }
  Genre.init({
    title: DataTypes.STRING,
    description: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};