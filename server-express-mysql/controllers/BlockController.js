const Controller = require("./Controller");

module.exports = class BlockController extends Controller {

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async blockUser(req, res, next) {
    if (!req.token) res.redirect("/login");
    try {
      const block = await BlockController.blockModel.create({
        registerId: req.token.userId,
        addresseeId: req.params.id
      });
      if (!block) throw new Error("Failed to block user");

      res.status(200).json(block);
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
  static async unblockUser(req, res) {
    if (!req.token) res.redirect("/login");
    try {
      const block = await BlockController.blockModel.findOne({
        where: { registerId: req.token.userid, addresseeId: req.params.id }
      });

      if (!block) throw new Error("Block not found");
      await block.destroy();
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
  static async getBlocks(req, res) {
    if (!req.token) res.redirect("/login");
    try {
      const blocks = await BlockController.blockModel.findAll({ where: { registerId } });
      res.status(200).json(blocks);
    } catch (error) {
      next({ error });
    }
  }
}