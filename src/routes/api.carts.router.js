import { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const cartsMgr = new CartManager();
const router = Router();

// Obtener carrito por ID
router.get("/:cid", async (req, res) => {
try {
    const { cid } = req.params;
    const cart = await cartsMgr.getCartById(cid);
    if (!cart) {
        return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.status(200).json({ status: "success", payload: cart });
} catch (error) {
    res.status(500).json({ status: "error", message: error.message });
}
});

// Obtener todos los carritos
router.get("/", async (req, res) => {
    try {
        const carts = await cartsMgr.getAllCarts();
        res.status(200).json({ status: "success", payload: carts });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const cart = await cartsMgr.createCart();
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsMgr.addProductToCart(cid, pid);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito o producto no encontrado" });
        }
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Eliminar producto del carrito
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsMgr.deleteProductFromCart(cid, pid);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito o producto no encontrado" });
        }
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


// Vaciar el carrito
router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const deletedCart = await cartsMgr.emptyCart(cid);
        if (!deletedCart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }
        res.status(200).json({ status: "success", payload: deletedCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Actualizar carrito
router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { products, quantity } = req.body;
        const updatedProducts = { products, quantity };
        const updatedCart = await cartsMgr.updateCart(cid, updatedProducts);
        res.status(200).json({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Actualizar cantidad de producto en el carrito
router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const product = await cartsMgr.updateProductQuantity(cid, pid, quantity);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Carrito o producto no encontrado" });
        }
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default router;