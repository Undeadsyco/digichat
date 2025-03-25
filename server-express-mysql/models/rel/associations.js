/** 
 * @typedef {Object} models
 * @property {import('sequelize').ModelStatic<any>} user
 * @property {import('sequelize').ModelStatic<any>} relationship
 * @property {import('sequelize').ModelStatic<any>} group
 * @property {import('sequelize').ModelStatic<any>} membership
 * @property {import('sequelize').ModelStatic<any>} post
 * @property {import('sequelize').ModelStatic<any>} comment
 * @property {import('sequelize').ModelStatic<any>} rection
 * @property {import('sequelize').ModelStatic<any>} request
 * 
 * 
 * @param {models} models 
 */
module.exports = associations = (models) => {
  // =========================================
  models.user.hasMany(models.group, { as: 'groups', foreignKey: 'ownerId' });
  models.group.belongsTo(models.user, { as: 'owner', foreignKey: 'ownerId' });

  // user group membership association
  models.user.belongsToMany(models.group, {
    through: models.membership,
    as: 'memberships',
    foreignKey: 'userId',
    otherKey: 'groupId'
  });

  models.group.belongsToMany(models.user, {
    through: {
      model: models.membership,
      scope: { role: 'member' }
    },
    as: 'members',
    foreignKey: 'groupId',
    otherKey: 'userId'
  });
  models.group.belongsToMany(models.user, {
    through: {
      model: models.membership,
      scope: { role: 'admin' }
    },
    as: 'admins',
    foreignKey: 'groupId',
    otherKey: 'userId'
  });

  // =========================================

  // group-to-posts association
  models.group.hasMany(models.post, { foreignKey: 'groupId' });
  models.post.belongsTo(models.group, { foreignKey: 'groupId' });

  // =========================================
  // relationship-to-user association
  models.relationship.belongsTo(models.user, { as: 'register', foreignKey: 'registerId', onDelete: 'CASCADE' });
  models.relationship.belongsTo(models.user, { as: 'addressee', foreignKey: 'addresseeId', onDelete: 'CASCADE' });

  // user-to-relationships association
  models.user.hasMany(models.relationship, { as: 'relationships', foreignKey: 'registerId', constraints: false });
  // user-to-user relationships association
  models.user.belongsToMany(models.user, {
    through: {
      model: models.relationship,
    },
    as: 'friends',
    foreignKey: 'registerId',
    otherKey: 'addresseeId',
  });

  // =========================================

  // user posts association
  models.user.hasMany(models.post, { as: 'posts', foreignKey: 'authorId' });
  models.post.belongsTo(models.user, { as: 'author', foreignKey: 'authorId', });

  // =========================================

  // user comments association
  models.user.hasMany(models.comment, { as: 'comments', foreignKey: 'authorId' });
  models.comment.belongsTo(models.user, { as: 'author', foreignKey: 'authorId' });

  // =========================================

  // post-to-comments association
  models.post.hasMany(models.comment, { as: 'comments', foreignKey: 'postId' });
  models.comment.belongsTo(models.post, { as: 'post', foreignKey: 'postId' });

  // =========================================
  // user-to-requests association
  models.request.belongsTo(models.user, { as: 'register', foreignKey: 'registerId', onDelete: 'CASCADE', constraints: false });
  models.user.hasMany(models.request, { as: 'outgoing', foreignKey: 'registerId' });

  models.request.belongsTo(models.user, { as: 'addressee', foreignKey: 'addresseeId', onDelete: 'CASCADE', constraints: false });
  models.user.hasMany(models.request, { as: 'incoming', foreignKey: 'addresseeId' });

  // user-to-user request association
  models.user.belongsToMany(models.user, {
    through: models.request,
    as: 'requests',
    foreignKey: 'registerId',
    otherKey: 'addresseeId'
  });
  models.user.belongsToMany(models.user, {
    through: models.request,
    as: 'requesters',
    foreignKey: 'addresseeId',
    otherKey: 'registerId'
  });

  // =========================================
  // group requests association
  models.request.belongsTo(models.group, { as: 'group', foreignKey: 'groupId' });
  models.group.hasMany(models.request, { as: 'requests', foreignKey: 'groupId' });

  // =========================================
  // block-to-user association
  models.block.belongsTo(models.user, { as: 'register', foreignKey: 'registerId', onDelete: 'CASCADE' });
  models.block.belongsTo(models.user, { as: 'addressee', foreignKey: 'addresseeId', onDelete: 'CASCADE' });

  // user-to-block association
  models.user.hasMany(models.block, { foreignKey: 'registerId', constraints: false });
  models.user.hasMany(models.block, { foreignKey: 'addresseeId', constraints: false });

  // user-to-user block association
  models.user.belongsToMany(models.user, {
    through: models.block,
    as: 'blocking',
    foreignKey: 'registerId',
    otherKey: 'addresseeId'
  });
  models.user.belongsToMany(models.user, {
    through: models.block,
    as: 'blocked',
    foreignKey: 'registerId',
    otherKey: 'addresseeId'
  });
}