import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const productsMgr = new ProductManager();

// Obtener detalles del producto por ID
router.get("/products", async (req, res)=>{
try {
    const { pid } = req.params;
    const product = await productsMgr.getProductById(pid);
    if (!product) {
        return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    res.status(200).json({ status: "success", payload: product });
} catch (error) {
    res.status(500).json({ status: "error", message: error.message });
}
});

export default router;