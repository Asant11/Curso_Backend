import { Router } from ('express')

const router = Router()
let users = []

router.get('/', (req, res) => {
    res.json({users})
})

router.post('/', (req, res) => {
    const user = req.body
    users.push(user)

    res.send({status:'success', message:'User Created!'})
})



export default router