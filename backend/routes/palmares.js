const express = require('express');
const router = express.Router();
const palmaresController = require('../controllers/palmares');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.get("/:id",palmaresController.getPalmares);
router.put("/:id",checkAuth,extractFile,palmaresController.updatePalmares);

module.exports = router;

