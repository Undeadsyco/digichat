//Routers
const router = require("express").Router();
const friendsRouter = require("./friends");
const requestsRouter = require("./requests");
const blockRouter = require("./block");
// Database Controllers
const UserController = require("../../controllers/UserContoller");

router.use('/friends', friendsRouter);

router.use('/requests', requestsRouter);

router.use('/block', blockRouter);

router.route('/').get(UserController.getUsers);

router.route('/:userId').get(UserController.getUserById);

module.exports = router;
