//Routers
const router = require("express").Router();
const membershipRouter = require("./membership");
const requestsRouter = require("./requests");
// Database Controllers
const GroupController = require("../../controllers/GroupController");

router.use("/membership", membershipRouter);

router.use("/requests", requestsRouter);

router.route('/:groupId')
.get(GroupController.getGroup)
.put(GroupController.updateGroup)
.delete(GroupController.deleteGroup);

router.route('/')
  .get(GroupController.getAllGroups)
  .post(GroupController.createGroup);

module.exports = router;