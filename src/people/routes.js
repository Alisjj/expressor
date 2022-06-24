const express = require('express');
const router = express.Router();
const { people } = require('../data');


router.get('/', (req, res) => {
    res.status(200).json({success: true, data: people});
});

router.post('/', (req, res) => {
    const {name} = req.body;
    if (!name){
        return res.status(400).json({success: false, msg: 'Name is required'});
    }
    res.status(201).json({success: true, person: [...people ,name]});
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    const person = people.find(person => person.id === Number(id));

    if(!person){
        return res.status(404).json({success: false, msg: `Person with id ${id} not found`});
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)){
            person.name = name
        }
        return person;
    })
    res.status(200).json({success: true, data: newPeople});
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const person = people.find(person => person.id === Number(id));

    if(!person){
        return res.status(404)
        .json({success: false, msg: `Person with id ${id} not found`});
    }


    const newPeople = people.filter(
        (person) => person.id !== Number(id)
        );
    res.status(200).json({success: true, data: newPeople});
});

module.exports = router;
