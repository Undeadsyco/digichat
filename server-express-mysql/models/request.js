/**
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns {import("sequelize").ModelStatic<any>}
 */
module.exports = (sequelize, DataTypes) => sequelize.define('request', {
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  },
  active: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: '1'
  },
}, { tableName: 'request', timestamps: true, underscored: true })
  