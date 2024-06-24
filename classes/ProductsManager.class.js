import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

const PRODUCTS_FILE_PATH = path.resolve( __dirname, '../data/products.json' );

export default class ProductsManager {
    async readProductsFromFile () {
        const data = await fs.promises.readFile( PRODUCTS_FILE_PATH, 'utf-8' );
        return JSON.parse( data );
    }

    async writeProductsToFile ( products ) {
        await fs.promises.writeFile( PRODUCTS_FILE_PATH, JSON.stringify( products, null, '\t' ) );
    }

    async getProducts ( num ) {
        try {
            const products = await this.readProductsFromFile();
            const sortedProducts = products.sort( ( a, b ) => b._id - a._id );

            return sortedProducts.slice( 0, num ?? products.length );
        } catch ( error ) {
            if ( error.code === 'ENOENT' ) {
                throw new Error( `${PRODUCTS_FILE_PATH} no existe` );
            } else {
                throw new Error( `Error => leyendo la ficha de productos: ${error.message}` );
            }
        }
    }

    async addProduct ( product ) {
        const { title, category, description, thumbnails, stock, price } = product;

        if ( !title || !category || !description || !thumbnails || stock === undefined || price === undefined ) {
            throw new Error( `Falta información obligatoria del producto (title, category, description, thumbnails, stock, price)` );
        }

        const products = await this.getProducts();
        const newProduct = {
            _id: Math.max( ...products.map( p => p._id ) ) + 1,
            title,
            category,
            description,
            thumbnails,
            stock,
            price
        };

        products.push( newProduct );

        try {
            await this.writeProductsToFile( products );
        } catch ( err ) {
            throw new Error( 'No se pudo guardar el producto' );
        }
        return newProduct;
    }

    async updateProduct ( id, productData ) {
        const products = await this.getProducts();
        const productIndex = products.findIndex( product => product._id === id );

        if ( productIndex === -1 ) {
            return null;
        }

        const updatedProduct = { ...products[ productIndex ], ...productData, _id: id };
        products[ productIndex ] = updatedProduct;

        await this.writeProductsToFile( products );
        return updatedProduct;
    }

    async deleteProduct ( id ) {
        const products = await this.getProducts();
        const filteredProducts = products.filter( product => product._id !== id ) || products.find( product => product._id !== id );

        if ( products.length === filteredProducts.length ) {
            console.error( `Producto con id ${id} no encontrado` );
            return false;
        }

        try {
            await this.writeProductsToFile( filteredProducts );
        } catch ( error ) {
            console.error( 'Error al escribir en el archivo:', error );
            throw error;
        }
        return true; 
    }

    async getProductsByCategory ( category ) {
        const products = await this.getProducts();
        return products.filter( product => product.category === category );
    }

    async getProductById ( id ) {
        try {
            const products = await this.getProducts();
            const searchedProduct = products.find( product => product._id === id ) || products.find( product => product._id === id );

            if ( !searchedProduct ) {
                throw new Error( 'Producto no encontrado' );
            }

            return searchedProduct;
        } catch ( error ) {
            console.error( 'Error en getProductById:', error );
            throw error;
        }
    }
}


