const fileSystem = require("node:fs")
const fs = fileSystem.promises

class ProductManager {
    constructor(){
        this.path = "./productos/products.json"
      
    }

    readProducts = async ()=> {
        try{
        const productsJson = await fs.readFile(this.path, "utf-8")
        return await JSON.parse(productsJson)
        } catch (error) {
        return []  
    }
    
    }   

    getProducts = async() => {
        return await this.readProducts()
    }

    addProducts = async ({title, description, price, thumbnail, code, stock}) => {
        
        if (!title || !description || !price || !thumbnail || !code || !stock) return "Ingrese los campos solicitados"

        const product=  await this.readProducts()

        const productExiste = product.findIndex(products => products.code === code)
        
        if (productExiste != -1) return "El codigo ingresado ${code} ya existe"

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id:product.length+1
        }

        product.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(product, null, 2), `utf-8`)
        return "A logrado ingresar con exitó"
        
     }   

     getProductsById = async (id) => {
        const productId = await this.readProducts()
        let product = productId.find(product => product.id === id)
        if(!product) return "El producto ingresado no se encuentra"

        return(product)
        
      
     }

     deleteProductsById = async (id) => {
        let productDelete = await this.readProducts()
        let productElim = productDelete.filter ((product) => product.id != id)
        await fs.writeFile(this.path, JSON.stringify(productElim))
        console.log("El producto a sido eliminado")
     }
     
     updateProducts = async ({id,...product}) => {
        await this.deleteProductsById(id)
        let productDelete = await this.readProducts()
        let productMod = [{...product, id}, ...productDelete]
        await fs.writeFile(this.path, JSON.stringify(productMod))
        console.log(productMod)
        

     }


}

const productos = new ProductManager()

productos.getProducts()
.then(res => console.log(res))
.catch(err => console.log(err))



const respto = {
    title: "",
    description: "",
    price: 1,
    thumbnail: "",
    code: "",
    stock: 1
}

 productos.addProducts(respto)
.then(res => console.log(res))
.catch(err => console.log(err))

productos.getProductsById(5)
.then(res => console.log(res))
.catch(err => console.log(err))

 productos.deleteProductsById(2)

productos.updateProducts({
    title: "",
    description: "",
    price: 20,
    thumbnail: "",
    code: "",
    stock: 1,
    id: 2    
})