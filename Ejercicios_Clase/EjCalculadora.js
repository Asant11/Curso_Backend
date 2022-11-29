const dividir = (num1, num2) => {
    return new Promise ((resolve, reject) => (num2 == 0) ? reject ("No se puede dividir entre 0") : resolve (num1 / num2))
}

const sumar = (num1, num2) =>{
    return new Promise ((resolve, reject) => (num1 == 0 || num2 == 0) ? reject("Operación innecesaria") : resolve (num1 + num2))
}

const restar = (num1, num2) =>{
    return new Promise ((resolve, reject) => { 
        if(num1 == 0 || num2 == 0) reject ("Operación inválida")
        else {
            const result = num1 - num2;
            (result < 0) ? reject ("La calculadora sólo puede devolver valores positivos") : resolve (result)
        }
    })
}

const multiplicar = (num1, num2) => {
    return new Promise ((resolve, reject) => {
        if(num1 < 0 || num2 < 0) reject ("La calculadora sólo puede devolver valores positivos")
        else{
            const product = num1 * num2;
            (product < 0) ? reject ("La calculadora sólo puede devolver valores positivos") : resolve (product)
        }
    })
}

async function calculos () {
    try {
        console.log(await sumar(6,8));
        console.log(await restar(8,6));
        console.log(await multiplicar(8,6));
        console.log(await dividir(8,6));
    } catch (error) {
        console.error ("ERROR", error)
    }
}
calculos()