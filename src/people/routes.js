const express = require('express');
const router = express.Router();
const { createPerson, getPeople, updatePerson, deletePerson } = require('../controllers/peopleController');

router.get('/',  getPeople);

router.post('/', createPerson);

router.put('/:id', updatePerson);

router.delete('/:id', deletePerson);

module.exports = router;
