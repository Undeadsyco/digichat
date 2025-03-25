/**
 * @typedef {import('../../types').PostData} postData
 * @typedef {import('../../types').PostObject} post
 */

const { Op } = require('sequelize');
const Controller = require('./Controller');

module.exports = class PostController extends Controller {
  static #postAssociations = [
    {
      association: 'author',
      attributes: ['userId', 'userName'],
    },
    {
      association: 'comments',
      attributes: ['commentId', 'authorId', 'body', 'createdAt'],
      include: [
        {
          association: 'author',
          attributes: ['userId', 'userName'],
        }
      ]
    }
  ]

  /**
   * 
   * @param {(number|string)} id
   * @returns 
   */
  static async #getPostById(id) {
    return await PostController.postModel.findByPk(id,
      { include: PostController.#postAssociations }
    );
  }

  /**
   * 
   * @param {Object} filters
   * @returns
   */
  static async #getAllPosts(filters = {}) {
    return await PostController.postModel.findAll({
      where: filters,
      include: PostController.#postAssociations
    });
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async getPublicPosts(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const posts = await PostController.#getAllPosts({
        [Op.and]: {
          privacy: '0',
          [Op.or]: {
            groupId: {
              [Op.in]: [
                // owned groups
                ...(await PostController.getOwnedGroupsIds(req.token.userId)),

                // joined groups
                ...(await PostController.getJoinedGroupsIds(req.token.userId)),
              ],
            },
            authorId: {
              [Op.and]: {
                [Op.in]: [
                  // user
                  req.token.userId,
                  // friends
                  ...(await PostController.getFriendsIds(req.token.userId)),

                  // friends of friends
                  ...(await PostController.getFriendsOfFriendsIds(req.token.userId)),
                ],
                [Op.notIn]: [
                  // Blocked Users
                  ...(await PostController.getBlockedUsersIds(req.token.userId)),

                  // blocking users
                  ...(await PostController.getBlockingUsersIds(req.token.userId)),
                ]
              }
            }
          }
        }
      });

      // loop posts to get count of comments
      for (let post of posts) {
        post.dataValues.commentCount = await post.countComments();
      }

      res.hasHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ posts }));
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
  static async createPost(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const { groupId, title, body, privacy } = req.body;
      const post = await PostController.postModel.create({
        authorId: req.token.userId,
        groupId,
        title,
        body,
        privacy: privacy === 'public' ? '0' : '1',
      });
      const author = await post.getAuthor({
        attributes: ['userId', 'userName'],
      });

      if (!post) throw new Error('Post not created');

      res.status(201).send({ post: { ...post.dataValues, author } });
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
  static async editPostBody(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const post = await PostController.#getPostById(req.params.postId);
      if (!post) throw new Error('Post not found');
      if (post.authorId !== req.token.userId) throw new Error('Unauthorized');

      const { body } = req.body;
      post.set({
        body,
        edited: true,
      });
      const update = await post.save();

      res.status(200).end();
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
  static async deletePost(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const post = await PostController.#getPostById(req.params.postId);
      if (!post) throw new Error('Post not found');
      if (post.authorId !== req.token.userId) throw new Error('Unauthorized');

      await post.destroy();
      res.status(200).end();
    } catch (error) {
      next({ error });
    }
  }
}