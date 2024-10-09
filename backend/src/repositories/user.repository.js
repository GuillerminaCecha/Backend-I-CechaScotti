import UserDTO from "../dtos/user.dto.js";
import { ERROR_NOT_FOUND_CREDENTIALS, ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import FactoryDAO from "../daos/factory.dao.js";
import { MONGODB } from "../constants/dao.constant.js";
import { isValidPassword } from "../utils/security.js";

export default class UserRepository {
    #userDAO;
    #userDTO;

    constructor() {
        const factory = new FactoryDAO();
        this.#userDAO = factory.createUser(MONGODB);
        this.#userDTO = new UserDTO();
    }

    async findAll(paramFilters) {

        const $and = [];

        if (paramFilters?.category) $and.push({ category:  paramFilters.category });
        if (paramFilters?.status) $and.push({ status:  paramFilters.status });
        const filters = $and.length > 0 ? { $and } : {};

        const users = await this.#userDAO.findAll(filters, paramFilters);

        const usersDTO = users?.docs?.map((user) => this.#userDTO.fromModel(user));

        users.docs = usersDTO;

        return users;
    }

    async findOneById(id) {
        const user = await this.#userDAO.findOneById(id);
        if (!user) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#userDTO.fromModel(user);
    }

    async findOneByEmailAndPassword(email, password) {
        const user = await this.#userDAO.findOneByCriteria({ email });
        if (!user) throw new Error(ERROR_NOT_FOUND_CREDENTIALS);

        const hash = user.password;
        if (!isValidPassword(password, hash)) {
            throw new Error(ERROR_NOT_FOUND_CREDENTIALS);
        }

        return this.#userDTO.fromModel(user);
    }

    async save(data) {

        const userDTO = this.#userDTO.fromData(data);

        const user = await this.#userDAO.save(userDTO);

        return this.#userDTO.fromModel(user);
    }

    async updateUserCart(data){
        const user = await this.#userDAO.findOneById(data.id);
        user.cart = data.cart;
        const userDTO = this.#userDTO.fromData(user);

        const userUpdate = await this.#userDAO.save(userDTO);

        return this.#userDTO.fromModel(userUpdate);
    }

    async deleteOneById(id) {
        const user = await this.findOneById(id);
        await this.#userDAO.deleteOneById(id);
        return user;
    }
}