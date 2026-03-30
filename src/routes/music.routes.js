const express = require('express');
const router = express.Router();
const multer = require('multer');
const musicController = require('../controllers/music.controllers');
const authMiddleware  = require('../middleware/auth.middleware');

// Multer with memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Route
router.post('/upload', authMiddleware.authartist, upload.single('music'), musicController.createMusic);
router.post('/album', authMiddleware.authartist, musicController.addMusicToAlbum);
router.get('/',authMiddleware.authuser, musicController.getMusic);
router.get('/album',authMiddleware.authuser, musicController.getAlbums);
router.get('/album/:id',authMiddleware.authuser, musicController.getAlbumById);

module.exports = router;