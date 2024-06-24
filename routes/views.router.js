import { Router } from 'express';
import CategoriesManager from '../daos/mongodb/CategoriesManager.class.js';
import ProductsManager from '../daos/mongodb/ProductsManager.class.js';
import { productsModel } from '../daos/mongodb/models/products.model.js';

const router = Router();

const categoriesManager = new CategoriesManager();
const productsManager = new ProductsManager();

router.get( '/products', async ( req, res ) => {

    let page = parseInt( req.query.page ) || 1;
    let sort = req.query.sort || 'asc';
    let filterField = req.query.filter;
    let filterValue = req.query.filterValue;

    try {
        let queryOptions = {
            limit: 5,
            page: page,
            lean: true
        };

        if ( sort ) {
            queryOptions.sort = { price: sort }; 
        }

        let filterOptions = {};
        if ( filterField && filterValue ) {
            filterOptions[ filterField ] = filterValue;
        }

        let result = await productsModel.paginate( filterOptions, queryOptions );

        result.prevLink = result.hasPrevPage ? `http://localhost:8000/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8000/products?page=${result.nextPage}` : '';

        const categories = await categoriesManager.getCategories();

        res.render( 'products', { categories, result } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error interno del servidor' );
    }

} );

router.get( '/product-details/:pid', async ( req, res ) => {

    try {
        const pid = req.params.pid;

        const product = await productsManager.getProductById( pid );

        console.log( product );

        res.render( 'productDetails', { product } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error interno del servidor' );
    }

} );

export default router;