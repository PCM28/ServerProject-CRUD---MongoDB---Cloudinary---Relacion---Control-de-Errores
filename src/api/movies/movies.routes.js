const express = require('express');
const upload = require('../../utils/middlewares/uploadFile.middleware');
const router = express.Router();
const {getAllMovies, getMovie, postMovie, putMovie, deleteMovie} = require('./movies.controller');

router.get('/', getAllMovies);
router.get('/:id', getMovie);
router.post('/new', upload.single('photo'), postMovie);
router.put('/edit/:id', upload.single('photo'), putMovie);
router.delete('/delete/:id', deleteMovie);

module.exports = router;