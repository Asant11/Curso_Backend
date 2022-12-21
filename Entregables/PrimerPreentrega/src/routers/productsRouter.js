import {Router} from 'express'
import FileManager from '../manager/fileManager.js'

const router = Router()
const products = []
const fileManager = new FileManager('products.json')

router.get('/', async (req, res) =>{
    const products = await fileManager.get()
    res.json({products})
})

router.post('/', async (req, res) =>{
    const product = req.body
    const addedProduct = await fileManager.add(product)
    
    res.json({status:'success', addedProduct})
})

router.put('/:pid', async (req, res) =>{
    const id = parseInt(req.params.pid) 
    const toUpdateProduct = req.body

    const product = await fileManager.getById(id)
    if(!product) return res.status(404).send('Product not found!!!')
    
    for (const key of Object.keys(toUpdateProduct)) {
        product[key] = toUpdateProduct[key]
    }

    await fileManager.update(id, product)
    
    res.json({status:'success', addedProduct})
})


export default router