const express = require('express');
const router = express.Router();
const {getAllCinemas, getCinema, postCinema, putCinema, deleteCinema} = require('./cinema.controller');

router.get('/', getAllCinemas);
router.get('/:id', getCinema);
router.post('/new', postCinema);
router.put('/edit/:id', putCinema);
router.delete('/delete/:id', deleteCinema);

module.exports = router;