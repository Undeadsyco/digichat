//Routers
const router = require("express").Router();
// Database Controllers
const { RequestController } = require("../../controllers");

router.get('/outgoing', RequestController.getOutgoing);

router.get('/incoming', RequestController.getIncoming);

router.get('/send/:id', RequestController.sendRequest);

router.get('/accept/:id', RequestController.acceptRequest);

router.get('/reject/:id', RequestController.rejectRequest);

router.get('/confirm/:id', RequestController.confirmRequest);

router.get('/delete/:id', RequestController.deleteRequest);

module.exports = router;