import {Router} from 'express';

const productsRouter = Router()

productsRouter.get('/', async (req, res)=>{
    try {
        const { limit } = req.query; 
        const products = await productManager.getProducts()

        if(limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }

        return res.json(products)

    } catch (error) {
        console.log(error);
        res.send('Error al intentar recibir los productos')
    }
})

productsRouter.get('/:pid', async (req, res)=>{
    const {pid} = req.params; 
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)
    } catch (error) {
        console.log(error); 
        res.send('Error al intentar recibir el producto con ID ${pid}')
    }
})

productsRouter.post('/', async (req, res)=>{
    try {
        const { title, desciption, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await productManager.addProduct({ title, desciption, price, thumbnail, code, stock, status, category })
    } catch (error) {
        console.log(error);
        res.send('Error al intentar eliminar el producto con ID ${pid}')
    }
})

productsRouter.put('/:pid', async (req, res)=> {
    const {pid} = req.params;

    try {
        const { title, desciption, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await productManager.updateProduct(pid, { title, desciption, price, thumbnail, code, stock, status, category })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('Error al intentar editar producto con ID ${pid}')
    }
})

productsRouter.delete('/:pid', async (req, res)=>{
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid)
        res.send('Producto eliminado exitosamente')
    } catch (error) {
        console.log(error); 
        res.send('Error al intentar eliminar el producto con ID ${pid}')
    }
})

export {productsRouter}