const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,photoController.createPhoto);
router.get("",photoController.getPhotos);
router.get("/:id",photoController.getPhoto);
router.delete("/:id",checkAuth,photoController.deletePhoto);
router.put("/:id",checkAuth,extractFile,photoController.updatePhoto);

module.exports = router;

