import { ADMIN, STANDARD } from "../../constants/roles.constant.js";
import CartController from "../../controllers/cart.controller.js";
import BaseRouter from "../base.router.js";

export default class CartRouter extends BaseRouter {
    #cartController;

    constructor(){
        super();
        this.#cartController = new CartController();

    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [ADMIN], (req, res) => this.#cartController.getAll(req, res));
        this.addGetRoute("/:cid", [ ADMIN, STANDARD ], (req, res) => this.#cartController.getCartById(req, res));
        this.addPostRoute("/", [ STANDARD, ADMIN ], (req, res) => this.#cartController.create(req, res));
        this.addPostRoute("/:cid/product/:pid", [ STANDARD, ADMIN ], (req, res) => this.#cartController.addProductToCart(req, res));
        this.addPostRoute("/:cid/purchase", [ STANDARD, ADMIN ], (req, res) => this.#cartController.purchase(req, res));
        this.addDeleteRoute("/:cid/product/:pid", [ STANDARD, ADMIN ], (req, res) => this.#cartController.deleteProductToCart(req, res));
        this.addDeleteRoute("/:cid", [ADMIN], (req, res) => this.#cartController.delete(req, res));
        this.addPostRoute("/:cid", [ STANDARD, ADMIN ], (req, res) => this.#cartController.removeAllProducts(req, res));
        this.addPutRoute("/:cid", [ADMIN], (req, res) => this.#cartController.updateCart(req, res));
        this.addPutRoute("/:cid/product/:pid", [ STANDARD, ADMIN ], (req, res) => this.#cartController.updateProductFromCart(req, res));

        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }
}