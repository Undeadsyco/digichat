const { TokenExpiredError } = require("jsonwebtoken");
const { signUser, verifyUser } = require("../services/auth");

module.exports = {
  /**
  * 
  * @param {{ error: Error, user: import("../controllers/UserContoller").user }} passedObjs
  * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
  * @param {import("express").Response<any, Record<string, any>, number>} res 
  * @param {import("express").NextFunction} next 
  */
  signToken: ({ error, user }, req, res, next) => {
    if (error) next({ error });
    try {
      const { userId, email, password, admin } = user;
      const token = signUser({ userId, email, password, admin });
      if (!token) throw new Error("Token not created");

      res.cookie('jwt', token);
      res.status(200).send({ user: { ...user, password: undefined } });
    } catch (error) {
      next({ error });
    }
  },
  /**
  * 
  * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
  * @param {import("express").Response<any, Record<string, any>, number>} res 
  * @param {import("express").NextFunction} next 
  */
  decodeToken: (req, res, next) => {
    try {
      const cookie = req.cookies.jwt
      if (!cookie) {
        res.redirect("/login");
        return;
      }

      const token = verifyUser(cookie);
      if (!token) {
        res.redirect("/login");
        return;
      }

      req.token = token;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.clearCookie('jwt');
        res.redirect('/api/logout');
      } else next({ error });
    }
  }
}