const express = require('express');
const router = express.Router();
const comiteController = require('../controllers/comite');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,comiteController.createComite);
router.get("",comiteController.getComites);
router.get("/:id",comiteController.getComite);
router.delete("/:id",checkAuth,comiteController.deleteComite);
router.put("/:id",checkAuth,extractFile,comiteController.updateComite);

module.exports = router;

