const express = require('express');
const router = express.Router();
const academieController = require('../controllers/academie');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,academieController.createAcademie);
router.get("",academieController.getAcademies);
router.get("/:id",academieController.getAcademie);
router.delete("/:id",checkAuth,academieController.deleteAcademie);
router.put("/:id",checkAuth,extractFile,academieController.updateAcademie);

module.exports = router;

