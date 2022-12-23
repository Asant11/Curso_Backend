import {Router} from 'express'
import ProductManager from '../manager/productManager.js'

const router = Router()
const productManager = new ProductManager('products.json')

router.get('/', async (req, res) =>{
    const products = await productManager.get()
    const limit = req.query.limit
    if (!limit) {res.send({products})}
    else {
        const productLimit = [];
        if (productLimit > products.length) productLimit = products.length;
        for (let i = 0; i < limit; i++) {
            productLimit.push(products[i]);
        }
        res.send({productLimit})
    }
})

router.get('/:pid', async (req, res) => {
    const id = req.params.pid
    const product = await productManager.getById(id)
    res.send({product})
})

router.post('/', async (req, res) =>{
    const product = req.body
    const addedProduct = await productManager.add(product)
    
    res.json({status:'success', addedProduct})
})

router.put('/:pid', async (req, res) =>{
    const id = parseInt(req.params.pid) 
    const toUpdateProduct = req.body

    const product = await productManager.getById(id)
    if(!product) return res.status(404).send('Product not found!!!')
    
    for (const key of Object.keys(toUpdateProduct)) {
        product[key] = toUpdateProduct[key]
    }

    const updatedProduct = await productManager.update(id, product)
    
    res.json({status:'success', updatedProduct})
})

router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const deleteProduct =  await productManager.delete(id)
    res.json({status:'success', deleteProduct})
})


export default router