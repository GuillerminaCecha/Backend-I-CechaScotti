import CartService from "../services/cart.service.js";

export default class CartController {
    #cartService;

    constructor(){
        this.#cartService = new CartService();
    }

    async getAll(req, res){
        try {

            const carts = await this.#cartService.findAll(req.params);

            res.sendSuccess200(carts);
        } catch (error) {
            res.sendError(error);
        }
    }

    async getCartById(req, res){
        try {
            const cart = await this.#cartService.findOneById(req.params.cid);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res){
        try {
            const cart = await this.#cartService.createCart();
            res.sendSuccess201(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async addProductToCart(req, res){
        try {
            const cart = await this.#cartService.addProduct(req.params.cid, req.params.pid);
            res.sendSuccess201(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async updateProductFromCart(req, res){
        try {
            const { cid, pid } = req.params;

            const updatedProduct = await this.#cartService.updateProductQuantity(cid, pid, req.body.quantity);
            res.sendSuccess201(updatedProduct);
        } catch (error) {
            res.sendError(error);
        }
    }

    async deleteProductToCart(req, res){
        try {
            const cart = await this.#cartService.deleteProduct(req.params.cid, req.params.pid);
            res.sendSuccess201(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async removeAllProducts(req, res){
        try {
            const cart = await this.#cartService.removeAllProducts(req.params.cid);
            res.sendSuccess201(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async updateCart(req, res){
        try {
            const updatedProducts = { products: req.body.products, quantity: req.body.quantity };
            const updatedCart = await this.#cartService.updateCart(req.params.cid, updatedProducts);
            res.sendSuccess201(updatedCart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res){
        try {

            const deletedCart = await this.#cartService.deleteCart(req.params.cid);
            res.sendSuccess200(deletedCart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async purchase(req, res){

        try {
            const purchaseData = await this.#cartService.finalizePurchase(req.params.cid, req.user.email);
            res.sendSuccess200(purchaseData);
        } catch (error) {
            res.sendError(error);
        }
    }
}