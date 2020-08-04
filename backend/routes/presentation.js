const express = require('express');
const router = express.Router();
const presentationController = require('../controllers/presentation');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.get("/:id",presentationController.getPresentation);
router.put("/:id",checkAuth,extractFile,presentationController.updatePresentation);

module.exports = router;

