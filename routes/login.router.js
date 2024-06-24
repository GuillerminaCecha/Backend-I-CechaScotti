import { Router } from 'express';
import { isAdmin, isEmployee } from '../middleware/authMiddleware.js';

export const routerLogin = Router();

routerLogin.get( '/login', async ( req, res ) => {
    try {
        res.render( 'login' );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Internal server error' );
    }
} );

routerLogin.use( [ '/productsManager', '/chat' ], isAdmin, isEmployee, ( req, res, next ) => {
    next();
} );

routerLogin.use( '/products', isAdmin, isEmployee, ( req, res, next ) => {
    next();
} );