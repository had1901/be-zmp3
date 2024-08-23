'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.Group, { through: 'Group_Role' })
    }
  }
  Role.init({
    role_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Role',
  });
  
  return Role;
};


// (async () => {
//   await sequelize.sync({ force: true }); // Đồng bộ hóa model với cơ sở dữ liệu
//   console.log(User === sequelize.models.User); // Kiểm tra xem model có khớp không
// })()
