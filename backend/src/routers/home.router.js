import BaseRouter from "./base.router.js";

export default class HomeRouter extends BaseRouter {

    constructor(){
        super();
        this.initialize();
    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [], (req, res) => this.#getTemplateHome(req, res));

        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

    #getTemplateHome(req, res){

        const loginStatus = !!req.cookies?.cookieAuthToken;

        const session = {
            loggedIn: loginStatus,
            loggedOut: !loginStatus,
        };

        res.status(200).render("home", session);
    }

}