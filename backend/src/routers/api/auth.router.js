import SessionController from "../../controllers/session.controller.js";
import { generateToken } from "../../middlewares/auth.middleware.js";
import BaseRouter from "../base.router.js";
import { STANDARD } from "../../constants/roles.constant.js";

export default class AuthRouter extends BaseRouter {
    #sessionController;

    constructor(){
        super();

        this.#sessionController = new SessionController();
    }

    initialize(){
        const router = this.getRouter();

        this.addPostRoute("/login", [], generateToken, (req, res) => this.#sessionController.login(req, res));
        this.addPostRoute("/register", [], (req, res) => this.#sessionController.register(req, res));
        this.addGetRoute("/logout", [STANDARD], (req, res) => this.#sessionController.logout(req, res));
        this.addGetRoute("/current", [STANDARD], (req, res) => this.#sessionController.getCurrentUser(req, res));

        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {

            res.sendError(error);
        });
    }

}