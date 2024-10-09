import ProductService from "../services/product.service.js";

export default class ProductController {
    #productService;

    constructor(){
        this.#productService = new ProductService();
    }

    async getAll(req, res){
        try {
            const products = await this.#productService.findAll(req.query);

            res.sendSuccess200(products);
        } catch (error) {
            res.sendError(error);
        }
    }

    async getOneById(req, res){
        try {
            const productFound = await this.#productService.findOneById(req.params.pid);
            res.sendSuccess200(productFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res){
        try {
            const newProduct = await this.#productService.insertOne(req.body);
            res.sendSuccess201(newProduct);
        } catch (error) {
            res.sendError(error);
        }
    }

    async update(req, res){
        try {
            const productUpdated = await this.#productService.updateOneById(req.params.pid, req.body);
            res.sendSuccess200(productUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res){
        try {
            const deletedProduct = await this.#productService.deleteOneById(req.params.pid);
            res.sendSuccess200(deletedProduct);
        } catch (error) {
            res.sendError(error);
        }
    }
}