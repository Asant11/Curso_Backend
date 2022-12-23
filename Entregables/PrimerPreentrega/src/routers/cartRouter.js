import {Router} from 'express'
import CartManager from '../manager/cartManager.js'

const router = Router()
const cartManager = new CartManager('carts.json')

router.get('/', async (req, res) =>{
    const carts = await cartManager.get()
    res.json({carts})
})

router.get('/:id', async (req, res) =>{
    const id = parseInt(req.params.id ) 
    const cart = await cartManager.getById(id)
    res.json({cart})
})

router.post('/', async (req, res) =>{
    const cartNew = await cartManager.create()
    
    res.json({status:'success', cartNew})
})

router.post('/:cid/product/:pid', async (req, res) =>{
    const cartID = parseInt(req.params.cid) 
    const prodID = parseInt(req.params.pid)

    const cart = await cartManager.addProduct(cartID, prodID)
    
    res.json({status:'success', cart})
})


export default router