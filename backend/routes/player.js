const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,playerController.createPlayer);
router.get("",playerController.getPlayers);
router.get("/:id",playerController.getPlayer);
router.delete("/:id",checkAuth,playerController.deletePlayer);
router.put("/:id",checkAuth,extractFile,playerController.updatePlayer);

module.exports = router;

