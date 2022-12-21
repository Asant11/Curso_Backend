import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let users = []

app.get('/', (req, res)=> res.send('OK'))

app.get('/api/user', (req, res) => res.json(users))

//POST para agregar con peticiones

app.post('/api/user', (req, res) => {
    const user = req.body
    users.push(user)
    res.send({status:'success', message: 'User created!'})
})

//PUT para actualizar con peticiones

app.put('/api/user', (req, res) => {
    const user = req.body
    const idxUser = users.findIndex(u => u.name.toLowerCase() == user.name.toLowerCase())
    idxUser < 0 ?? res.status(404).json({status:'Error', message:'User Not Found'});
    
    users[idxUser] = user
    res.send({status:'success', message:'User Updated!'}) 
})

//DELETE para borrar con peticiones

app.delete('/api/user/:name', (req, res) => {
    const name = req.params.name
    const currentLength = users.length
    
    users = users.filter(u => u.name != name)
    
    if(users.length == currentLength){
        res.status(404).json({status:'Error', message:'User Not Found'})
    }
    
    res.send({status:'success', message:'User deleted!'})
})


app.listen(8080)