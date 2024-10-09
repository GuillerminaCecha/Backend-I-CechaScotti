import UserService from "../services/user.service.js";

export default class UserController {
    #userService;

    constructor() {
        this.#userService = new UserService();
    }

    async getAll(req, res) {
        try {
            const users = await this.#userService.findAll(req.query);

            res.sendSuccess200(users);
        } catch (error) {
            res.sendError(error);
        }
    }

    async getById(req, res) {
        try {
            const user = await this.#userService.findOneById(req.params.uid);

            res.sendSuccess200(user);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res) {
        try {
            const user = await this.#userService.insertOne(req.body);
            res.sendSuccess201(user);
        } catch (error) {
            res.sendError(error);
        }
    }

    async addCartToUser(req, res){
        try {

            const user = await this.#userService.addCart(req.params.cid, req.user.id);
            res.sendSuccess201(user);
        } catch (error) {
            res.sendError(error);
        }
    }

    async update(req, res) {
        try {
            const user = await this.#userService.updateOneById(req.params.uid, req.body);
            res.sendSuccess200(user);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res) {
        try {
            const user = await this.#userService.deleteOneById(req.params.uid);
            res.sendSuccess200(user);
        } catch (error) {
            res.sendError(error);
        }
    }
}