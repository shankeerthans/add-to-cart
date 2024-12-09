const express = require('express');
const { products } = require('./data');
const server = express();
const port = 8000;

server.use(express.static('../public'))
server.listen(port, () => [
    console.log('Server is listening to 8000...')
])

server.get('/', (req, res) => {
    res.json(products)
})

