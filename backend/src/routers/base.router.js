import { Router } from "express";
import mongoose from "mongoose";
import { ERROR_INVALID_ID, ERROR_NOT_HAVE_PRIVILEGES, STATUS_CODES } from "../constants/messages.constant.js";
import { checkAuth, extractTokenFromCookie } from "../middlewares/auth.middleware.js";

export default class BaseRouter {
    #router;
    #statusCodes;

    constructor(){
        this.#router = Router();
        this.#statusCodes = STATUS_CODES;
        this.#defineCustomResponses();
        this.#addIdValidation();
        this.initialize();
    }

    initialize(){
        throw new Error("Este metodo debe ser sobreescrito en las clases hijas");
    }

    #defineCustomResponses(){

        this.#router.use((req, res, next) => {
            res.sendSuccess200 = (payload) => res.status(200).json({ status: true, payload });
            res.sendSuccess200withFilters = (data) => res.status(200).json({
                status: "success",
                payload: data.docs,
                totalPages: data.totalPages,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                page: data.page,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevLink: data.hasPrevPage ? `http://localhost:8080/products?page=${data.prevPage}` : null,
                nextLink: data.hasNextPage ? `http://localhost:8080/products?page=${data.nextPage}` : null,
            });
            res.sendSuccess201 = (payload) => res.status(201).json({ status: true, payload });
            res.sendSuccess201Logout = (payload) => res.status(201).clearCookie("token").json({ status: true, payload });
            res.sendError = (error) => this.#defineErrorResponses(error, res);

            next();
        });
    }

    #defineErrorResponses(error, res){
        let errorMessage = error.message;

        if (error instanceof mongoose.Error.ValidationError) {
            errorMessage = Object.values(error.errors)[0].message;
        }

        const statusCode = this.#statusCodes[errorMessage] || 500;
        res.status(statusCode).json({ status: false, message: errorMessage });
    }

    #addIdValidation(){
        const patternId = /^[0-9a-fA-F]{24}$/;

        this.#router.param("pid", this.#validatePathParam(patternId, ERROR_INVALID_ID));
        this.#router.param("cid", this.#validatePathParam(patternId, ERROR_INVALID_ID));
        this.#router.param("uid", this.#validatePathParam(patternId, ERROR_INVALID_ID));
    }

    #validatePathParam(patternId, errorMessage){
        return (req, res, next, paramValue) => {
            if(!patternId.test(paramValue)){
                return next(new Error(errorMessage));
            }

            next();
        };
    }

    #checkPolicy(policies = []){

        if(policies.length === 0) return [];

        return [ extractTokenFromCookie, checkAuth, (req, res, next ) => {

            const hasRequiredRole = policies.some((policy) => req.roles.includes(policy));

            if(!hasRequiredRole) {
                return next(new Error(ERROR_NOT_HAVE_PRIVILEGES));
            }
            next();
        } ];
    }

    #addRoute(method, path, policies = [], ...callbacks){
        this.#router[method](path, this.#checkPolicy(policies), ...callbacks);
    }

    addGetRoute(path, policies = [], ...callbacks){
        this.#addRoute("get", path, policies, ...callbacks);
    }

    addPostRoute(path, policies = [], ...callbacks){
        this.#addRoute("post", path, policies, ...callbacks);
    }

    addPutRoute(path, policies = [], ...callbacks){
        this.#addRoute("put", path, policies, ...callbacks);
    }

    addDeleteRoute(path, policies = [], ...callbacks){
        this.#addRoute("delete", path, policies, ...callbacks);
    }

    getRouter(){
        return this.#router;
    }

}