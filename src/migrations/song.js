'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Song', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Album', 
          key: 'id' 
        }
      },
      artistId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Artist', 
          key: 'id' 
        } 
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genre', 
          key: 'id' 
        }
      },
      title: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      composer: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      releaseDate: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.TIME
      },
      url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Song');
  }
};