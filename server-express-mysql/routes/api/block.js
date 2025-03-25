const BlockController = require('../../controllers/BlockController');

const router = require('express').Router();

router.get('/create/:id', BlockController.blockUser);

router.get('/delete/:id', BlockController.unblockUser);

router.get('/', BlockController.getBlocks);

module.exports = router;