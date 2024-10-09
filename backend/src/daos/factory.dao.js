import MongoDAO from "./mongodb/mongo.dao.js";
import Product from "./mongodb/models/products.model.js";
import User from "./mongodb/models/user.model.js";
import Cart from "./mongodb/models/carts.model.js";
import Ticket from "./mongodb/models/ticket.model.js";
import { MONGODB } from "../constants/dao.constant.js";

export default class FactoryDAO {
    createProduct(className) {
        if (className === MONGODB) {
            return new MongoDAO(Product);
        }
    }

    createCart(className) {
        if (className === MONGODB) {
            return new MongoDAO(Cart);
        }
    }

    createUser(className) {
        if (className === MONGODB) {
            return new MongoDAO(User);
        }
    }

    createTicket(className) {
        if (className === MONGODB) {
            return new MongoDAO(Ticket);
        }
    }
}