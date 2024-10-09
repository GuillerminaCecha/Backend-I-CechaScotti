/* eslint-disable camelcase */
import { createHash } from "../utils/security.js";

export default class UserDTO {
    fromModel(model) {
        return {
            id: model.id,
            fullName: `${model.first_name} ${model.last_name}`,
            email: model.email,
            cart: model.cart,
            roles: model.roles,
        };
    }

    fromData(data) {

        return {
            id: data.id || null,
            first_name: data.first_name ?? "",
            last_name: data.last_name ?? "",
            email: data.email,
            password: data.password ? createHash(data.password) : null,
            cart: data.cart,
            age: data.age,
            roles: data.roles,
        };
    }
}