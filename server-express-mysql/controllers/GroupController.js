/**
 * @typedef {Object} group
 * @property {number} groupId
 * @property {string} name
 * @property {string} description
 * @property {number} likes
 * @property {number} dislikes
 * @property {boolean} private
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const { Op } = require('sequelize');
const Controller = require('./Controller');
const { groupAssociations } = require('./associationObjs');

module.exports = class GroupController extends Controller {
  static #ownerAssociations = {
    association: 'owner',
    attributes: ['userId', 'userName'],
  }

  /**
   * 
   * @param {group} group 
   * @returns 
   */
  static #createGroup = async (group) => await GroupController.groupModel.create(group);

  /**
   * @property {group} [filters]
   * @returns {Promise<group[]>}
   */
  static #getAll = async (filters = {}) => await GroupController.groupModel.findAll({
    where: { ...filters },
    include: [GroupController.#ownerAssociations]
  });

  /**
   * @param {group} filter
   * @returns {Promise<group[]>}
   */
  static #getOne = async (filters = {}) => await GroupController.groupModel.find({
    where: { ...filters },
    include: [GroupController.#ownerAssociations]
  });

  /**
   * @param {number} id 
   * @returns {Promise<group>}
   */
  static #getById = async (id) => await GroupController.groupModel.findByPk(id, {
    include: [GroupController.#ownerAssociations]
  });

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async createGroup(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const group = await GroupController.#createGroup({
        ...req.body,
        ownerId: req.token.userId
      });

      const owner = await group.getOwner();

      if (!group) throw new Error("Group not created");

      res.hasHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ group: { ...group.dataValues, owner, membershipCount: 1, postCount: 0 } }));
    } catch (error) {
      next({ error });
    }
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async getAllGroups(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const relatedUsersIds = [
        // friendIds
        ...(await Controller.getFriendsIds(req.token.userId)),
        // friendOfIds
        ...(await Controller.getFriendsOfFriendsIds(req.token.userId)),
      ].filter((id) => id !== req.token.userId);

      const blockedUsersIds = [
        // blockedByIds
        ...(await Controller.getBlockedUsersIds(req.token.userId)),
        // blockedIds
        ...(await Controller.getBlockingUsersIds(req.token.userId)),
      ];

      const groupData = [];

      // groups owned by user
      groupData.push(...(await GroupController.#getAll({ ownerId: req.token.userId })))
      // public and private groups owned by friends or friends of friends
      const friendsGroups = await GroupController.groupModel.findAll({
        where: { ownerId: { [Op.in]: relatedUsersIds } },
        include: [GroupController.#ownerAssociations],
        limit: 10,
      })
      groupData.push(...friendsGroups);
      // public groups owned by non-blocked/blocking and non-related users
      groupData.push(...(await GroupController.groupModel.findAll({
        where: {
          [Op.and]: {
            groupId: { [Op.notIn]: friendsGroups.map((group) => group.groupId) },
            privacy: false,
            ownerId: { [Op.notIn]: [...relatedUsersIds, ...blockedUsersIds, req.token.userId] }
          }
        },
        include: [GroupController.#ownerAssociations],
        limit: 20 - friendsGroups.length,
      })));

      const groups = [];

      for (const group of groupData) {
        const memberCount = await group.countMembers();
        const adminCount = await group.countAdmins();
        const postCount = await group.countPosts();

        groups.push({ ...group.dataValues, membershipCount: memberCount + adminCount + 1, postCount });
      }

      if (!groups) throw new Error("Groups not found");

      res.hasHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ groups }));
    } catch (error) {
      next({ error });
    }
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async getGroup(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const group = await GroupController.#getById(req.params.groupId, true);

      if (!group) throw new Error("Group not found");

      res.hasHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ group }));
    } catch (error) {
      next({ error });
    }
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async updateGroup(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const group = await GroupController.#getById(req.params.groupId);
      if (group.ownerId !== req.token.userId) throw new Error("Unauthorized");

      const updatedGroup = await group.update(req.body);

      if (!updatedGroup) throw new Error("Group not updated");

      res.status(200).send();
    } catch (error) {
      next({ error });
    }
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async deleteGroup(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const group = await GroupController.#getById(req.params.groupId);
      if (group.ownerId !== req.token.userId) throw new Error("Unauthorized");

      const deletedGroup = await group.destroy();

      if (!deletedGroup) throw new Error("Group not deleted");

      res.status(200).send();
    } catch (error) {
      next({ error });
    }
  }
}