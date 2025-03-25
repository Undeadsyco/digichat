/**
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns {import("sequelize").ModelStatic<any>}
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('block', {

  }, { tablename: 'block', timestamps: true, underscore: true });
}