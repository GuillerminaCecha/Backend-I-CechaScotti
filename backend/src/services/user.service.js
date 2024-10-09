import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import UserRepository from "../repositories/user.repository.js";

export default class UserService {
    #userRepository;

    constructor (){
        this.#userRepository = new UserRepository();
    }

    async findAll(paramFilters) {

        return await this.#userRepository.findAll(paramFilters);
    }

    async findOneById(id) {
        const userFound = await this.#userRepository.findOneById(id);
        if (!userFound) throw new Error(ERROR_NOT_FOUND_ID);

        return userFound;
    }

    async findOneByEmailAndPassword(email, password) {
        return await this.#userRepository.findOneByEmailAndPassword(email, password);
    }

    async insertOne(data) {

        return await this.#userRepository.save(data);
    }

    async addCart(idCart, idUser){
        const user = await this.findOneById(idUser);
        //const cartExists = user.cart.some((cartItem) => cartItem.cart.toString() === idCart.toString());
        // if(!cartExists){

        //     user.cart.push({ cart: idCart });
        // } else {
        //     return user;
        // }
        user.cart = idCart;

        const data = {
            id: user.id,
            cart: user.cart,
        };

        return await this.#userRepository.updateUserCart(data);

    }

    async updateOneById(id, data){
        const userFound = await this.findOneById(id);
        const newValues = { ...userFound, ...data };
        return await this.#userRepository.save(newValues);
    }

    async deleteOneById(id){
        const userFound = await this.findOneById(id);
        await this.#userRepository.deleteOneById(id);
        return userFound;
    }
}