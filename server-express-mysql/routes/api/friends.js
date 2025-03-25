//Routers
const router = require("express").Router();
// Database Controllers
const FriendController = require("../../controllers/FriendController");

router.get('/', FriendController.getFriends);

router.get('/create/:addresseeId', FriendController.createFriendship);

router.get('/delete/:addresseeId', FriendController.deleteFriendship);

module.exports = router;
