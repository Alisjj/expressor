const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const peopleRoutes = require('./people/routes');

app.use('/api/people', peopleRoutes);


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../public')));
// parse form data
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.listen(8000, () => {
    console.log('Server is running on port 8000.....');
});