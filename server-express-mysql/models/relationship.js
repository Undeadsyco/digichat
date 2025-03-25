/**
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns {import("sequelize").ModelStatic<any>}
 */
module.exports = (sequelize, DataTypes) => sequelize.define('relationship', {
  status: {
    type: DataTypes.ENUM('friends','family','colleagues','acquaintances','bestFriends'),
    allowNull: false,
    defaultValue: 'friends'
  },
  active: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: '1'
  },
}, { tableName: 'relationship', timestamps: true, underscored: true, primaryKey: false });