const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
let {people} = require('./data');


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../public')));
// parse form data
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people});
});

app.post('/api/people', (req, res) => {
    const {name} = req.body
    if (!name){
        return res.status(400).json({success: false, msg: 'Name is required'});
    }
    res.status(201).json({success: true, person: name});
});

app.post('/login', (req, res) => {
    const {name} = req.body
    if (name){
        return res.status(200).send('Welcome ' + name);
    }
    res.status(401).send('Please enter your name');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000.....');
});