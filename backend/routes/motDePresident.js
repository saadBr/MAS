const express = require('express');
const router = express.Router();
const motDePresidentController = require('../controllers/motDePresident');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.get("/:id",motDePresidentController.getMotDePresident);
router.put("/:id",checkAuth,extractFile,motDePresidentController.updateMotDePresident);

module.exports = router;

