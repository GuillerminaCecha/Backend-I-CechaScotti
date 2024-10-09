/* eslint-disable camelcase */

import { convertToBoolean } from "../utils/converter.js";

export default class ProductDTO {
    fromModel(model) {

        return {
            id: model.id,
            title: model.title,
            description: model.description,
            category: model.category,
            code: model.code,
            price: model.price,
            status: model.status,
            stock: model.stock || 1,
            thumbnail: model.thumbnail || "",
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            title: data.title.toUpperCase().trim(),
            description: data.description.trim(),
            category: data.category.toUpperCase().trim(),
            code: Number(data.code),
            price: Number(data.price),
            status: convertToBoolean(data.status),
            stock: Number(data.stock),
            thumbnail: data.thumbnail?.toLowerCase().trim(),
        };
    }
}