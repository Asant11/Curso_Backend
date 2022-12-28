import express from 'express'
import {Server} from 'socket.io'
import __dirname from './utils.js'

const app = express()
const httpServer = app.listen(8080, ()=> console.log('Listening...'))
const socketServer = new Server(httpServer)

app.use(express.static(__dirname + '/public'))

socketServer.on('connection', socket => {
    console.log('New Client')

    socket.on('message', data =>{
        console.log(data);
    })
})
