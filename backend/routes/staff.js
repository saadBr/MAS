const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,staffController.createStaff);
router.get("",staffController.getStaffs);
router.get("/:id",staffController.getStaff);
router.delete("/:id",checkAuth,staffController.deleteStaff);
router.put("/:id",checkAuth,extractFile,staffController.updateStaff);

module.exports = router;

