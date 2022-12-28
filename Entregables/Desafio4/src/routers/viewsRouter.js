import express from 'express'
import io from '../app.js'
import ProductManager from '../manager/productManager.js'

const router = express.Router()
const productManager = new ProductManager('products.json')


router.get('/', (req, res) => {
    const products = productManager.get()

    res.render('home', {products})
})

router.get('/realtimeproducts', async (req, res) =>{
    let products = await productManager.get()


    io.on('connection', socket =>{
        
        console.log('Cliente conectado');

        socket.on('add', async data =>{
            const addedProd = await productManager.add(data)
            products.push(addedProd)
            io.emit('showProds', products)
        })
    
        socket.on('delete', async data => {
            let products = await productManager.get()
            await productManager.delete(data.id)
    
            const filteredProds = products.filter(prod => prod.id != data.id)
            io.emit('showProds', filteredProds)
        })
    })

    

    res.render('realTimeProducts', {products})
})

router.post('/realtimeproducts', async (req, res) => {
    let products = await productManager.get()

    const product = req.body
    const addedProd = await productManager.add(product)
    products.push(addedProd)

    res.json({ status: "success", addedProd })
    io.emit('showProds', products)    
})

router.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = req.params.pid
    const products = await productManager.get()
    await productManager.delete(pid)
    
    res.send({status: "success", message: "Product deleted successfully"})
    io.emit('shows', products)
})



export default router