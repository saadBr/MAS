const express = require('express');
const router = express.Router();
const coupeController = require('../controllers/coupe');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,coupeController.createCoupe);
router.get("",coupeController.getCoupes);
router.get("/:id",coupeController.getCoupe);
router.delete("/:id",checkAuth,coupeController.deleteCoupe);
router.put("/:id",checkAuth,extractFile,coupeController.updateCoupe);

module.exports = router;

