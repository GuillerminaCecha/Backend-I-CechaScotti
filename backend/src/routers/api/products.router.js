import { ADMIN } from "../../constants/roles.constant.js";
import ProductController from "../../controllers/product.controller.js";
import BaseRouter from "../base.router.js";

export default class ProductRouter extends BaseRouter {
    #productController;

    constructor(){
        super();
        this.#productController = new ProductController();

    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [], (req, res) => this.#productController.getAll(req, res));
        this.addGetRoute("/:pid", [], (req, res) => this.#productController.getOneById(req, res));
        this.addPostRoute("/", [ADMIN], (req, res) => this.#productController.create(req, res));
        this.addPutRoute("/:pid", [ADMIN], (req, res) => this.#productController.update(req, res));
        this.addDeleteRoute("/:pid", [ADMIN], (req, res) => this.#productController.delete(req, res));

        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

}