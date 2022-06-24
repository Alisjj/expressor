const express = require('express');
const app = express();
const authorize = require('./middlewares/authorize');
const morgan = require('morgan');


app.use([morgan('tiny'), authorize]);

app.get('/', (req, res) => {
    res.send("Home")
});

// about
app.get('/about', (req, res) => {
    res.send("About")
});

app.get('/api/products', (req, res) => {
    res.send("Products")
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000....');
});
