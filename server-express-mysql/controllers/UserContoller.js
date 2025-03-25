// Dependencies
const Op = require('sequelize').Op;
// Errors
const { UsersNotFound } = require('../errors/DataBaseErrors');
// Services
const authService = require('../services/auth');
// Associations
const { userAssociations } = require('./associationObjs');

/** 
 * @typedef {Object} user
 * @property {number} userId
 * @property {string} fullName
 * @property {string} email
 * @property {string} userName
 * @property {string} password
 * @property {number} admin
 */

const Controller = require('./Controller')

module.exports = class UserController extends Controller {
  /**
   * 
   * @param {*} filters 
   * @param {*} populate 
   * @returns 
   */
  static async #getAll(filters = {}, populate = false) {
    return await UserController.userModel.findAll({
      where: filters,
      attributes: {
        include: ['userId', 'userName'],
        exclude: ['password'],
      },
    });
  }

  /**
   * 
   * @param {*} filters 
   * @param {*} populate 
   * @returns 
   */
  static async #getOne(filters = {}, populate = false) {
    return await UserController.userModel.findOne({ where: filters });
  }

  /**
   * 
   * @param {*} id 
   * @param {*} populate 
   * @returns 
   */
  static async #getOneById(id, populate = false) {
    return await UserController.userModel.findByPk(id);
  }

  // MiddleWares
  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async getUsers(req, res, next) {
    if (!req.token) next({ error: new Error('Unauthorized') });
    try {
      const includeList = [
        ...(await UserController.getFriendsOfFriendsIds(req.token.userId))
      ];
      const excludeList = [
        req.token.userId,
        ...(await UserController.getFriendsIds(req.token.userId)),
        ...(await UserController.getOutgoingRequestsIds(req.token.userId)),
        ...(await UserController.getIncomingRequestsIds(req.token.userId)),
        ...(await UserController.getBlockedUsersIds(req.token.userId)),
        ...(await UserController.getBlockingUsersIds(req.token.userId)),
      ];

      let users = await UserController.#getAll({
        userId: { [Op.and]: { [Op.in]: includeList, [Op.notIn]: excludeList } }
      });

      if (!users) throw new UsersNotFound();

      if (users.length < 10) users = users.concat(await UserController.userModel.findAll({
        where: { userId: { [Op.notIn]: [...users.map(user => user.userId), ...excludeList] } },
        attributes: { include: ['userId', 'userName'], exclude: ['password'], },
        limit: 10 - users.length,
      }))

      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify({ users: users.map(user => ({ ...user.dataValues })) }));
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
  static async getUserById(req, res, next) {
    if (!req.token) next({ error: new Error('Unauthorized') });
    try {
      const user = await UserController.#getOneById(req.params.userId, true);
      if (!user) throw new UsersNotFound();

      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify({ user: { ...user.dataValues, password: undefined } }));
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
  static async verifyUser(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const user = await UserController.#getOneById(req.token.userId, true);
      if (!user) throw new UsersNotFound();
      if (user.password !== req.token.password) throw new Error('Invalid Token');

      delete user.dataValues.password;

      res.header('Content-Type', 'application/json');
      res.status(200).send({ user });
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
  static async signupUser(req, res, next) {
    try {
      const [user, created] = await UserController.userModel.findOrCreate({
        where: { email: req.body.user.email },
        defaults: { ...req.body.user, password: authService.hashPassword(req.body.user.password) },
      });
      if (!created) throw new Error('Email already in use');

      next({ user });
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
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body.user;
      const user = await UserController.#getOne({ email }, true);
      if (!user) throw new UsersNotFound();

      if (!authService.comparePassword(password, user.password)) throw new Error('Invalid Password');

      next({ user: user.dataValues });
    } catch (error) {
      next({ error });
    }
  }
}