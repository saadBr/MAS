const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsor');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,sponsorController.createSponsor);
router.get("",sponsorController.getSponsors);
router.get("/:id",sponsorController.getSponsor);
router.delete("/:id",checkAuth,sponsorController.deleteSponsor);
router.put("/:id",checkAuth,extractFile,sponsorController.updateSponsor);

module.exports = router;

