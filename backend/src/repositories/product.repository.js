import ProductDTO from "../dtos/product.dto.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import FactoryDAO from "../daos/factory.dao.js";
import { MONGODB } from "../constants/dao.constant.js";

export default class ProductRepository {
    #productDAO;
    #productDTO;

    constructor() {
        const factory = new FactoryDAO();
        this.#productDAO = factory.createProduct(MONGODB);
        this.#productDTO = new ProductDTO();
    }

    // Obtener todos los productos aplicando filtros
    async findAll(paramFilters) {

        const $and = [];

        if (paramFilters?.category) $and.push({ category:  paramFilters.category });
        if (paramFilters?.status) $and.push({ status:  paramFilters.status });
        const filters = $and.length > 0 ? { $and } : {};

        const products = await this.#productDAO.findAll(filters, paramFilters);

        const productsDTO = products?.docs?.map((product) => this.#productDTO.fromModel(product));

        products.docs = productsDTO;

        return products;
    }

    // Obtener un producto por su ID
    async findOneById(id) {
        const product = await this.#productDAO.findOneById(id);
        if (!product) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#productDTO.fromModel(product);
    }

    // Crea o actualiza una nueva mascota
    async save(data) {

        const productDTO = this.#productDTO.fromData(data);
        const product = await this.#productDAO.save(productDTO);
        return this.#productDTO.fromModel(product);
    }

    // Eliminar una mascota por su ID
    async deleteOneById(id) {
        const product = await this.findOneById(id);
        await this.#productDAO.deleteOneById(id);
        return product;
    }
}