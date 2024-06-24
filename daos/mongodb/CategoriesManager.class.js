import { categoriesModel } from './models/categories.model.js';

export default class CategoriesManager {

    async createCategory ( category ) {

        const result = await categoriesModel.create( { name: category } );
        return result;
    };

    async getCategories () {
        const result = await categoriesModel.find().lean();
        return result;
    };

    async deleteCategory ( categoryId ) {
        const result = await categoriesModel.deleteOne( categoryId );
        return result;
    };

    async getCategory ( categoryId ) {
        const result = await categoriesModel.find( categoryId );
        return result;
    };
};