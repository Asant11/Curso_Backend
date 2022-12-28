import express from 'express'
import productsRouter from './routers/productsRouter.js'
import cartRouter from './routers/cartRouter.js'
import viewsRouter from './routers/viewsRouter.js'
import handlebars from 'express-handlebars'
import __dirname from "./utils.js"
import { Server } from "socket.io"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

const httpServer = app.listen(8080, () =>console.log('Listening...'))
const io = new Server(httpServer)



export default io