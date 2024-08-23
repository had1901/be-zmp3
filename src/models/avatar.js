'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Avatar.belongsTo(models.User, { foreignKey: 'userId' })

    }
  }
  Avatar.init({
    userId:  {
      type: DataTypes.INTEGER,
      references: {
          model: 'User', // Tên bảng mà khóa ngoại liên kết đến
          key: 'id' // Tên cột khóa chính trong bảng liên kết
        }
    }, // added new column 18/8/2024
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Avatar',
    tableName: 'Avatar', // added tableName
  })
 
  return Avatar;
};
