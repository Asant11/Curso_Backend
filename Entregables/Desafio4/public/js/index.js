

const socket = io()

//Elementos del Real Time Products:
const titleInput = document.getElementById('title')
const descriptionInput =document.getElementById('description')
const priceInput =document.getElementById('price')
const stockInput =document.getElementById('stock')
const codeInput =document.getElementById('code')
const categoryInput =document.getElementById('category')
const btnAdd = document.getElementById('btnAdd')
const divProducts = document.getElementById('products')

const deleteInput = document.getElementById('deleteID')
const btnDel = document.getElementById('btnDel')



addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const title = titleInput.value.trim()
    const description = descriptionInput.value.trim()
    const code = codeInput.value.trim()
    const price = priceInput.value.trim()
    const stock = stockInput.value.trim()
    const category = categoryInput.value.trim()
    
    if (title.length > 0 && description.length > 0 && price.length > 0 && code.length > 0 && stock.length > 0 && category.length > 0) {
        socket.emit('add', {title, description, code, price, status: true, stock, category, thumbnails: [] })
    }
})

btnDel.addEventListener('click', (e) => {
    e.preventDefault()
    socket.emit('delete', {id: deleteInput.value})
})

socket.on('showProds', data => {
    let products = ''
    data.forEach(product => {
        products += `<div>
        <p>ID: ${product.id}</p>
        <p>Title: ${product.title}</p>
        <p>Price: $${product.price}</p>
        <br>
    </div>`
    })
    divProducts.innerHTML = products
})  