'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Group_Role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      groupID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Group', // Tên bảng mà khóa ngoại liên kết đến
          key: 'id' // Tên cột khóa chính trong bảng liên kết
        } 
      },
      roleID:  {
        type: Sequelize.INTEGER,
        references: {
          model: 'Role', // Tên bảng mà khóa ngoại liên kết đến
          key: 'id' // Tên cột khóa chính trong bảng liên kết
        } 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Group_Role')
  }
};
