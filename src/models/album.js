'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.hasMany(models.Song, { foreignKey: 'albumId'})

    }
  }
  Album.init({
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    coverUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
    tableName: 'album',

  });
  return Album;
};