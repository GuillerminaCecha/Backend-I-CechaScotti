import ProductModel from "../models/api.products.model.js";
import serverIO from "../config/socket.config.js";
import mongoDB from "../config/mongoose.config.js";

class ProductManager {
    #productModel;

    constructor() {
        this.#productModel = ProductModel;
    }

    getAllProductsWithFilters = async (paramFilters) => {

        try {
            const $and = [];
            if (paramFilters?.category) $and.push({ category:  paramFilters.category });
            if (paramFilters?.status) $and.push({ status:  paramFilters.status });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { price: 1 },
                desc: { price: -1 },
            };

            const paginationOptions = {
                limit: paramFilters.limit ?? 10,
                page: paramFilters.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                lean: true,
            };

            const productsFound = await this.#productModel.paginate(filters, paginationOptions);
            return productsFound;
        } catch (error) {
            throw new Error(`Error en la obtención de productos con filtros: ${error.message}`);
        }
    };

    getAllProducts = async () => {
        try {
            const products = await this.#productModel.find();
            return products;
        } catch (error) {
            throw new Error("Hubo un problema con el servidor");
        }
    };

    getOneProductById = async (id) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error("El ID no es valido");
            }
            const productFound = await this.#productModel.findById(id);

            if (!productFound) {
                throw new Error("No se encuentra el producto");
            }
            return productFound;
        } catch (error) {
            throw new Error(`Error al obtener el producto por ID: ${error.message}`);
        }
    };

    insertOneProduct = async (data) => {
        try {
            const newProduct = new this.#productModel(data);
            await newProduct.save();
            serverIO.updateProductsList(await this.getAllProducts());
            return newProduct;
        } catch (error) {
            throw new Error(`Error al insertar el producto: ${error.message}`);
        }
    };

    updateOneProduct = async (id, data) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error("El ID no es valido");
            }

            const productFound = await this.#productModel.findByIdAndUpdate(id, data,{ new: true } );

            if (!productFound) {
                throw new Error("No se encuentra el producto");
            }

            serverIO.updateProductsList(await this.getAllProducts());

            return productFound;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    };

    deleteOneProduct = async (id) => {

        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error("El ID no es valido");
            }

            const productFound = await this.#productModel.findById(id);

            if (!productFound) {
                throw new Error("No se encuentra el producto");
            }

            await this.#productModel.findByIdAndDelete(id);
            serverIO.updateProductsList(await this.getAllProducts());
            return productFound;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    };
}

export default ProductManager;