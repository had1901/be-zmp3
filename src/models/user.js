'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    //  */
    
    static associate(models) {
      User.belongsTo(models.Group, { foreignKey: 'groupID' })
      User.hasOne(models.Avatar, { foreignKey: 'userId' })
    }
  }
  User.init({
    groupID: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Group', // Tên bảng mà khóa ngoại liên kết đến
          key: 'id' // Tên cột khóa chính trong bảng liên kết
        }
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  });
  return User;
};





