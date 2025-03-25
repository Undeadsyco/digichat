const Controller = require('./Controller');

module.exports = class CommentController extends Controller {
  static async #getCommentById(id, populate = false) { }

  static async #getAllComments(filters = {}) {
    return await CommentController.commentModel.findAll({
      where: filters,
      include: {
        association: 'author',
        attributes: ['userId', 'userName'],
      }
    });
  }

  static async getAllComments(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const comments = await CommentController.#getAllComments({ postId: req.params.postId });
      res.header('Content-Type', 'application/json');
      res.status(200).send({ comments });
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
  static async createComment(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const { postId, body } = req.body;
      const comment = await CommentController.commentModel.create(
        { postId, authorId: req.token.userId, body },
      );
      const author = await comment.getAuthor({
        attributes: ['userId', 'userName'],
      });
      console.log(author)
      res.status(201).send({ comment: { ...comment.dataValues, author: author.dataValues } });
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
  static async deleteComment(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const comment = await CommentController.commentModel.findByPk(req.params.commentId);
      if (!comment) throw new Error('Comment not found');

      if (comment.authorId !== req.token.userId) throw new Error('Unauthorized');
      
      await comment.destroy();
      res.status(200).end();
    } catch (error) {
      next({ error });
    }
  }
}