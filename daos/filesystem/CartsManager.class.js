
import path from 'path';
import fs from 'fs';
import __dirname from '../utils.js';

const CART_FILE_PATH = path.resolve( __dirname, '../data/carts.json' );

export default class CartsManager {

    async getCarts () {
        try {
            const data = await fs.promises.readFile( CART_FILE_PATH, 'utf-8' );
            return JSON.parse( data );
        } catch ( error ) {
            throw new Error( 'No se puede leer el carrito' );
        };
    };

    async getCartById ( id ) {
        try {
            const cartId = Number( id )
            const carts = await this.getCarts();
            const cart = carts.find( ( cart ) => cart.id === cartId );
            if ( cart ) {
                return cart.products;
            } else {
                throw new Error( 'Carrito no encontrado' );
            }
        } catch ( error ) {
            throw new Error( 'No se pudo recuperar el carrito por ID' );
        };
    };

    async createCart () {
        try {
            const carts = await this.getCarts();
            const newCart = {
                id: Math.max( ...carts.map( ( c ) => c.id ) ) + 1,
                products: [],
            };

            carts.push( newCart );
            await fs.promises.writeFile(
                CART_FILE_PATH,
                JSON.stringify( carts, null, '\t' )
            );
            return newCart;
        } catch ( error ) {
            throw new Error( 'Error al crear el carrito' );
        };
    };

    async addProductToCart ( cartId, productId ) {

        try {
            const parsedCartId = Number( cartId )
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex( ( c ) => c.id === parsedCartId );

            if ( cartIndex === -1 ) {
                throw new Error( 'Carrito no encontrado' );
            }

            const parsedProductId = Number( productId )
            const cart = carts[ cartIndex ];
            const productIndex = cart.products.findIndex( ( p ) => p.product === parsedProductId );

            if ( productIndex === -1 ) {
                cart.products.push( { product: parsedProductId, quantity: 1 } );

            } else {
                cart.products[ productIndex ].quantity += 1;
            };

            await fs.promises.writeFile(
                CART_FILE_PATH,
                JSON.stringify( carts, null, '\t' )
            );

            return cart;

        } catch ( error ) {
            throw new Error( 'No se pudo agregar el producto al carrito' );
        }
    };
};