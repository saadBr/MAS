const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
router.post("",checkAuth,extractFile,articleController.createArticle);
router.get("",articleController.getArticles);
router.get("/:id",articleController.getArticle);
router.delete("/:id",checkAuth,articleController.deleteArticle);
router.put("/:id",checkAuth,extractFile,articleController.updateArticle);

module.exports = router;

