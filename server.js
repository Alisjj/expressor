const express = require('express');
const app = express();
const { products } = require('./data')

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1> <a href="/api/products">Products</a>');
});

app.get('/api/products', (req, res) => {
    const newProducts = products.map(product => {
        const {id, name, image} = product;
        return {id, name, image};
    });
    res.json(
        newProducts
    )
});

app.get('/api/products/:productID', (req, res) => {
    const productID = req.params.productID;
    const singleProducts = products.find(product => product.id === Number(productID) );
    if(!singleProducts){
        return res.status(404).send('Product does not exist');  
    }
    res.json(
        singleProducts
    );
});

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    res.send(req.params)
});

app.get('/api/v1/products/query', (req, res) => {
    const {search, limit} = req.query;
    let sortedProducts = [...products];

    if(search){
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);

        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    if(sortedProducts.length < 1){
        return res.status(200).json([{"success": true,"details": "No products match your search"}]);
    }

    res.status(200).json(sortedProducts); 

});

app.listen(8000, () => {
    console.log('Server is listening on port 8000....');
});
