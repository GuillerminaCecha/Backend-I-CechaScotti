
import { Router } from 'express';
import UsersManager from '../classes/UsersManager.class.js';


export const routerUsers = Router();

const usersManager = new UsersManager();

routerUsers.get( '/api/users', async ( req, res ) => {

    try {
        const users = await usersManager.getUsers();
        res.json( users );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Error interno del servidor' } );
    };

} );

routerUsers.post( '/api/user', async ( req, res ) => {

    try {
        const newUser = req.body;
        await usersManager.createUser( newUser );
        res.status( 201 ).json( { message: 'Usuario creado con exito' } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Error interno del servidor' } );
    };

} );

routerUsers.delete( '/api/user/:uid', async ( req, res ) => {

    try {
        const userId = req.params.uid;
        await usersManager.deleteUser( userId );
        res.json( { message: 'Usuario eliminado con exito' } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Error interno del servidor' } );
    };

} );

routerUsers.get( '/api/user/:uid', async ( req, res ) => {

    try {
        const userId = req.params.uid;
        console.log( userId );

        const user = await usersManager.getUserById( Number( userId ) );
        res.json( user );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Error interno del servidor' } );
    };

} );

routerUsers.post( '/api/login', async ( req, res ) => {
    try {
        const { email, password } = req.body;

        const user = await usersManager.authenticateUser( email, password );

        const token = generateToken( user );

        res.json( { token } );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Error interno del servidor' } );
    }
} );
