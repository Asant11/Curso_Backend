const express = require('express')
const fs = require('fs')
const fileName = "../../Desafio2/products.json"
const format = "utf-8"
const products = fs.readFileSync(fileName, format)
const parsedProducts = JSON.parse(products)

const app = express()

app.get('/products', (req, res) =>{
    const limit = req.query.limit
    if(limit) {
        res.send(parsedProducts.slice(0, limit))
    }
    else{
        res.send(parsedProducts)
    }
})

app.get('/products/:pid', (req, res) =>{
    const pID = req.params.pid
    
    const findProduct = parsedProducts.find(product => product.id == pID);

    !findProduct ? res.send("<h1>ERROR: The product doesn't exists!!</h1>") : res.send(findProduct);
})



app.listen(8080, () =>{
    console.log('Corriendo el servidor...');
})