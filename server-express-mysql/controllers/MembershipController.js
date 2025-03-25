/**
 * @typedef {Object} membership
 * @property {number} groupId
 * @property {number} userId
 * @property {('owner','admin','member')} role
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const Controller = require("./Controller");

module.exports = class MembershipController extends Controller {

  static async #getAll(filters = {}, populate = false) {
    return await MembershipController.membershipModel.findAll({
      where: filters,
    });
  }

  static async #getOne(filters = {}, populate = false) {
    return await MembershipController.membershipModel.findOne({
      where: filters,
    });
  }

  static async #createOne(membership) {
    return await MembershipController.membershipModel.create(membership);
  }

  static async #updateOne(membership, filters) {
    return await MembershipController.membershipModel.update(membership, { where: filters });
  }

  static async #deleteOne(filters) {
    return await MembershipController.membershipModel.destroy({ where: filters });
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async joinGroup(req, res, next) {
    if (!req.token) next({ error: new Error('Unauthorized') });
    try {
      const membership = await MembershipController.#createOne({
        groupId: req.params.groupId,
        userId: req.token.userId,
      });

      if (!membership) throw new Error('Membership not created');

      res.status(201).send();
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
  static async removeUser(req, res, next) {
    if (!req.token) next({ error: new Error('Unauthorized') });
    try {
      const membership = await MembershipController.#deleteOne({
        groupId: req.params.groupId,
        userId: req.params.userId,
      });

      if (!membership) throw new Error('Membership not removed');

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
  static async updateRole(req, res, next) {
    if (!req.token) next({ error: new Error('Unauthorized') });
    try {
      const membership = await MembershipController.#updateOne({
        role: req.body.role,
      }, {
        groupId: req.params.groupId,
        userId: req.params.userId,
      });

      if (!membership) throw new Error('Membership not updated');

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
  static async transferOwnership(req, res, next) {
    if (!req.token) next({ error: new Error('Unauthorized') });
    try {
      const group = await require('../models/index').group.update(
        { ownerId: req.params.userId },
        { where: { groupId: req.params.groupId } }
      );

      if (!group) throw new Error('Ownership not transferred');

      const membership = await MembershipController.#updateOne({
        userId: req.token.userId,
      }, {
        groupId: req.params.groupId,
        userId: req.params.userId,
      });

      if (!membership) throw new Error('Was unable to add old owner to admin role');

      res.status(200).send();
    } catch (error) {
      next({ error });
    }
  }
}