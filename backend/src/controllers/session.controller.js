import UserService from "../services/user.service.js";

export default class SessionController{
    #userService;

    constructor(){
        this.#userService = new UserService();
    }

    login(req, res){
        try {

            const token = req.token ?? null;

            res.sendSuccess201(token);

        } catch (error) {
            res.sendError(error);
        }
    }

    getCurrentUser(req, res) {
        try {

            const user = req.user;

            res.sendSuccess200(user);
        } catch (error) {

            res.sendError(error);
        }
    }

    logout(req, res){
        try {
            const user = req.user;

            res.sendSuccess201Logout(user);
        } catch (error) {
            res.sendError(error);
        }
    }

    async register(req, res){

        try {

            const newUser = await this.#userService.insertOne(req.body);
            res.sendSuccess201(newUser);

        } catch (error) {
            res.sendError(error);
        }
    }
}