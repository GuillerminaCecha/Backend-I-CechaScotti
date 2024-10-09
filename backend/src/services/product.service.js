import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import ProductRepository from "../repositories/product.repository.js";

export default class ProductService {
    #productRepository;

    constructor (){
        this.#productRepository = new ProductRepository();
    }

    async findAll(paramFilters) {

        return await this.#productRepository.findAll(paramFilters);
    }

    async findOneById(id) {
        const productFound = await this.#productRepository.findOneById(id);
        if (!productFound) throw new Error(ERROR_NOT_FOUND_ID);

        return productFound;
    }

    async insertOne(data) {
        return await this.#productRepository.save(data);
    }

    async updateOneById(id, data){
        const productFound = await this.findOneById(id);
        const newValues = { ...productFound, ...data };
        return await this.#productRepository.save(newValues);
    }

    async deleteOneById(id){
        const productFound = await this.findOneById(id);
        await this.#productRepository.deleteOneById(id);
        return productFound;
    }
}