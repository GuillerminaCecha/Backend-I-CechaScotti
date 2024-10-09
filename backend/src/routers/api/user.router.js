import { ADMIN, STANDARD } from "../../constants/roles.constant.js";
import UserController from "../../controllers/user.controller.js";
import BaseRouter from "../base.router.js";

export default class UserRouter extends BaseRouter {
    #userController;

    constructor(){
        super();
        this.#userController = new UserController();

    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [ADMIN], (req, res) => this.#userController.getAll(req, res));
        this.addGetRoute("/:uid", [ STANDARD, ADMIN ], (req, res) => this.#userController.getById(req, res));
        this.addPostRoute("/", [], (req, res) => this.#userController.create(req, res));
        this.addPostRoute("/cart/:cid", [ STANDARD, ADMIN ], (req, res) => this.#userController.addCartToUser(req, res));
        this.addPutRoute("/:uid", [ STANDARD, ADMIN ], (req, res) => this.#userController.update(req, res));
        this.addDeleteRoute("/:uid", [ STANDARD, ADMIN ], (req, res) => this.#userController.delete(req, res));

        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

}