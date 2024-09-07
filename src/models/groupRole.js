'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Group_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Group_Role.init({
    groupId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Group_Role',
    tableName: 'group_role',
  });
  
  return Group_Role;
};


// (async () => {
//   await sequelize.sync({ force: true }); // Đồng bộ hóa model với cơ sở dữ liệu
//   console.log(User === sequelize.models.User); // Kiểm tra xem model có khớp không
// })()
