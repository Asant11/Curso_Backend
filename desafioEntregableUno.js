
class ProductManager{
    constructor(){
        this.products = []
    }

    getNextID = () => {
        const count = this.products.length
        if(count > 0) {
            const lastProduct = this.products[count-1];
            const id = lastProduct.id + 1;
            return id
        }
        else{
            return 1
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) =>{
        const id = this.getNextID()
        const product = {
            id, 
            title: title ?? 'Insertar nombre',
            description: description ?? 'Insertar descripción',
            price: price ?? 'Insertar precio',
            thumbnail: thumbnail ?? 'Insertar thumbnail',
            code: code ?? 'Insertar codigo', 
            stock: stock ?? 'Insertar stock'
        }
        //Código duplicado no permite añadir al array
        const duplicatedCode = this.products.some(product => product.code === code)
        !duplicatedCode ? this.products.push(product) : console.log("Ya esta añadido");
        
    }

    getProducts = () =>{return this.products}

    getProductsById = (newID) =>{
        const validateID = this.products.find(product => product.id == newID)
        return validateID || console.log("Not Found")
    }
}

const manager = new ProductManager()
console.log(manager.getProducts());
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25)
console.log(manager.getProducts());
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25)
console.log(manager.getProductsById(1));



