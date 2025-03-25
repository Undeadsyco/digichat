/**
 * @typedef {Object} relationships
 * @property {number} registerId
 * @property {number} addresseeId
 * @property {string} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const Controller = require('./Controller');

module.exports = class FriendController extends Controller {
  static async #getAll(filters = {}) {
    return await FriendController.relationshipModel.findAll({ where: filters });
  }

  static async #getOne(filters = {}) {
    return await FriendController.relationshipModel.findOne({ where: filters });
  }

  static async #createOne(relation) {
    return await FriendController.relationshipModel.create(relation);
  }

  static async #createMany(relations) {
    return await FriendController.relationshipModel.bulkCreate(relations);
  }

  static async #updateOne(relation, filters) {
    return await FriendController.relationshipModel.update(relation, { where: filters });
  }

  static async #deleteOne(filters) {
    return await FriendController.relationshipModel.destroy({ where: filters });
  }



  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async getFriends(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const relationships = (await FriendController.relationshipModel.findAll({
        where: { registerId: req.token.userId, },
        include: [
          {
            model: FriendController.userModel,
            as: 'addressee',
            attributes: ["userId", "userName", ]
          },
        ],
      })).map((relationship) => { return ({ ...relationship.addressee.dataValues, createdAt: relationship.createdAt }); });
      res.status(200).send({ relationships });
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
  static async createFriendship(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const [register, addressee] = await FriendController.#createMany([
        { registerId: req.token.userId, addresseeId: req.params.addresseeId },
        { registerId: req.params.addresseeId, addresseeId: req.token.userId }
      ]);

      if (!register || !addressee) throw new Error('relationship not created');
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
  static async deleteFriendship(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const friend = await FriendController.#deleteOne(
        { registerId: req.token.userId, addresseeId: req.params.addresseeId }
      )
      const accept = await FriendController.#deleteOne(
        { registerId: req.params.addresseeId, addresseeId: req.token.userId }
      )
      if (!friend || !accept) throw new Error('Friend request not rejected');

      res.redirect(`../../requests/delete/${req.params.addresseeId}`);
    } catch (error) {
      next({ error });
    }
  }
}