import fs from 'fs'

class CartManager{
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

    create = async () =>{
        const carts = await this.read()
        const nextID = this.getNextID(carts)
        
        const newCart ={
            id: nextID,
            products: []
        } 
        carts.push(newCart)

        await this.write(carts)

        return newCart
    } 

    getById = async (ID) =>{
        const products = await this.get()
        const validateID = await products.find(product => product.id === ID)
        return validateID ?? console.log(`"The product with the ID " + ${ID}  + " doesn't exists!"`);
    }

    addProduct = async (cartId, productID ) => {
        
        const cart = await this.getById(cartId)

        let found = false

        for (let index = 0; index < cart.products.length; index++) {
            if(cart.products[i].id == productID ){
                cart.products[i].quantity++
                found = true
                break
            }
        }

        if(!found){
            cart.products.push({
                id: productID, quantity: 1 })
        }
        await this.write(cart)

        return cart
    }

    delete = async(id) =>{
        const products = await this.get()
        const filteredProducts = products.filter(product => product.id !== id)
        fs.promises.writeFile(this.path, JSON.stringify(filteredProducts)) 
    } 
}

export default CartManager
