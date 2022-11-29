const fs = require('fs')
class ManagerUser {
    constructor (filename){
        this.filename = filename
        this.format = 'utf-8'
    }   

    createUser = async (name, lastName, age, course) =>{
        return this.getUsers()
            .then(users =>{
                users.push({name, lastName, age, course})
                return users
            })
            .then(usersNew => fs.promises.writeFile(this.filename, JSON.stringify(usersNew)))
    }

    getUsers = async () =>{
        return fs.promises.readFile(this.filename, this.format)
        .then(content => JSON.parse(content))
        .catch(e=>{
            console.log('ERROR', e);
            return []
        })
    }
}

async function run() {
    const manager = new ManagerUser('users.json')
    await manager.createUser('Agustin', 'Santisi', 18, 'JS Backend')
    console.log( await manager.getUsers());
}

run()