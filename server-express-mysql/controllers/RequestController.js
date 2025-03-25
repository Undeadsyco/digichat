const Controller = require("./Controller");

module.exports = class RequestController extends Controller {

  static async #getAll(filters = {}) {
    return await RequestController.requestModel.findAll({ where: filters });
  }

  static async #getOne(filters = {}) {
    return await RequestController.requestModel.findOne({ where: filters });
  }

  static async #createOne(relation) {
    return await RequestController.requestModel.create(relation);
  }

  static async #createMany(relations) {
    return await RequestController.requestModel.bulkCreate(relations);
  }

  static async #updateOne(relation, filters) {
    return await RequestController.requestModel.update(relation, { where: filters });
  }

  static async #deleteOne(filters) {
    return await RequestController.requestModel.destroy({ where: filters });
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async sendRequest(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      let [request, created] = [];

      if (req.baseUrl.includes('user')) [request, created] = await RequestController.requestModel.findOrCreate({
        where: { registerId: req.token.userId, addresseeId: req.params.id },
        defaults: { registerId: req.token.userId, addresseeId: req.params.id }
      });

      if (req.baseUrl.includes('group')) [request, created] = await RequestController.requestModel.findOrCreate({
        where: { registerId: req.token.userId, groupId: req.params.id },
        defaults: { registerId: req.token.userId, groupId: req.params.id }
      });

      if (!created) throw new Error('Friend request not sent');
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
  static async getOutgoing(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      // Outgoing Requests
      const outgoing = (await RequestController.requestModel.findAll({
        where: { registerId: req.token.userId, status: 'pending', active: true },
        include: {
          model: RequestController.userModel,
          as: 'addressee',
          attributes: ['userId', 'userName']
        },
        attributes: ['status', 'createdAt'],
      })).map(request => ({
        ...request.addressee.dataValues,
        status: request.dataValues.status,
        createdAt: request.dataValues.createdAt,
      }));

      res.status(200).send({ outgoing });
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
  static async getIncoming(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      // Incoming Requests
      const incoming = (await RequestController.requestModel.findAll({
        where: { addresseeId: req.token.userId, active: true },
        include: {
          model: RequestController.userModel,
          as: 'register',
          attributes: ['userId', 'userName']
        },
        attributes: ["status", "createdAt"]
      })).map(request => ({
        ...request.register.dataValues,
        status: request.dataValues.status,
        createdAt: request.dataValues.createdAt,
      }));

      res.status(200).send({ incoming });
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
  static async acceptRequest(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      let request = null;
      let updated = 0;
      let path = '';

      if (req.baseUrl.includes('user')) {
        path = 'friends';
        request = await RequestController.#getOne({
          registerId: req.params.id,
          addresseeId: req.token.userId,
        });
        if (!request) throw new Error('Request not found');

        updated = await RequestController.#updateOne(
          { registerId: req.token.userId, addresseeId: req.params.id, status: 'accepted' },
          { registerId: req.params.id, addresseeId: req.token.userId }
        );
      }

      if (req.baseUrl.includes('group')) {
        path = 'memberships'
        request = await RequestController.#getOne({
          registerId: req.token.userId,
          groupId: req.params.id
        });
        if (!request) throw new Error('Request not found');

        updated = await RequestController.#updateOne(
          { status: 'accepted' },
          { registerId: req.token.userId, groupId: req.params.id }
        );
      }

      if (!updated) throw new Error('Request not accepted');
      res.redirect(`../../${path}/create/${req.params.id}`);
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
  static async rejectRequest(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      let request = null;
      let updated = 0;

      if (req.baseUrl.includes('user')) {
        request = await RequestController.#getOne({
          registerId: req.params.id,
          addresseeId: req.token.userId,
        });

        if (!request) throw new Error('Request not found');
        updated = await RequestController.#updateOne(
          { registerId: req.token.userId, addresseeId: req.params.id, status: 'rejected' },
          { registerId: req.params.id, addresseeId: req.token.userId, }
        );
      }

      if (req.baseUrl.includes('group')) {
        request = await RequestController.#getOne({
          registerId: req.token.userId,
          groupId: req.params.id
        });

        if (!request) throw new Error('Request not found');
        updated = await RequestController.#updateOne(
          { status: 'rejected' },
          { registerId: req.token.userId, groupId: req.params.id }
        );
      }

      if (!updated) throw new Error('Request not rejected');
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
  static async confirmRequest(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      let request = null;
      let updated = 0;

      if (req.baseUrl.includes('user')) {
        request = await RequestController.#getOne({
          registerId: req.params.id,
          addresseeId: req.token.userId,
        });
        if (!request) throw new Error('Request not found');

        updated = await RequestController.#updateOne(
          { registerId: req.token.userId, addresseeId: req.params.id, active: 0 },
          { registerId: req.params.id, addresseeId: req.token.userId }
        );
      }

      if (req.baseUrl.includes('group')) {
        request = await RequestController.#getOne({
          registerId: req.token.userId,
          groupId: req.params.id
        });
        if (!request) throw new Error('Request not found');

        updated = await RequestController.#updateOne(
          { active: 0 },
          { registerId: req.token.userId, groupId: req.params.id }
        );
      }

      if (!updated) throw new Error('Request not rejected');
      res.status(200).send({ status: request.dataValues.status });
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
  static async deleteRequest(req, res, next) {
    if (!req.token) res.redirect("/login");
    let request = null;
    let deleted = 0;
    try {
      if (req.baseUrl.includes('user')) {
        request = await RequestController.#getOne({
          registerId: req.token.userId,
          addresseeId: req.params.id,
        });

        if (!request) throw new Error('Request not found');
        deleted = await RequestController.#deleteOne({
          registerId: req.token.userId,
          addresseeId: req.params.id,
        });
      }

      if (req.baseUrl.includes('group')) {
        request = await RequestController.#getOne({
          registerId: req.token.userId,
          groupId: req.params.id,
        });

        if (!request) throw new Error('Request not found');
        deleted = await RequestController.#deleteOne({
          registerId: req.token.userId,
          groupId: req.params.id,
        });
      }

      if (!deleted) throw new Error('Request not deleted');
      res.status(200).send();
    } catch (error) {
      next({ error });
    }
  }
}