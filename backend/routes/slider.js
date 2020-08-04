const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/slider');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,sliderController.createSlider);
router.get("",sliderController.getSliders);
router.get("/:id",sliderController.getSlider);
router.delete("/:id",checkAuth,sliderController.deleteSlider);
router.put("/:id",checkAuth,extractFile,sliderController.updateSlider);

module.exports = router;

