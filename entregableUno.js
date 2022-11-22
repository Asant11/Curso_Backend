class ProductManager{
    constructor(){
        
        this.products= []      
    }
    getProducts = () => { return this.products }

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
            const id = this.getNextID();
            const code =this.validateCode()
            const product = {
                id,
                title,
                description,
                price,
                thumbnail, 
                code,
                stock
            }
    
            this.products.push(product);
        }
}

const manager = new ProductManager()
manager.addProduct("Remera", "Remera roja con lunares", 300, "sin imagen", 4567, "10" )
manager.getProducts()

