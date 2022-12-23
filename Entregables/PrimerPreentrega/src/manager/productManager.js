import fs from 'fs'

class FileManager{
    constructor(path){
        this.path = path
        this.format='utf-8'
    }

    getNextID = list => {
        const count = list.length;
        return count > 0 ? list[count-1].id + 1 : 1;
    }

    read = () => {
        if(fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, this.format).then(r=>JSON.parse(r))
        }
        return []
    }

    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    get = async () =>{
        const data = await this.read()
        
        return data   
    }

    add = async (obj) =>{
        const list = await this.read()
        const nextID = this.getNextID(list)
        obj.id = nextID

        list.push(obj)

        await this.write(list)

        return obj
    } 

    getById = async (ID) =>{
        const products = await this.get()
        const validateID = await products.find(product => product.id == ID)
        return validateID ?? console.log(`"The product with the ID " + ${ID}  + " doesn't exists!"`);
    }

    update = async (id,obj) => {
        obj.id = id
        const list = await this.read()

        for (let i = 0; i < list.length; i++) {
            if(list[i].id == id){
                list[i] = obj
                break
            }
        }

        await this.write(list)
    }

    delete = async(id) =>{
        const products = await this.get()
        const filteredProducts = products.filter(product => product.id !== id)
        fs.promises.writeFile(this.path, JSON.stringify(filteredProducts)) 
    } 
}

export default FileManager
