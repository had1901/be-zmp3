'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Avatar', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'User', // Tên bảng mà khóa ngoại liên kết đến
        key: 'id' // Tên cột khóa chính trong bảng liên kết
      },
      onDelete: 'CASCADE', // Tùy chọn: Xóa Avatar nếu User bị xóa
      onUpdate: 'CASCADE'  // Tùy chọn: Cập nhật Avatar nếu User ID bị thay đổi
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Avatar', 'userId')
  }
};
