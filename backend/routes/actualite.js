const express = require('express');
const router = express.Router();
const actualiteController = require('../controllers/actualite');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,actualiteController.createActualite);
router.get("",actualiteController.getActualites);
router.get("/:id",actualiteController.getActualite);
router.delete("/:id",checkAuth,actualiteController.deleteActualite);
router.put("/:id",checkAuth,extractFile,actualiteController.updateActualite);

module.exports = router;

