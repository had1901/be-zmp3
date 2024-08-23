'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.User, { foreignKey: 'groupID' }) 
      Group.belongsToMany(models.Role, { through: 'Group_Role' })
    }
  }
  Group.init({ 
    group_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'Group',
  });
  
  return Group;
};


// (async () => {
//   await sequelize.sync({ force: true }); // Đồng bộ hóa model với cơ sở dữ liệu
//   console.log(User === sequelize.models.User); // Kiểm tra xem model có khớp không
// })()
