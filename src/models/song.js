'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.Artist, { foreignKey: 'artistId' })
      Song.belongsTo(models.Album, { foreignKey: 'albumId' })
      Song.belongsTo(models.Genre, { foreignKey: 'genreId' })
    }
  }
  Song.init({
    albumId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Album', 
          key: 'id' 
        }
    },
    artistId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Artist', 
          key: 'id' 
        }
    },
    genreId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Genre', 
          key: 'id' 
        }
    },
    thumbnail: DataTypes.STRING, // add new column 21/8/2024
    url_mp4: DataTypes.STRING, // add new column 21/8/2024
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    composer: DataTypes.STRING,
    album: DataTypes.STRING,
    genre: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    duration: DataTypes.TIME,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};