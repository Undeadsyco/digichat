/* jshint indent: 2 */

/**
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns {import("sequelize").ModelStatic<any>}
 */
module.exports = (sequelize, DataTypes) => sequelize.define('group', {
  groupId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    references: {
      model: 'user',
      key: 'userId'
    }
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  privacy: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: '0',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, { tableName: 'group', timestamps: true, underscored: true });
