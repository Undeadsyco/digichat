const { Op } = require('sequelize');

module.exports = class Controller {
  static userModel = require('../models').user;
  static relationshipModel = require('../models').relationship;
  static requestModel = require('../models').request;
  static blockModel = require('../models').block;

  static postModel = require('../models').post;
  static commentModel = require('../models').comment;

  static groupModel = require('../models').group;
  static membershipModel = require('../models').membership;

  /**
   * gets a list of friends and them maps over them to return user ids
   * @static
   * @async
   * @param {(number|string)} id 
   * @returns {Promise<Array<number>>} 
   * @memberof Controller
   * {@link Controller} 
   */
  static #getFriendsIds = async (id) => {
    return (await Controller.relationshipModel.findAll({
      where: { registerId: id },
      attributes: ['addresseeId']
    })).map(rel => rel.addresseeId);
  }
  static get getFriendsIds() { return Controller.#getFriendsIds; }

  /**
   * gets a list of friends of friends and maps over them to return user ids
   * @static
   * @async
   * @param {(number|string)} id
   * @returns {Promise<Array<number>>}
   * @memberof Controller
   * {@link Controller} 
   */
  static #getFriendsOfFriendsIds = async (id) => {
    return (await Controller.relationshipModel.findAll({
      where: {
        registerId: {
          [Op.in]: [...(await Controller.getFriendsIds(id))]
        }
      },
      attributes: ['addresseeId']
    })).map(rel => rel.addresseeId);
  }
  static get getFriendsOfFriendsIds() { return Controller.#getFriendsOfFriendsIds; }

  /**
   * gets a list of ouotgoing requests and maps over them to return user ids
   * @static
   * @async
   * @param {(number|string)} id 
   * @returns {Promise<Array<number>>}
   * @memberof Controller
   * {@link Controller} 
   */
  static #getOutgoingRequestsIds = async (id) => {
    return (await Controller.requestModel.findAll({
      where: { registerId: id },
      attributes: ['addresseeId']
    })).map(request => request.addresseeId);
  }
  static get getOutgoingRequestsIds() { return Controller.#getOutgoingRequestsIds; }

  /**
   * gets a list of incoming requests and maps over them to return user ids
   * @static
   * @async
   * @param {(number|string)} id 
   * @returns {Promise<Array<number>>}
   * @memberof Controller
   * {@link Controller} 
   */
  static #getIncomingRequestsIds = async (id) => {
    return (await Controller.requestModel.findAll({
      where: { addresseeId: id },
      attributes: ['registerId']
    })).map(request => request.registerId);
  }
  static get getIncomingRequestsIds() { return Controller.#getIncomingRequestsIds; }

  /**
   * gets a list of users blocked by you and maps over them to return user ids
   * @static
   * @async
   * @param {(number|string)} id 
   * @returns {Promise<Array<number>>}
   * @memberof Controller
   * {@link Controller} 
   */
  static #getBlockedUsersIds = async (id) => {
    return (await Controller.blockModel.findAll({
      where: { registerId: id },
      attributes: ['addresseeId']
    })).map(block => block.addresseeId);
  }
  static get getBlockedUsersIds() { return Controller.#getBlockedUsersIds; }

  /**
   * gets a list of users who blocked you and maps over them to return user ids
   * @static
   * @async
   * @param {(number|string)} id 
   * @returns {Promise<Array<number>>}
   * @memberof Controller
   * {@link Controller} 
   */
  static #getBlockingUsersIds = async (id) => {
    return (await Controller.blockModel.findAll({
      where: { addresseeId: id },
      attributes: ['registerId']
    })).map(block => block.registerId);
  }
  static get getBlockingUsersIds() { return Controller.#getBlockingUsersIds; }

  /**
   * gets a list of owned groups and maps over them to return group ids
   * @static
   * @async
   * @param {(number|string)} id
   * @returns {Promise<Array<number>>}
   * @memberof Controller
   * {@link Controller} 
   */
  static #getOwnedGroupsIds = async (id) => {
    return (await Controller.groupModel.findAll({
      where: { ownerId: id },
      attributes: ['groupId']
    })).map(group => group.groupId);
  }
  static get getOwnedGroupsIds() { return Controller.#getOwnedGroupsIds; }

  /**
   * gets a list of joined groups and maps over them to return group ids
   * @static
   * @async
   * @param {(number|string)} id
   * @returns {Promise<Array<number>>}
   * @memberof Controller
   * {@link Controller} 
   */
  static #getJoinedGroupsIds = async (id) => {
    return (await Controller.membershipModel.findAll({
      where: { userId: id },
      attributes: ['groupId']
    })).map(membership => membership.groupId);
  }
  static get getJoinedGroupsIds() { return Controller.#getJoinedGroupsIds; }
}